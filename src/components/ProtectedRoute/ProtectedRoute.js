import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({
  component: Component,
  isLogged,
  path,
  ...props
}) {
  return (
    <Route path={path}>
      {isLogged ? <Component {...props} /> : <Redirect to='/' />}
    </Route>
  );
}
