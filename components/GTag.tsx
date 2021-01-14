// See: https://github.com/zeit/next.js/blob/v9.3.1/examples/with-google-analytics/lib/gtag.js
const GA_TRACKING_ID = process.env.GA_TRACKING_ID;
console.log(GA_TRACKING_ID)

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageView = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = (
  action: string,
  category: string,
  label: string,
  value: string
): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export {GA_TRACKING_ID, pageView, event};
