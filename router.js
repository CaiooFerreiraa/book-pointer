import express from 'express';
import { longinRequired } from './src/middlewares/middlewares.js';
import homeControler from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';
import registerController from './src/controllers/registerController.js';
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
router.post('/register/registerBook', longinRequired, registerController.register);

export default router;