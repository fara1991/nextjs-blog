import fs from 'fs';
import Layout from '../components/Layout';
import {
  findContentFileByParam,
  findContentFiles,
  findMarkDownCategoryList,
} from '../components/ContentLoader';
import {Alert, Button, Form} from 'react-bootstrap';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

export default function Page(params): JSX.Element {
  const articleUrl = `${
    process.env.DOMAIN_NAME
  }/${params.markDown.slugList.join('/')}`;
  return (
    <Layout
      key={params.markDown.title}
      title={params.markDown.title}
      categoryList={params.categoryList}
      created={params.markDown.created}
    >
      <h3>{params.markDown.title}</h3>
      <div>作成日: {params.markDown.created}</div>
      {params.markDown.updated ? (
        <div style={{color: 'red'}}>更新日: {params.markDown.updated}</div>
      ) : (
        ''
      )}
      {params.markDown.tagList && (
        <div>
          {params.markDown.tagList.map((tag) => (
            <span key={tag}>
              <Button
                variant='outline-success'
                className='rounded-pill'
                size='sm'
              >
                {tag}
              </Button>
              {'　'}
            </span>
          ))}
        </div>
      )}
      <Alert />
      <div
        className='post-body'
        dangerouslySetInnerHTML={{__html: params.markDown.content}}
      />
      <Alert />
      <Form className='share'>
        <h4>SHARE</h4>
        <TwitterShareButton
          url={articleUrl}
          hashtags={params.markDown.tagList}
          title={params.markDown.title}
          via='game_Fara'
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton url={articleUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LineShareButton url={articleUrl} title={params.markDown.title}>
          <LineIcon size={32} round />
        </LineShareButton>
        <LinkedinShareButton url={articleUrl} title={params.markDown.title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Form>
      <br />
    </Layout>
  );
}

/**
 * ページ内のパラメータを設定
 */
export async function getStaticProps(paths) {
  const file = await findContentFileByParam({
    fs: fs,
    slugList: paths.params.slug,
  });
  const categoryList = await findMarkDownCategoryList({fs});
  return {
    props: {
      markDown: file,
      categoryList: categoryList,
    },
  };
}

/**
 * ファイル名の[xxx]部分を設定
 */
export async function getStaticPaths() {
  const contents = await findContentFiles({fs: fs});
  const paths = contents.map((index) => ({
    params: {
      slug: index.slugList,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
