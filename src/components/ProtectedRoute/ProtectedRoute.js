import { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, isLogged, loadMe, path, ...props }) {
  const history = useHistory();
  console.log(document.location.pathname);
  useEffect(() => {
    if (!isLogged) {
      const pathname = document.location.pathname;
      loadMe(pathname);
      history.push('/');
    }
  }, [history, isLogged, loadMe]);

  return (
    <Route exact path={path}>
      {isLogged ? <Component {...props} /> : <Redirect to='/' />}
      {/* {isLogged && <Component {...props} />} */}
    </Route>
  );
}
