const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  config = rewireLess(config, env, {
    modifyVars: { 
      "@primary-color": "#FF4D5B",
      "@border-radius-base": "0px",
      "@modal-mask-bg": "rgba(55, 55, 55, 0.4)",
      "@text-color": "@primary-color",
      "@input-placeholder-color": "@primary-color",
      "@label-color": "@primary-color",
      "@font-family": "'Montserrat', sans-serif"
    },
  });
  return config;
};