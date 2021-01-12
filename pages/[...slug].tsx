import fs from 'fs';
import Layout from '../components/Layout';
import {
  findContentFileByParam,
  findContentFiles,
  findMarkDownCategoryList,
} from '../components/ContentLoader';
import {Alert, Button, Form} from 'react-bootstrap';
import {List} from 'mdast';
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

type Paths = {
  paths: List[List[string]];
  fallback: boolean;
};

export type SlugProps = {
  props: {
    markDown: {
      content: string;
      title: string;
      created: string;
      updated?: string;
      slugList: string[];
      tagList: string[];
    };
    categoryList: List[string];
  };
};

export default function Page(params: SlugProps): JSX.Element {
  const articleUrl = `${
    process.env.DOMAIN_NAME
  }/${params.props.markDown.slugList.join('/')}`;
  return (
    <Layout
      key={params.props.markDown.title}
      title={params.props.markDown.title}
      categoryList={params.props.categoryList}
      created={params.props.markDown.created}
    >
      <h2>{params.props.markDown.title}</h2>
      <div>作成日: {params.props.markDown.created}</div>
      {params.props.markDown.updated ? (
        <div style={{color: 'red'}}>更新日: {params.props.markDown.updated}</div>
      ) : (
        ''
      )}
      {params.props.markDown.tagList && (
        <div>
          {params.props.markDown.tagList.map((tag) => (
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
        dangerouslySetInnerHTML={{__html: params.props.markDown.content}}
      />
      <Alert />
      <Form className='share'>
        <Form.Label>SHARE</Form.Label>
        <br />
        <TwitterShareButton
          url={articleUrl}
          hashtags={params.props.markDown.tagList}
          title={params.props.markDown.title}
          via='game_Fara'
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton url={articleUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LineShareButton url={articleUrl} title={params.props.markDown.title}>
          <LineIcon size={32} round />
        </LineShareButton>
        <LinkedinShareButton url={articleUrl} title={params.props.markDown.title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Form>
    </Layout>
  );
}

/**
 * ページ内のパラメータを設定
 */
export async function getStaticProps(paths: Paths): Promise<SlugProps> {
  const file = await findContentFileByParam({
    fs: fs,
    slugList: paths.paths.params.slug,
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
export async function getStaticPaths(): Promise<Paths> {
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
