import React, { createContext, useReducer, useEffect } from 'react';
import { DUMMY_USERS } from '../utils/dummyData';
import { v4 as uuidv4 } from 'uuid';

export const UsersContext = createContext();

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  successMessage: null,
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_SUCCESS':
      return { ...state, successMessage: action.payload };

    case 'CLEAR_MESSAGES':
      return { ...state, error: null, successMessage: null };

    case 'LOAD_USERS':
      return { ...state, users: action.payload, loading: false };

    case 'ADD_USER': {
      const newUser = {
        id: uuidv4(),
        ...action.payload,
        education: action.payload.education || {},
        skills: action.payload.skills || '',
        projects: action.payload.projects || '',
        workExperience: action.payload.workExperience || [],
        linkedinUrl: action.payload.linkedinUrl || '',
        resume: action.payload.resume || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        users: [...state.users, newUser],
        successMessage: '✅ User added successfully!',
      };
    }

    case 'UPDATE_USER': {
      const updatedUsers = state.users.map(user =>
        user.id === action.payload.id
          ? {
              ...action.payload,
              updatedAt: new Date().toISOString(),
            }
          : user
      );
      return {
        ...state,
        users: updatedUsers,
        currentUser: action.payload,
        successMessage: '✅ User updated successfully!',
      };
    }

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        successMessage: '✅ User deleted successfully!',
      };

    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
};

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  // Load from localStorage or use dummy data on mount
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('users');
      if (savedUsers && savedUsers.trim()) {
        dispatch({ type: 'LOAD_USERS', payload: JSON.parse(savedUsers) });
      } else {
        dispatch({ type: 'LOAD_USERS', payload: DUMMY_USERS });
      }
    } catch (error) {
      console.error('Failed to load users:', error);
      dispatch({ type: 'LOAD_USERS', payload: DUMMY_USERS });
    }
  }, []);

  // Save to localStorage whenever users change - debounced
  useEffect(() => {
    if (state.users.length > 0) {
      const timer = setTimeout(() => {
        try {
          localStorage.setItem('users', JSON.stringify(state.users));
        } catch (error) {
          console.error('Failed to save users:', error);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.users]);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (state.successMessage || state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGES' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.successMessage, state.error]);

  const value = {
    state,
    dispatch,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
