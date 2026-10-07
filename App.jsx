import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard';
import BookManagement from './BookManagement';
import Transactions from './Transactions';
import UserManagement from './UserMangement';
import './App.css';

export default function App() {
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem('library_books')) || []);
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('library_users')) || [{ id: 'M001', name: 'Admin', membershipId: 'M001', role: 'Admin' }]);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('library_transactions')) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('library_current_user')) || null);

  useEffect(() => { localStorage.setItem('library_books', JSON.stringify(books)); }, [books]);
  useEffect(() => { localStorage.setItem('library_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('library_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { currentUser ? localStorage.setItem('library_current_user', JSON.stringify(currentUser)) : localStorage.removeItem('library_current_user'); }, [currentUser]);

  return (
    <Router>
      <header className="navbar">
        <h2>Library Management</h2>
        <nav className="nav-links">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard books={books} />} />
          <Route path="/books" element={<BookManagement books={books} setBooks={setBooks} />} />
          <Route path="/transactions" element={<Transactions books={books} setBooks={setBooks} transactions={transactions} setTransactions={setTransactions} />} />
          <Route path="/users" element={<UserManagement users={users} setUsers={setUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        </Routes>
      </main>
    </Router>
  );
}
