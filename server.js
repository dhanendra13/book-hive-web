const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const PORT = 3000;
const DATA_FILE = 'reviews.json';
const BOOKS_FILE = 'books.json';
const COMMENTS_FILE = 'comments.json';

// Admin Secret Key (Change it)
const ADMIN_SECRET = "your-secret-key";

// Setup storage for book cover images
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Load books
app.get('/books', (req, res) => {
    fs.readFile(BOOKS_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading book data' });
        res.json(JSON.parse(data));
    });
});

// Add a new book (Only Admin)
app.post('/books', upload.single('coverImage'), (req, res) => {
    const { title, author, genre, description, adminKey } = req.body;
    if (adminKey !== ADMIN_SECRET) return res.status(403).json({ error: "Unauthorized" });

    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;
    if (!title || !author || !genre || !description) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    fs.readFile(BOOKS_FILE, (err, data) => {
        const books = err ? [] : JSON.parse(data);
        const newBook = { id: Date.now(), title, author, genre, description, coverImage };
        books.push(newBook);
        fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), () => res.json(newBook));
    });
});

// Load reviews
app.get('/reviews', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });
        res.json(JSON.parse(data));
    });
});

// Add a new review
app.post('/reviews', (req, res) => {
    const { bookId, user, review, rating } = req.body;
    if (!bookId || !user || !review || !rating) return res.status(400).json({ error: 'Missing fields' });

    fs.readFile(DATA_FILE, (err, data) => {
        const reviews = err ? [] : JSON.parse(data);
        const newReview = { id: Date.now(), bookId, user, review, rating, comments: [] };
        reviews.push(newReview);
        fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2), () => res.json(newReview));
    });
});

// Add a comment to a review
app.post('/reviews/:id/comment', (req, res) => {
    const reviewId = parseInt(req.params.id);
    const { user, comment } = req.body;
    if (!user || !comment) return res.status(400).json({ error: 'Missing fields' });

    fs.readFile(DATA_FILE, (err, data) => {
        let reviews = err ? [] : JSON.parse(data);
        let review = reviews.find(r => r.id === reviewId);
        if (!review) return res.status(404).json({ error: "Review not found" });

        review.comments.push({ id: Date.now(), user, comment });
        fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2), () => res.json({ success: true }));
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
