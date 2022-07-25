
const BookModel = require('../models/Book');

class Books {

    static async getBooks(request, response){
        response.send(await Books.queryBooks(request));
    }

    static async queryBooks(request){
        const q = request.query;
        console.log(q);
        const bookResults = await BookModel.find(q);
        return bookResults;
    }
}

module.exports = Books.getBooks;