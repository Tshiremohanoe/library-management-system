import React, { useState } from 'react';

export default function UserManagement({ users, setUsers, currentUser, setCurrentUser }) {
  const [loginId, setLoginId] = useState('');
  const [userForm, setUserForm] = useState({ name: '', membershipId: '', role: 'Librarian' });
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setEditingId(null);
    setUserForm({ name: '', membershipId: '', role: 'Librarian' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = userForm.name.trim();
    const membershipId = userForm.membershipId.trim();

    if (!name || !membershipId) return;
    if (users.some(user => user.id !== editingId && user.membershipId.toLowerCase() === membershipId.toLowerCase())) {
      window.alert('A user with this membership ID already exists.');
      return;
    }

    if (editingId) {
      const updatedUser = { ...userForm, name, membershipId, id: editingId };
      setUsers(users.map(user => user.id === editingId ? updatedUser : user));
      if (currentUser.id === editingId) setCurrentUser(updatedUser);
    } else {
      setUsers([...users, { ...userForm, name, membershipId, id: membershipId }]);
    }

    resetForm();
  };

  const handleDelete = (user) => {
    if (user.role === 'Admin' && users.filter(item => item.role === 'Admin').length === 1) {
      window.alert('The last administrator cannot be deleted.');
      return;
    }
    if (!window.confirm(`Delete the account for ${user.name}?`)) return;

    setUsers(users.filter(item => item.id !== user.id));
    if (currentUser.id === user.id) setCurrentUser(null);
    if (editingId === user.id) resetForm();
  };

  return (
    <div>
      <h1>Access Control & User Accounts</h1>
      {!currentUser ? (
        <div className="card" style={{maxWidth: '400px', margin: '2rem auto'}}>
          <h3>Librarian Login Gate</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const found = users.find(user => user.membershipId.toLowerCase() === loginId.trim().toLowerCase());
            if (found) setCurrentUser(found);
            else window.alert('Invalid Membership ID.');
          }}>
            <div className="form-group">
              <label htmlFor="login-membership-id">Membership ID</label>
              <input id="login-membership-id" className="form-control" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Try default: M001" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Authenticate</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="card">
            <h3>Signed in as {currentUser.name} ({currentUser.role})</h3>
            <button type="button" className="btn" onClick={() => setCurrentUser(null)}>Log Out</button>
          </div>
          {currentUser.role !== 'Admin' ? (
            <div className="card">
              <p>Only an administrator can manage user accounts.</p>
            </div>
          ) : (
            <>
              <div className="card">
                <h3>{editingId ? 'Update User' : 'Add User'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="user-name">Full Name</label>
                    <input id="user-name" className="form-control" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user-membership-id">Membership ID</label>
                    <input id="user-membership-id" className="form-control" value={userForm.membershipId} onChange={(e) => setUserForm({ ...userForm, membershipId: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user-role">Role</label>
                    <select id="user-role" className="form-control" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
                      <option value="Librarian">Librarian</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add User'}</button>
                  {editingId && <button type="button" className="btn" onClick={resetForm}>Cancel</button>}
                </form>
              </div>
              <div className="card">
                <h3>System Users</h3>
                <table>
                  <thead>
                    <tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.membershipId}</td>
                        <td>{user.role}</td>
                        <td>
                          <button type="button" className="btn btn-primary" onClick={() => {
                            setEditingId(user.id);
                            setUserForm({ name: user.name, membershipId: user.membershipId, role: user.role });
                          }}>Update</button>
                          <button type="button" className="btn btn-danger" onClick={() => handleDelete(user)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
