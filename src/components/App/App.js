import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import {
  signupURL,
  signinURL,
  profileURL,
  moviesURL,
  savedMoviesURL,
} from '../../utils/constants';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>

        <Route path={signupURL}>
          <Register />
        </Route>

        <Route path={signinURL}>
          <Login />
        </Route>

        <Route path={profileURL}>
          <Login />
        </Route>

        <Route path={moviesURL}>
          <Login />
        </Route>

        <Route path={savedMoviesURL}>
          <Login />
        </Route>

        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
