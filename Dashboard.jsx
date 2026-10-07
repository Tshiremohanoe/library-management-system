import React from 'react';

export default function Dashboard({ books }) {
  const lowStockBooks = books.filter(book => Number(book.quantity) < 2);

  return (
    <div>
      <h1>Library Overview Dashboard</h1>
      
      {lowStockBooks.length > 0 && (
        <div className="card" style={{borderLeft: '5px solid #dc2626'}}>
          <h3 style={{color: '#dc2626', margin: 0}}>⚠️ Low Stock Alert</h3>
          <p>The following titles have fewer than 2 copies available:</p>
          <ul>
            {lowStockBooks.map(book => (
              <li key={book.isbn}><strong>{book.title}</strong> ({book.quantity} left)</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <h3>Current Book Inventory</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr><td colSpan="5">No books registered in the system.</td></tr>
            ) : (
              books.map(book => (
                <tr key={book.isbn} className={Number(book.quantity) < 2 ? 'low-stock' : ''}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>
                    {book.quantity} {Number(book.quantity) < 2 && <span className="badge badge-warning">Low</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
