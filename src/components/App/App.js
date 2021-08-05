import { useState } from 'react';
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
import MoviesApi from '../../utils/MoviesApi';
import errorHandler from '../../utils/errorHandler';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  signupURL,
  signinURL,
  profileURL,
  moviesURL,
  savedMoviesURL,
  imagesApiURL,
} from '../../utils/constants';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [userMovies, setUserMovies] = useState(null);
  const [movies, setMovies] = useState(null);
  const history = useHistory();

  const loadUserData = () => {
    return MainApi.getMe()
      .then((res) => {
        if (res.data) {
          setCurrentUser(res.data);
          setIsLogged(true);
          return true;
        }
        return false;
      })
  };

  const signIn = (email, password, setError) => {
    MainApi.signIn({ email, password })
      .then((res) => {
        if (res.login === 'success') {
          setIsLogged(true);
          setCurrentUser({ email: email });
          history.push(moviesURL);

          MainApi.getMe().then((res) => {
            console.log('get user data', res);
            if (res.data) setCurrentUser(res.data);
          });
        }
      })
      .catch((err) => setError(errorHandler(err.status, 'login')));
  };

  const signUp = (name, email, password, setError) => {
    MainApi.signUp({ name, email, password })
      .then((res) => {
        if (res.data) signIn(email, password, setError);
      })
      .catch((err) => setError(errorHandler(err.status, 'registration')));
  };

  const signOut = () => {
    MainApi.signOut()
      .then((res) => {
        if (res.signout === 'success') {
          setIsLogged(false);
          setUserMovies(null);
          setMovies(null);
          history.push('/');
        }
      })
      .catch(console.log);
  };

  const loadUserMovies = (setIsErrData, setIsLoading) => {
    setIsLoading(true);
    MainApi.getMovies()
      .then((loadedMovies) => {
        setUserMovies(loadedMovies.filter((m) => m.owner.email === currentUser.email));
      })
      .catch(() => setIsErrData(true))
      .finally(() => setIsLoading(false));
  };

  const loadMovies = (setIsErrData, setIsLoading) => {
    setIsLoading(true);
    MoviesApi.getMovies()
      .then((beatfilmMovies) => {
        setMovies(beatfilmMovies.map(createMovieCard));
      })
      .catch(() => setIsErrData(true))
      .finally(() => setIsLoading(false));
  };

  const createMovieCard = (movie) => {
    return {
      country: movie.country || 'unknown',
      director: movie.director || 'unknown',
      duration: movie.duration || 404,
      year: movie.year || 1970,
      description: movie.description || 'unknown',
      image: imagesApiURL + movie.image.url || 'unknown',
      trailer: movie.trailerLink || 'unknown',
      thumbnail: imagesApiURL + movie.image.formats.thumbnail.url || 'unknown',
      movieId: movie.id || 404,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
      _id: userMovies.find((m) => m.movieId === movie.id)?._id,
    };
  };

  const updateMoviesList = (movie) => {
    const movieUpdated = movies.find((m) => m.movieId === movie.movieId);
    if (movieUpdated._id) {
      delete movieUpdated._id;
      setUserMovies(userMovies.filter((m) => m.movieId !== movie.movieId));
      setMovies(
        movies.map((m) => (m.movieId === movie.movieId ? movieUpdated : m))
      );
    } else {
      setUserMovies([...userMovies, movie]);
      setMovies(
        movies.map((m) =>
          m.movieId === movie.movieId ? { ...movieUpdated, _id: movie._id } : m
        )
      );
    }
  };

  const updateUserMoviesList = (movie) => {
    delete movie._id;
    setUserMovies(userMovies.filter((m) => m.movieId !== movie.movieId));
    setMovies(
      movies.map((m) => (m.movieId === movie.movieId ? movie : m))
    );
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLogged={isLogged} />
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
          loadUserData={loadUserData}
          component={Movies}
          movies={movies}
          loadMovies={loadMovies}
          userMovies={userMovies}
          loadUserMovies={loadUserMovies}
          onMovieAction={updateMoviesList}
          path={moviesURL}
        />

        <ProtectedRoute
          loadUserData={loadUserData}
          component={SavedMovies}
          userMovies={userMovies}
          loadUserMovies={loadUserMovies}
          onMovieAction={updateUserMoviesList}
          path={savedMoviesURL}
        />

        <ProtectedRoute
          loadUserData={loadUserData}
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
