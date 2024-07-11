const apiUrl = window.location.origin.includes('localhost') ? 'http://localhost:3000/api/books' : '/api/books';

async function fetchBooks() {
    const response = await fetch(apiUrl);
    const books = await response.json();
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <h3>${book.name}</h3>
            <p>Price: $${book.price}</p>
            <p>${book.description}</p>
            <p>Rating: ${book.rating}</p>
            <div class="actions">
                <button onclick="editBook('${book._id}')">Edit</button>
                <button onclick="deleteBook('${book._id}')">Delete</button>
            </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
}

async function viewJSONProduct() {
    window.location.href = 'http://localhost:3000/api/books'
}

async function addBook() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const rating = document.getElementById('rating').value;

    const book = {
        name,
        price,
        description,
        rating
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });

    const newBook = await response.json();
    fetchBooks();
}

async function deleteBook(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchBooks();
}

async function editBook(id) {
    // Logic for editing a book (you can add similar form handling as in addBook)
}

fetchBooks();
