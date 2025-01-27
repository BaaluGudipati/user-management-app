import React from 'react';
import { Button } from 'react-bootstrap';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Button
                variant="warning"
                onClick={() => onEdit(user)}
                className="mx-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => onDelete(user)}
                className="mx-2"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
