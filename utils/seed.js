require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const Book = require('../models/Book');

const books = 
[
    {
        title: 'Introduction to Algorithms, 3rd Edition',
        description: 'The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.',
        status: 'unread'
    },
    {
        title: 'Genetic Algorithms with Python',
        description: 'Step-by-step tutorials build your skills from Hello World to optimizing one genetic algorithm with another.', 
        status: 'reading'
    },
    {
        title: 'Probability for the Enthusiastic Beginner',
        description: 'All of the standard introductory topics in probability are covered.',
        status: 'unread'
    }
]

async function seed(){
    for (const b of books){
        await Book.create(b);
    }
    
    console.log('books created');
    mongoose.disconnect();
}

seed();