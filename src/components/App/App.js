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

  const signIn = (email, password) => {
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
      .catch(console.log);
  };

  const signUp = (name, email, password) => {
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
      .catch(console.log);
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

        <Route path={profileURL}>
          <Profile  
            signOut={signOut}
            setUserData={setCurrentUser}
          />
        </Route>

        <Route path={moviesURL}>
          <Movies />
        </Route>

        <Route path={savedMoviesURL}>
          <SavedMovies />
        </Route>

        {/* <ProtectedRoute 
          isLogged={isLogged}
          component={Movies}
        />

        <ProtectedRoute 
          isLogged={isLogged}
          component={SavedMovies}
        />

        <ProtectedRoute 
          isLogged={isLogged}
          component={Profile}
        /> */}

        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </CurrentUserContext.Provider>
  );
}
