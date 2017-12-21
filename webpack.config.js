module.exports = (config) => {
  config.module.rules.forEach((rule) => {
    if (rule.loader === 'url') {
      rule.exclude.push(/\.yaml$/);
    }
  });
  config.module.rules.push({
    test: /\.yaml$/,
    enforce: 'pre',
    use: ['json-loader', 'yaml-loader'],
  });

  return config;
};
