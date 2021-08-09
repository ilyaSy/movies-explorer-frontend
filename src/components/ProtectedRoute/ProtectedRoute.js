import { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, isLogged, path, ...props }) {
  const history = useHistory();
  const emailFromStorage = localStorage.getItem('email');
  useEffect(() => {
    if (!isLogged && !emailFromStorage) history.push('/');
  }, [history, isLogged, emailFromStorage]);

  return (
    <Route exact path={path}>
      {(isLogged || emailFromStorage) ? <Component {...props} /> : <Redirect to='/' />}
    </Route>
  );
}
