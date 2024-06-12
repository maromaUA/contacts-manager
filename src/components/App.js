import './App.css';
import React, { useEffect, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './Layout/Layout';
import { useDispatch } from 'react-redux';
import useAuth from '../shared/hooks/useAuth';
import { refreshUserOperation } from '../redux/auth/operations';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';

const Homepage = lazy(() => import('../pages/HomePage/homepage'));
const Registration = lazy(() => import('../pages/Registration/registration'));
const Login = lazy(() => import('../pages/Login/login'));


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

        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
      
    </Routes>
  );
};

export default App;
