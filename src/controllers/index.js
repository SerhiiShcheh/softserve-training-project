export const get = (req, res, next) => {
  res.render('index', {
    pageTitle: 'URLs shortener and files storage',
    stylesheets: ['css/index.css'],
    javascript: ['js/index.js']
  });
};
