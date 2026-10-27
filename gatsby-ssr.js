/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="title-scramble" src="/title-scramble.js" defer />,
  ]);
};
