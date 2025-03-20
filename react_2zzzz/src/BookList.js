import React from 'react';

function BookList({ books, removeBook }) {
  return (
    <div>
      {books.length === 0 ? (
        <p className="text-center text-muted">No books available.</p>
      ) : (
        <ul className="list-group">
          {books.map((book, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <button onClick={() => removeBook(index)} className="btn btn-danger">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
