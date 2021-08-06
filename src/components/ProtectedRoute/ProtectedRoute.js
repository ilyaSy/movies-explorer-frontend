import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, isLogged, path, ...props }) {
  const history = useHistory();
  useEffect(() => {
    if (!isLogged) history.push('/');
  }, [history, isLogged]);

  return (
    <Route path={path}>
      {/* {isLogged ? <Component {...props} /> : <Redirect to='/' />} */}
      {isLogged && <Component {...props} />}
    </Route>
  );
}
