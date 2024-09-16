import EditBook from "../models/EditModel.js";
import Register from "../models/RegisterModel.js";

export const index = async (req, res) => {
  res.render('register', {
    book: {}
  });
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
    console.log(registerBook.account._id)

    req.flash('success', 'Livro registrado com sucesso');
    return req.session.save(() => {
      res.redirect(`/register/${registerBook.account._id}`);
    })
  } catch (e) {
    console.error(e);
    return res.render('error');
  }
}

export const edit = async (req, res) => {
  try {
    const editBook = new EditBook(req.params);
    await editBook.edit();

    res.render('register', {book: editBook.account});
    return;
  } catch (error) {
    
  }
}

export default {
  index,
  register,
  edit
}