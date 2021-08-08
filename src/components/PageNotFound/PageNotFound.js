import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound(){
  const history = useHistory();
  const goBack = () => history.go(-2);

  return (
    <main className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <p className="page-not-found__back-url" onClick={goBack}>Назад</p>
    </main>
  );
}