import React, { useState } from 'react';
import BookList from './BookList';
import AddBookForm from './AddBookForm';

function App() {
  const [books, setBooks] = useState([
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { title: '1984', author: 'George Orwell' }
  ]);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const removeBook = (index) => {
    const updatedBooks = books.filter((_, bookIndex) => bookIndex !== index);
    setBooks(updatedBooks);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center mt-4">Book List</h1>
        <AddBookForm addBook={addBook} />
        <BookList books={books} removeBook={removeBook} />
      </div>
    </div>
  );
}

export default App;
