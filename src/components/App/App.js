import { useEffect, useState } from 'react';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
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
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: localStorage.getItem('email')
  });
  const [isLogged, setIsLogged] = useState(false);
  const [userMovies, setUserMovies] = useState(null);
  const [movies, setMovies] = useState(null);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [infoText, setInfoText] = useState('');
  const history = useHistory();
  const [pathname, setPathname] = useState(history.location.pathname);

  useEffect(() => {
    if (history.location.pathname !== '/') {
      setPathname(history.location.pathname);
    }
  }, [history]);

  useEffect(() => {
    MainApi.getMe()
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData.data);
          setIsLogged(true);
          history.push(pathname);
          localStorage.setItem('email', userData.data.email);
        }
      })
      .catch((e) => {
        localStorage.removeItem('email');
        history.push('/');
        if (e.status !== 401) console.log(e)
      });
  }, [history, pathname]);

  const signIn = (email, password, setError, setIsLoading) => {
    setIsLoading(true);
    MainApi.signIn({ email, password })
      .then((res) => {
        if (res.login === 'success') {
          setIsLogged(true);
          setCurrentUser({ email: email });
          localStorage.setItem('email', email);
          history.push(moviesURL);

          MainApi.getMe().then((res) => {
            if (res.data) setCurrentUser(res.data);
          });
        }
      })
      .catch((err) => setError(errorHandler(err.status, 'login')))
      // .finally(() => setIsLoading(false));
  };

  const signUp = (name, email, password, setError, setIsLoading) => {
    setIsLoading(true);
    MainApi.signUp({ name, email, password })
      .then((res) => {
        if (res.data) signIn(email, password, setError);
      })
      .catch((err) => setError(errorHandler(err.status, 'registration')))
      .finally(() => setIsLoading(false));
  };

  const signOut = () => {
    MainApi.signOut()
      .then((res) => {
        if (res.signout === 'success') {
          setIsLogged(false);
          setUserMovies(null);
          setMovies(null);
          localStorage.removeItem('email');
          history.push('/');
        }
      })
      .catch(console.log);
  };

  const loadUserMovies = (setIsErrData, setIsLoading) => {
    setIsLoading(true);
    const email = currentUser.email || localStorage.getItem('email');
    MainApi.getMovies()
      .then((loadedMovies) => {
        setUserMovies(loadedMovies.filter((m) => m.owner.email === email));
      })
      .catch((err) => {
        console.log(err);
        setIsErrData(true);
      })
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
    setUserMovies(userMovies.filter((m) => m.movieId !== movie.movieId));
    if (movies) {
      delete movie._id;
      setMovies(movies.map((m) => (m.movieId === movie.movieId ? movie : m)));
    }
  };

  const handleTooltipOpen = () => setIsTooltipOpened(true);
  const handleTooltipClose = () => setIsTooltipOpened(false);

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
          isLogged={isLogged}
          component={Movies}
          movies={movies}
          loadMovies={loadMovies}
          userMovies={userMovies}
          loadUserMovies={loadUserMovies}
          onMovieAction={updateMoviesList}
          path={moviesURL}
        />

        <ProtectedRoute
          isLogged={isLogged}
          component={SavedMovies}
          userMovies={userMovies}
          loadUserMovies={loadUserMovies}
          onMovieAction={updateUserMoviesList}
          path={savedMoviesURL}
        />

        <ProtectedRoute
          isLogged={isLogged}
          component={Profile}
          signOut={signOut}
          setUserData={setCurrentUser}
          path={profileURL}
          onTooltipOpen={handleTooltipOpen}
          setInfoText={setInfoText}
        />

        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />

      <InfoTooltip 
        isOpened={isTooltipOpened}
        onClose={handleTooltipClose}
        text={infoText}
      />

    </CurrentUserContext.Provider>
  );
}
