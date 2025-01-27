import React, { useState, useEffect } from 'react';
import { Menu, User, LogOut, Sun, Moon, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

const API_URL = "https://jsonplaceholder.typicode.com/users";

// API Functions
export const getUsers = async () => {
  return await axios.get(API_URL);
};

export const updateUser = async (id, user) => {
  return await axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const addUser = async (user) => {
  return await axios.post(API_URL, user);
};
