import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { signinURL } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function ProtectedRoute({component: Component, loadUserData, path, ...props}){
  const currentUser = useContext(CurrentUserContext);
  const isLogged = !!currentUser?.email;
  if (!isLogged) loadUserData();

  console.log('isLogged ' + isLogged);

  return (
    <Route path={path}>
      {isLogged ? <Component {...props} /> : <Redirect to={signinURL}/>}
    </Route>
  )
}