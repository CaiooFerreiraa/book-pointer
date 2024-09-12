export const createCsrf = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.target = req.session.target;
  res.locals.user = req.session.user;
  next();
}

export const checkCsrfError = (err, req, res, next) => {
  if (err) {return res.render('error')}
  next();
}

export const longinRequired = async (req, res, next) => {
  if (!req.session.user) return res.render('error')
  next();
}