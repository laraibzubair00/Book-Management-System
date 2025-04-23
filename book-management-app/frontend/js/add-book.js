document.addEventListener('DOMContentLoaded', function() {
  const addBookForm = document.getElementById('addBookForm');

  addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = parseFloat(document.getElementById('price').value);
    const coverImage = document.getElementById('coverImage').value || 'https://via.placeholder.com/150';

    const bookData = {
      title,
      author,
      price,
      coverImage
    };

    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
    .then(response => response.json())
    .then(data => {
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success alert-dismissible fade show';
      alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Book added successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      
      const cardBody = document.querySelector('.card-body');
      cardBody.insertBefore(alertDiv, cardBody.firstChild);
      
      // Reset form
      addBookForm.reset();
      
      // Remove alert after 3 seconds
      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    })
    .catch((error) => {
      console.error('Error:', error);
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-danger alert-dismissible fade show';
      alertDiv.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        Failed to add book. Please try again.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      
      const cardBody = document.querySelector('.card-body');
      cardBody.insertBefore(alertDiv, cardBody.firstChild);
    });
  });
});