import Document, {Html, Head, Main, NextScript} from 'next/document';
import * as GA_TRACKING_ID from '../components/GTag';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='ja'>
        <Head>
          {/* gtag / Google Analytics を利用する */}
          {GA_TRACKING_ID && (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
          )}
          {GA_TRACKING_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          )}

          {/* Google Fonts を利用する */}
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Domine&display=swap'
            rel='stylesheet'
          />
          {/*HighLight*/}
          <script src='/js/prism.js'/>
          <link href='/css/prism.css' rel='stylesheet' title='prism'/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
