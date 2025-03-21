document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const booksContainer = document.getElementById("booksContainer");
    const reviewsContainer = document.getElementById("reviewsContainer");

    // Fetch and display books
    function fetchBooks() {
        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(books => {
                booksContainer.innerHTML = "";
                books.forEach(book => {
                    const div = document.createElement("div");
                    div.classList.add("book");
                    div.innerHTML = `
                        <h3>${book.title} - ${book.author}</h3>
                        <p><strong>Genre:</strong> ${book.genre}</p>
                        <p>${book.description}</p>
                        ${book.coverImage ? `<img src="${book.coverImage}" width="100">` : ""}
                        <button onclick="addReview(${book.id})">Write Review</button>
                    `;
                    booksContainer.appendChild(div);
                });
            });
    }

    // Submit book (Admin Only)
    bookForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(bookForm);

        fetch("http://localhost:3000/books", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(() => {
            bookForm.reset();
            fetchBooks();
        });
    });

    // Fetch and display reviews
    function fetchReviews() {
        fetch("http://localhost:3000/reviews")
            .then(response => response.json())
            .then(reviews => {
                reviewsContainer.innerHTML = "";
                reviews.forEach(review => {
                    const div = document.createElement("div");
                    div.classList.add("review");
                    div.innerHTML = `
                        <h3>${review.user} - Rating: ${review.rating}/5</h3>
                        <p>${review.review}</p>
                        <div>
                            <input type="text" placeholder="Write a comment" id="comment-${review.id}">
                            <button onclick="addComment(${review.id})">Comment</button>
                        </div>
                        <div id="comments-${review.id}">
                            ${review.comments.map(c => `<p>${c.user}: ${c.comment}</p>`).join("")}
                        </div>
                    `;
                    reviewsContainer.appendChild(div);
                });
            });
    }

    window.addComment = function(reviewId) {
        const comment = document.getElementById(`comment-${reviewId}`).value;
        fetch(`http://localhost:3000/reviews/${reviewId}/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: "Guest", comment })
        }).then(fetchReviews);
    };

    fetchBooks();
    fetchReviews();
});
