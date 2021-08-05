import { useContext, useEffect, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function ProtectedRoute({
  component: Component,
  loadUserData,
  path,
  ...props
}) {
  const currentUser = useContext(CurrentUserContext);  
  const [isLogged, setIsLogged] = useState(!!currentUser?.email);
  const history = useHistory();
  const pathname = history.location.pathname;

  useEffect(() => {
    loadUserData()
      .then((res) => {
        setIsLogged(res);
        history.push(pathname);
      })
      .catch((e) => {
        if (e.status !== 401) console.log(e)
      });
  }, []);

  return (
    <Route path={path}>
      {isLogged ? <Component {...props} /> : <Redirect to='/' />}
    </Route>
  );
}
