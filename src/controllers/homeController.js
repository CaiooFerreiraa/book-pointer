import { RegisterModel } from '../models/RegisterModel.js';

export const index = async (req, res, next) => {
  try {
    const books = await RegisterModel.find({dono: req.session.user.email});
    const infoBooks = [];
    const RegExp = /[^a-zA-Z0-9]/g;
    
    if (!books) return res.render('index', {});
  
    for (const tituloBook of books) {
      const titulo = tituloBook.titulo.toLowerCase().replace(RegExp, '')
      await fetch(`https://www.googleapis.com/books/v1/volumes?q=${titulo}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          return data.items[0];
        })
        .then(book => {
          infoBooks.push({
            img: book.volumeInfo.imageLinks.thumbnail,
            titulo: tituloBook.titulo,
            avaliacao: tituloBook.nota,
            id: tituloBook._id
          })
        })
    }
    res.render('index', {infoBooks});
    return;
  } catch (error) {
   console.error(error);
  }
}

export default {
  index
}