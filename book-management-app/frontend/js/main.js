document.addEventListener('DOMContentLoaded', function() {
  const booksContainer = document.getElementById('booksContainer');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Load all books on page load
  fetchBooks();

  // Search functionality
  searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      fetchBooks(searchTerm);
    }
  });

  // Reset search
  resetBtn.addEventListener('click', function() {
    searchInput.value = '';
    fetchBooks();
  });

  // Function to fetch books
  function fetchBooks(author = '') {
    let url = 'http://localhost:5000/api/books';
    if (author) {
      url += `/search?author=${encodeURIComponent(author)}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayBooks(data);
      })
      .catch(error => {
        console.error('Error:', error);
        booksContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <div class="alert alert-danger">
              <i class="fas fa-exclamation-triangle me-2"></i>
              Failed to load books. Please try again later.
            </div>
          </div>
        `;
      });
  }

  // Function to display books
  function displayBooks(books) {
    if (books.length === 0) {
      booksContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            No books found. Try a different search or add some books.
          </div>
        </div>
      `;
      return;
    }

    booksContainer.innerHTML = '';
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'col-md-4 mb-4';
      bookCard.innerHTML = `
        <div class="card h-100 book-card shadow-sm">
          <img src="${book.coverImage}" class="card-img-top book-cover" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text text-muted">by ${book.author}</p>
          </div>
          <div class="card-footer bg-transparent">
            <span class="badge bg-success">$${book.price.toFixed(2)}</span>
            <small class="text-muted float-end">
              Added ${new Date(book.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>
      `;
      booksContainer.appendChild(bookCard);
    });
  }
});