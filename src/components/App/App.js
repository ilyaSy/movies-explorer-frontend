import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainApi from '../../utils/MainApi';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();

  const signIn = (email, password, setError) => {
    MainApi.signIn({ email, password })
      .then((res) => {
        if (res.login === 'success') {
          setIsLogged(true);
          setCurrentUser({ email: email });
          history.push(moviesURL);

          MainApi.getMe().then((res) => {
            console.log('get user data', res)
            if (res.data) setCurrentUser(res.data);
          })
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setError('Вы ввели неправильные почту или пароль');
        } else if (err.status === 500) {
          setError('На сервере произошла ошибка');
        } else if (err.status === 404) {
          setError('Страница по указаному маршруту не найдена');
        } else {
          setError('При авторизации произошла ошибка');
        }

        // console.log(err);
      });
  };

  const signUp = (name, email, password, setError) => {
    MainApi.signUp({ name, email, password })
      .then((res) => {
        if (res.data) {
          // setCurrentUser({
          //   name: 'Илья',
          //   email: email,
          // });
          history.push(signinURL);
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setError('Пользователь с таким email уже существует');
        } else if (err.status === 500) {
          setError('На сервере произошла ошибка');
        } else if (err.status === 404) {
          setError('Страница по указаному маршруту не найдена');
        } else {
          setError('При регистрации произошла ошибка');
        }

        // console.log(err);
      });
  };

  const signOut = () => {
    MainApi.signOut()
      .then((res) => {
        console.log(' signOut', res)
        if (res.signout === 'success') history.push('/');
      })
      .catch(console.log);
  };

  // useEffect(() => {}, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLogged={isLogged}/>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>

        <Route path={signupURL}>
          <Register signUp={signUp} />
        </Route>

        <Route path={signinURL}>
          <Login signIn={signIn} />
        </Route>

        <ProtectedRoute
          component={Movies}
          path={moviesURL}
        />

        <ProtectedRoute
          component={SavedMovies}
          path={savedMoviesURL}
        />

        <ProtectedRoute
          component={Profile}
          signOut={signOut}
          setUserData={setCurrentUser}
          path={profileURL}
        />

        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </CurrentUserContext.Provider>
  );
}
