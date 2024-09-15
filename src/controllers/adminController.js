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