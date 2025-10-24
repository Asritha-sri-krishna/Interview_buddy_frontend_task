import { useContext, useCallback } from 'react';
import { UsersContext } from '../context/UsersContext';

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within UsersProvider');
  }

  const { state, dispatch } = context;

  const addUser = useCallback((userData) => {
    dispatch({
      type: 'ADD_USER',
      payload: userData,
    });
  }, [dispatch]);

  const updateUser = useCallback((userId, userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: { id: userId, ...userData },
    });
  }, [dispatch]);

  const deleteUser = useCallback((userId) => {
    dispatch({
      type: 'DELETE_USER',
      payload: userId,
    });
  }, [dispatch]);

  return {
    users: state.users,
    currentUser: state.currentUser,
    loading: state.loading,
    error: state.error,
    successMessage: state.successMessage,
    addUser,
    updateUser,
    deleteUser,
    dispatch,
    state,
  };
};