import { moviesApiURL } from './constants';

export default class MoviesApi {
  static getMovies() {
    return fetch(moviesApiURL).then((res) => {
      return res.ok ? 
        res.json() : 
        Promise.reject(`Ошибка получения данных сервиса: ${res.status} ${res.statusText}`);
    });
  }
}
