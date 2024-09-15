import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
dotenv.config();

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

export const longinRequired = (req, res, next) => {
  if (!req.session.user) return res.render('error')
  next();
}

export const admin = (req, res, next) => {
  const userEmail = req.session.user.email;
  const emailAdmin = process.env.emailAdmin;
  const userPassword = req.session.user.password;
  const passwordAdmin = process.env.passwordAdmin;

  if ( userEmail === emailAdmin && bcryptjs.compareSync(passwordAdmin, userPassword)) return next()
  res.render('error');
}