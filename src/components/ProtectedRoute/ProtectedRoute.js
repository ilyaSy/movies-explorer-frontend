import { signinURL } from '../../utils/constants';
import {Redirect, Route} from 'react-router-dom';

export default function ProtectedRoute({component: Component, isLogged, ...props}){
  return (
  <Route>
    {isLogged ? <Component {...props} /> : <Redirect to={signinURL}/>}
  </Route>
  )
}