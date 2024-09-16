import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
dotenv.config();

export const createCsrf = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.target = req.session.target;
  res.locals.user = req.session.user;
  res.locals.emailAd = process.env.emailAdmin;
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
  // Faz a validação para saber se o usuário logado é o admin
  if ( req.session.user.email === process.env.emailAdmin && bcryptjs.compareSync(process.env.passwordAdmin, req.session.user.password)) return next()
  res.render('error');
}