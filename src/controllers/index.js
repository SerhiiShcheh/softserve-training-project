export const get = (req, res, next) => {
  const pageTitle = res.translate('pageTitle');

  res.render('index', {
    pageTitle,
    stylesheets: ['css/index.css'],
    javascript: ['js/index.js']
  });
};
