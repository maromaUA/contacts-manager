import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/login';
import Registration from './Registration/registrations';
import Homepage from './HomePage/homepage';
import Layout from './Layout/Layout';
import { useDispatch } from 'react-redux';
import useAuth from './hooks/useAuth';
import { refreshUserOperation } from '../redux/auth/operations';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import ConfirmEmailPage from './ConfirmEmailPage/ConfirmEmailPage';

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUserOperation());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user...</p>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <RestrictedRoute redirectTo="/contacts" component={<Login />} />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/" component={<Registration />} />
          }
        ></Route>
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/" component={<Homepage />} />}
        ></Route>
        <Route path="/confirm" element={<ConfirmEmailPage />}></Route>
        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
};

export default App;
