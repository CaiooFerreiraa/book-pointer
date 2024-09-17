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

    req.flash('success', 'Livro registrado com sucesso');
    return req.session.save(() => {
      res.redirect(`/register/${registerBook.account._id}`);
    })
  } catch (e) {
    console.error(e);
    return res.render('error');
  }
}

export const book = async (req, res) => {
  try {
    const editBook = await EditBook.searchById(req.params.id);

    res.render('register', {book: editBook});
    return;
  } catch (error) {
    console.error(e);
  }
}

export const edit = async (req, res) => {
  try {
    const editBook = await EditBook.updateBook(req.params.id, req.body);

    res.render('register', { book: editBook });
  } catch (e) {
    console.error(e);
  }
}

export const deleteB = async (req, res, next) => {
  try {
    if (!req.params.id) return res.render('error');
    await EditBook.deleteBook(req.params.id);

    return next()
  } catch (e) {
    console.error(e);
  }
}

export default {
  index,
  register,
  book,
  edit,
  deleteB
}