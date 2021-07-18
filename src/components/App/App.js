import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {
  signupURL,
  signinURL,
  profileURL,
  moviesURL,
  savedMoviesURL,
} from '../../utils/constants';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser({
      name: 'Илья',
      email: 'kuzya@yandex.ru'
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          <Profile />
        </Route>

        <Route path={moviesURL}>
          <Movies />
        </Route>

        <Route path={savedMoviesURL}>
          <Login />
        </Route>

        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </CurrentUserContext.Provider>
  );
}
