import React, { useState } from 'react';

export default function Transactions({ books, setBooks, transactions, setTransactions }) {
  const [selectedIsbn, setSelectedIsbn] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransaction = (type) => {
    const quantityChange = Number(amount);
    if (!selectedIsbn || !Number.isInteger(quantityChange) || quantityChange <= 0) return;
    const targetBook = books.find(b => b.isbn === selectedIsbn);
    if (!targetBook) return;

    if (type === 'deduct' && targetBook.quantity < quantityChange) {
      alert("Insufficient stock available.");
      return;
    }

    setBooks(books.map(b => b.isbn === selectedIsbn ? { ...b, quantity: type === 'add' ? b.quantity + quantityChange : b.quantity - quantityChange } : b));
    setTransactions([{
      id: Date.now(),
      title: targetBook.title,
      type: type === 'add' ? 'Arrival (Stock Added)' : 'Borrowed (Stock Deducted)',
      amount: quantityChange,
      date: new Date().toLocaleString()
    }, ...transactions]);
    setAmount('');
  };

  return (
    <div>
      <h1>Availability & Stock Transactions</h1>
      <div className="card">
        <h3>Record New Transaction</h3>
        <div className="form-group">
          <label>Select Target Book</label>
          <select className="form-control" value={selectedIsbn} onChange={(e) => setSelectedIsbn(e.target.value)}>
            <option value="">-- Choose Book --</option>
            {books.map(b => <option key={b.isbn} value={b.isbn}>{b.title} (Current: {b.quantity})</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity Change Amount</label>
          <input className="form-control" type="number" min="1" step="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 5" />
        </div>
        <button onClick={() => handleTransaction('add')} className="btn btn-primary" style={{marginRight: '10px'}}>➕ Add Stock</button>
        <button onClick={() => handleTransaction('deduct')} className="btn btn-danger">➖ Deduct Stock</button>
      </div>

      <div className="card">
        <h3>Transaction History Log</h3>
        <table>
          <thead>
            <tr><th>Timestamp</th><th>Book Title</th><th>Action Event</th><th>Quantity</th></tr>
          </thead>
          <tbody>
            {transactions.map(log => (
              <tr key={log.id}><td>{log.date}</td><td>{log.title}</td><td>{log.type}</td><td><strong>{log.amount}</strong></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
