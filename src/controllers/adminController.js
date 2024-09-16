import UpdateUser from "../models/UpdateUserModel.js";

export const index = (req, res) => {
  res.render('admin/pageAdmin');
  return;
}

export const superUser = (req, res) => {
  res.render('admin/registerSuperUser');
  return;
}

export const registerSuperUser = async (req, res) => {
  try {
    const updateUser = new UpdateUser(req.body);
    await updateUser.update();

    if (updateUser.errors.length > 0) {
      req.flash("errors", updateUser.errors)
      return req.session.save(() => {
        res.redirect('back')
      })
    }

    req.flash("success", 'Teste realizado com sucesso')
    return req.session.save(() => {
      res.redirect('back')
    })
  } catch (e) {
    console.error(e);
    return res.render('error')
  }
} 

export default {
  index,
  superUser,
  registerSuperUser
}