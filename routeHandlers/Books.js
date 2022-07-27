
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

    //errors are caught by above wrapper
    static async queryBooks(request){
        const q = request.query;
        const bookResults = await BookModel.find(q);
        return bookResults;
    }

    static postBooks(request, response){
        try {
            const b = {
                title: request.body.title,
                description: request.body.description,
                status: request.body.status
            };
            BookModel.create(b, (error, book) => {
                !(error) ? response.status(202).json(book) : response.status(400).send(error.message);
            })
        } catch (error) {
            response.status(500).send(error.message);
        } 
    }

    static deleteBook(request, response){
        try {
            const bookID = request.params.id;
            BookModel.deleteOne({_id: bookID}, (error, deleteStatus) => {
                !(error) ? response.send(deleteStatus) : response.status(400).send(error.message);
            })
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    static updateBook(request, response){
        const bookID = request.params.id;
        const b = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status
        };
        BookModel.findOneAndUpdate({_id: bookID}, b, {new: true}, (error, result) => {
            !(error) ? response.send(result) : response.status(400).send(error.message);
        });
    }
}

router.get('/', Books.getBooks);
router.post('/', Books.postBooks);
router.delete('/:id', Books.deleteBook);
router.put('/:id', Books.updateBook);

module.exports = router;