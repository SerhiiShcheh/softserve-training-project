export const get = (req, res) => {
  const pageTitle = res.translate('pageTitle');

  res.render('index', {
    pageTitle,
    stylesheets: ['css/index.css'],
    javascript: ['js/index.js']
  });
};
