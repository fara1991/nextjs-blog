import path from 'path';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypePrism from '@mapbox/rehype-prism';
import matter from 'gray-matter';
import process from 'process';
import rehypeStringify from 'rehype-stringify';
import externalLinks from 'remark-external-links';

const ARTICLE_DIR = path.join(process.cwd(), 'pages/content');

/**
 * MarkDownファイルを配置しているディレクトリ名(カテゴリ名)一覧を取得する
 *
 * @param fs
 * @returns string[]
 */
export const findMarkDownCategoryList = ({fs}) => {
  const paths = fs.readdirSync(ARTICLE_DIR);
  const dirs = [];
  for (const path of paths) {
    if (path === 'template') {
      continue;
    }
    dirs.push(path);
  }
  return dirs;
};

/**
 * Markdownのファイル一覧をフルパスで取得する
 *
 * @param fs
 * @param base
 * @returns string[]
 */
const findMarkDownFileList = ({fs, base}) => {
  function readdirRecursively(dir, fileNameList = []) {
    const paths = fs.readdirSync(dir);
    const dirs = [];
    for (const path of paths) {
      if (path === 'template') {
        continue;
      }

      const fullPath = `${dir}/${path}`;
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        dirs.push(fullPath);
      } else {
        fileNameList.push(fullPath);
      }
    }
    for (const d of dirs) {
      fileNameList = readdirRecursively(d, fileNameList);
    }
    return fileNameList;
  }

  if (base !== '') {
    base = `/${base}`;
  }
  return readdirRecursively(`${ARTICLE_DIR}${base}`);
};

/**
 * markdownのコンテンツ一覧を取得する
 *
 * @param fs
 * @returns {Promise<tagList: string[], created: string, slugList: string[], title: string, updated: string, content: string>}
 */
const findContentFiles = async ({fs}) => {
  const promises = await findMarkDownFileList({
    fs: fs,
    base: '',
  }).map((fileName) => findContentFile({fs: fs, fileName: fileName}));
  return await Promise.all(promises);
};

/**
 * Markdown のコンテンツをpublishで全件パースしてcontent部分を取得する
 *
 * @param fs
 * @returns {Promise<tagList: string[], created: string, slugList: string[], title: string, updated: string, content: string>}
 */
export const findContents = async ({fs: fs}) => {
  const contents = await findContentFiles({fs: fs});
  return contents.sort(sortWithProp('created', true));
};

/**
 * MarkDownのコンテンツを取得する
 *
 * @param fs
 * @param fileName
 * @returns {Promise<{tagList: string[], created: string, slugList: string[], title: string, updated: string, content: string}>}
 */
const findContentFile = async ({fs, fileName: fileName}) => {
  const raw = fs.readFileSync(fileName, 'utf-8');
  const matterResult = matter(raw);
  return await convertMarkDown(matterResult, fileName);
};

/**
 * slugから指定MarkDownのコンテンツを取得する
 *
 * @param fs
 * @param slugList
 * @returns {Promise<{tagList: string[], created: string, slugList: string[], title: string, updated: string, content: string}>}
 */
export const findContentFileByParam = async ({fs, slugList}) => {
  const fileName = `${ARTICLE_DIR}/${slugList.join('/')}.md`;
  const raw = fs.readFileSync(fileName, 'utf-8');
  const matterResult = matter(raw);
  return await convertMarkDown(matterResult, fileName);
};

/**
 *
 * @param matterResult
 * @param fileName
 * @returns {Promise<{tagList: string[], created: string, slugList: string[], title: string, updated: string, content: string}>}
 */
const convertMarkDown = async (matterResult, fileName) => {
  const text = await unified()
    .use(externalLinks)   // anchorリンクにrelとtarget属性を付与
    .use(remarkParse)     // markdownの本文をremarkで処理
    .use(remark2rehype)   // markdownからHTMLに変換
    .use(rehypeStringify) // HTMLを文字列に変換
    .use(rehypePrism)     // 文字列中のCodeにHighLightをつける
    .use(() => genAttrsAdder('image', {loading: 'lazy'}))
    .processSync(matterResult.content);

  const slug = fileName.split(`${ARTICLE_DIR}/`)[1].slice(0, -3);
  return {
    content: text.toString(),
    title: matterResult.data.title,
    created: matterResult.data.created,
    updated: 'updated' in matterResult.data ? matterResult.data.updated : '',
    slugList: slug.split('/'), // .md拡張子文字削除
    tagList:
      'tags' in matterResult.data ? matterResult.data.tags.split(', ') : [],
  };
};

/**
 * Markdownの投稿をソート
 *
 * @param name: string
 * @param reversed: bool
 * @returns {function(*, *): number}
 */
const sortWithProp = (name, reversed) => (a, b) => {
  if (reversed) {
    return a[name] < b[name] ? 1 : -1;
  } else {
    return a[name] < b[name] ? -1 : 1;
  }
};

/**
 * 指定された node attributes を追加する remark プロセッサ
 *
 * @param type: string
 * @param attrs: json
 */
const genAttrsAdder = (type, attrs) => {
  return transformer;

  /**
   * @param node
   */
  function transformer(node) {
    if (node.type === type) {
      node.data = node.data || {};
      node.data.hProperties = Object.assign({}, node.data.hProperties, attrs);
    }

    if (node.children) {
      node.children.map((child) => transformer(child));
    }
  }
};

export {findMarkDownFileList, findContentFiles, findContentFile};
