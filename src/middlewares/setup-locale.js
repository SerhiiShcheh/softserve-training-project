export const setupLocaleMiddleware = (req, res, next) => {
  const SUPPORTED_LOCALES = req.getLocales();
  const { locale } = req.params;

  if (locale != null && SUPPORTED_LOCALES.includes(locale)) {
    req.setLocale(locale);
  }

  return next();
};
