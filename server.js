import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import routes from './router.js';
import { createCsrf, checkCsrfError } from './src/middlewares/middlewares.js';
import flash from 'connect-flash';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import csrf from 'csurf';
dotenv.config();

const app = express();
const port = 8080;
const connectString = process.env.CONNECTSTRING; // Trocar CONNECTSTRING por sua string do banco de dados mongo

mongoose.connect(connectString)
  .then(() => {
    app.emit(200);
  })
  .catch(e => {
    console.error(e);
  })

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));
app.use(express.json());

const sessionOption = session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.CONNECTSTRING}), //Cria a collection das session no mongo
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Duração da sessão por 1 semana
    httpOnly: true 
  }
});

app.use(sessionOption);
app.use(flash());

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(createCsrf);
app.use(checkCsrfError);
app.use(routes);

app.on(200, () => app.listen(port, () => console.log(`Servidor rodando em: http://localhost:${port}`)))
