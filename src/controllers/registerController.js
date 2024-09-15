import Register from "../models/RegisterModel.js";

export const index = (req, res) => {
  res.render('register');
  return;
}

export const register = async (req, res) => {
  try {
    const registerBook = new Register(req.body, req.session.user);
    await registerBook.registrar()

    if (registerBook.errors.length > 0) {
      req.flash('errors', registerBook.errors);
      return req.session.save(() => {
        res.redirect('back');
      })
    }

    req.flash('success', 'Livro registrado com sucesso');
    return req.session.save(() => {
      res.redirect('back');
    })
  } catch (e) {
    console.error(e);
    return res.render('error');
  }
}

export const registerSuperUser = (req, res) => {

}

export default {
  index,
  register,
  registerSuperUser
}