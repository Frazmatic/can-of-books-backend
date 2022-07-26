
const router = require('express').Router();
const BookModel = require('../models/Book');

class Books {

    static async getBooks(request, response){
        try {
            const books = await Books.queryBooks(request);
            if (books.length === 0){
                response.status(404).send('book(s) not found in database');
            } else {
                response.send(books);
            }
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    static async queryBooks(request){
        const q = request.query;
        const bookResults = await BookModel.find(q);
        return bookResults;
    }

    static async postBooks(request, response){
        try {
            const b = {
                title: request.body.title,
                description: request.body.description,
                status: request.body.status
            };
            await BookModel.create(b)
            response.status(202).json(b);
        } catch (error) {
            response.status(400).send(error.message);
        } 
    }
}

router.get('/', Books.getBooks);
router.post('/', Books.postBooks);

module.exports = router;