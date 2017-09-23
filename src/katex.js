import katex from 'katex';

/**
 * A simple katex wrapper to enable injecting katex from outside this plugin
 */

export default {
  render: katex.render,
  __parse: katex.__parse,
};
