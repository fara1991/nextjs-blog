import 'bootstrap/dist/css/bootstrap.min.css';
import Router from 'next/router';
import React from 'react';
import {GA_TRACKING_ID, pageView} from '../components/GTag';
import type {IndexProps} from './index';
import type {SlugProps} from './[...slug]';

if (GA_TRACKING_ID) {
  Router.events.on('routeChangeComplete', (url) => pageView(url));
}

type Apps = {
  Component: JSX.Element;
  pageProps: IndexProps & SlugProps;
};

// This default export is required in a new `pages/_app.js` file.
function App(props: Apps): JSX.Element {
  console.log(props);
  return <props.Component {...props.pageProps} />;
}

export default App;
