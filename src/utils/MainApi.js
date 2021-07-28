import { apiURL } from './constants';

const headers = {'Content-Type': 'application/json'};

export default class MainApi {
  /* Authentication */
  static signIn(userData) {
    return fetch(`${apiURL}/signin`,  {method: 'POST', headers: headers, body: JSON.stringify(userData)})
      .then(MainApi._handleApiResult.bind(null, 'signIn'));
  }

  static signUp(userData) {
    return fetch(`${apiURL}/signup`,  {method: 'POST', headers: headers, body: JSON.stringify(userData)})
      .then(MainApi._handleApiResult.bind(null, 'signUp'));
  }

  static signOut() {
    return fetch(`${apiURL}/signout`,  {method: 'POST', headers: headers})
      .then(MainApi._handleApiResult.bind(null, 'signOut'));
  }

  /* User data api */
  static getMe() {
    return fetch(`${apiURL}/users/me`)
      .then(MainApi._handleApiResult.bind(null, 'getMe'));
  }

  static patchMe(userData) {
    return fetch(`${apiURL}/users/me`,  {method: 'PATCH', headers: headers, body: JSON.stringify(userData)})
      .then(MainApi._handleApiResult.bind(null, 'patchMe'));
  }

  /* Movie data api */
  static getMovies() {
    return fetch(`${apiURL}/movies`)
      .then(MainApi._handleApiResult.bind(null, 'getMovies'));
  }

  static patchMovie(movieData) {
    return fetch(`${apiURL}/movies`,  {method: 'PATCH', headers: headers, body: JSON.stringify(movieData)})
      .then(MainApi._handleApiResult.bind(null, 'patchMovie'));
  }

  static removeMovie(movieId) {
    return fetch(`${apiURL}/movies/${movieId}`,  {method: 'DELETE', headers: headers})
      .then(MainApi._handleApiResult.bind(null, 'removeMovie'));
  }

  /* handle error */
  static _handleApiResult(fnName, res) {
    return ['OK', 'Created', 'No Content'].includes(res.statusText)
      ? res.json()
      : Error(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }
}