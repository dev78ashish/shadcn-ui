import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import ProtectedRoute from './ProtectedRoute';
import Food from '../components/TableComponents/Food';
import Fruits from '../components/TableComponents/Fruits';
import Books from '../components/TableComponents/Books';
import Cars from '../components/TableComponents/Cars';
import Movies from '../components/TableComponents/Movies';

const LandingPage = lazy(() => import('../Pages/LandingPage'));
const Login = lazy(() => import('../Pages/Login'));
const Signup = lazy(() => import('../Pages/Signup'));
const Dashboard = lazy(() => import('../Pages/Dashboard'));
const Analytics = lazy(() => import('../Pages/Analytics'));
const Revenue = lazy(() => import('../Pages/Revenue'));
const Data = lazy(() => import('../Pages/Data'));
const Contact = lazy(() => import('../Pages/Contact'));
const Settings = lazy(() => import('../Pages/Settings'));
const RegisterForm = lazy(() => import('../Pages/RegisterForm'));
const DataContainer = lazy(() => import('../Pages/DataContainer'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route index element={<Navigate to={ROUTES.ANALYTICS} replace />} />
            <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
            <Route path={ROUTES.REVENUE} element={<Revenue />} />
            <Route path={ROUTES.DATA} element={<DataContainer />}>
              <Route index element={<Data />} />
              <Route path={ROUTES.FOOD} element={<Food />} />
              <Route path={ROUTES.FRUITS} element={<Fruits />} />
              <Route path={ROUTES.CARS} element={<Cars />} />
              <Route path={ROUTES.BOOKS} element={<Books />} />
              <Route path={ROUTES.MOVIES} element={<Movies />} />
            </Route>
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.REGISTERFORM} element={<RegisterForm />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;