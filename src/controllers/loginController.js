import Register from '../models/RegisterModel.js';
import { Create, Login } from '../models/LoginModel.js';

export const index = (req, res) => {
  res.render('login');
  return;
}

export const login = async (req, res) => {
  try {
    const user = new Login(req.body);
    await user.login();
    req.session.target = 'login'

    if (user.errors.length > 0) {
      req.flash('errors', user.errors);
      return req.session.save(() => {res.redirect('back')});
    }
    
    req.session.user = user.account;
    req.flash('success', 'Usuário logado com sucesso');
    return req.session.save(() => {res.redirect('back')});
  } catch (e) {
    console.error(e)
  }
}

export const create = async (req, res) => {
  try {
    const user = new Create(req.body)
    await user.main();
    req.session.target = 'create'

    if (user.errors.length > 0) {
      req.flash('errors', user.errors);
      return req.session.save(() => {res.redirect('back')});
    }

    req.flash('success', 'Usuário criado com sucesso');
    return req.session.save(() => {res.redirect('back')});
  } catch (e) {
    console.error(e);
    return;
  }
}

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}

export default {
  index,
  login,
  create,
  logout
}