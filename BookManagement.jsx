import React, { useState } from 'react';

export default function BookManagement({ books, setBooks }) {
  const [formData, setFormData] = useState({ title: '', author: '', genre: '', isbn: '', quantity: '' });
  const [editingIsbn, setEditingIsbn] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.genre.trim() || !formData.isbn.trim() || !Number.isInteger(Number(formData.quantity)) || Number(formData.quantity) < 0) return;

    if (editingIsbn) {
      setBooks(books.map(b => b.isbn === editingIsbn ? { ...formData, quantity: Number(formData.quantity) } : b));
      setEditingIsbn(null);
    } else {
      if (books.find(b => b.isbn === formData.isbn)) {
        alert("A book with this ISBN already exists.");
        return;
      }
      setBooks([...books, { ...formData, quantity: Number(formData.quantity) }]);
    }
    setFormData({ title: '', author: '', genre: '', isbn: '', quantity: '' });
  };

  return (
    <div>
      <h1>Book Management</h1>
      <div className="card">
        <h3>{editingIsbn ? "Update Book Details" : "Add New Book"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Title</label><input className="form-control" name="title" value={formData.title} onChange={handleChange} required /></div>
          <div className="form-group"><label>Author</label><input className="form-control" name="author" value={formData.author} onChange={handleChange} required /></div>
          <div className="form-group"><label>Genre</label><input className="form-control" name="genre" value={formData.genre} onChange={handleChange} required /></div>
          <div className="form-group"><label>ISBN</label><input className="form-control" name="isbn" value={formData.isbn} onChange={handleChange} disabled={!!editingIsbn} required /></div>
          <div className="form-group"><label>Initial Quantity</label><input className="form-control" type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" step="1" required /></div>
          <button type="submit" className="btn btn-primary">{editingIsbn ? "Update Details" : "Add Book"}</button>
          {editingIsbn && <button type="button" className="btn" onClick={() => { setEditingIsbn(null); setFormData({title:'', author:'', genre:'', isbn:'', quantity:''}); }}>Cancel</button>}
        </form>
      </div>

      <div className="card">
        <h3>Registered Books</h3>
        <table>
          <thead>
            <tr><th>Title / Author</th><th>ISBN</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.isbn}>
                <td><strong>{book.title}</strong><br/><span style={{fontSize:'0.85rem', color:'#666'}}>{book.author}</span></td>
                <td>{book.isbn}</td>
                <td>{book.quantity}</td>
                <td>
                  <button onClick={() => { setEditingIsbn(book.isbn); setFormData(book); }} className="btn btn-primary" style={{marginRight: '5px'}}>Update</button>
                  <button onClick={() => { if(window.confirm("Delete book?")) setBooks(books.filter(b => b.isbn !== book.isbn)); }} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
