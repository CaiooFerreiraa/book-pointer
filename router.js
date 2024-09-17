import express from 'express';
import { longinRequired, admin } from './src/middlewares/middlewares.js';
import homeControler from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
import registerController from './src/controllers/registerController.js';
import adminController from './src/controllers/adminController.js';
const router = express.Router();

//Home do site
router.get('/', homeControler.index);

//Página de login
router.get('/singin', loginController.index);
router.post('/singin/login', loginController.login);
router.get('/logout', loginController.logout);
router.post('/singin/create', loginController.create);

//Página de registro de livros
router.get('/register', longinRequired, registerController.index);
router.get('/register/:id', longinRequired, registerController.book);
router.get('/delete/:id', longinRequired, registerController.deleteB, homeControler.index);
router.post('/register/edit/:id', longinRequired, registerController.edit);
router.post('/register/registerBook', longinRequired, registerController.register);

//page Admin
router.get('/admin', admin, adminController.index);
router.get('/admin/superUser', admin, adminController.superUser);
router.get('/admin/register', admin, registerController.index);
router.post('/admin/registerSuperUser', admin, adminController.registerSuperUser);

export default router;