import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { getUsers, updateUser, deleteUser, addUser } from './api/api';
import { Modal, Button } from 'react-bootstrap';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
      setUsers(prevUsers => prevUsers.filter((u) => u.id !== user.id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  const handleSave = async (formData) => {
    try {
      if (currentUser) {
        // Update existing user
        const updatedUser = { ...currentUser, ...formData };
        const response = await updateUser(currentUser.id, updatedUser);
        
        // Update the users state with the response data
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === currentUser.id ? response.data : user
          )
        );
      } else {
        // Add new user
        const response = await addUser(formData);
        setUsers(prevUsers => [...prevUsers, response.data]);
      }
      
      // Close the modal AFTER successful save
      handleCloseModal();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 text-primary">User Management</h1>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => {
            setCurrentUser(null);
            setIsFormOpen(true);
          }}
        >
          Add User
        </button>
      </div>
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal 
        show={isFormOpen} 
        onHide={handleCloseModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            currentUser={currentUser}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;