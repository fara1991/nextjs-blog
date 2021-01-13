import fs from 'fs';
import Link from 'next/link';
import Layout from '../components/Layout';
import {
  findContents,
  findMarkDownCategoryList,
} from '../components/ContentLoader';
import {Button} from 'react-bootstrap';
import {List} from 'mdast';

const DISPLAY_LATEST_PAGE = 5;

export type IndexProps = {
  posts: List[Post];
  categoryList: List[string];
};

type Post = {
  content: string;
  title: string;
  created: string;
  updated?: string;
  slugList: List[string];
  tagList: List[string];
};

export default function Page(props: IndexProps): JSX.Element {
  return (
    <Layout categoryList={props.categoryList}>
      {props.posts.map((markDown) => (
        <div key={markDown.title} className='post-teaser'>
          <h4>
            <Link href='/[...slug]' as={`/${markDown.slugList.join('/')}`}>
              <a>{markDown.title}</a>
            </Link>
          </h4>
          <div>
            <span>作成日: {markDown.created}</span>
          </div>
          {markDown.tagList.map((tag) => (
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
      ))}
      <style jsx>{`
        .post-teaser {
          margin-bottom: 2em;
        }

        .post-teaser h2 a {
          text-decoration: none;
        }

        .home-archive {
          margin: 3em;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
    </Layout>
  );
}

/**
 * ページ内のパラメータを設定
 */
export async function getStaticProps(): Promise<{
  props: {categoryList: string[]; posts: unknown[]};
}> {
  const posts = await findContents({fs: fs});
  const categoryList = await findMarkDownCategoryList({fs});
  return {
    props: {
      posts: posts.slice(0, DISPLAY_LATEST_PAGE),
      categoryList: categoryList,
    },
  };
}