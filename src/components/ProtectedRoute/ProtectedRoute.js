import { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, isLogged, path, ...props }) {
  const history = useHistory();
  console.log(document.location.pathname);
  useEffect(() => {
    if (!isLogged) history.push('/');
  }, [history, isLogged]);

  return (
    <Route exact path={path}>
      {isLogged ? <Component {...props} /> : <Redirect to='/' />}
      {/* {isLogged && <Component {...props} />} */}
    </Route>
  );
}
