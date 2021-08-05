const errorHandler = (statusCode, componentName) => {
  let text = '';
  let error = '';
  switch (componentName) {
    case 'registration':
      text = 'регистрации';
      break;
    case 'login':
      text = 'авторизации';
      break;
    case 'profile':
      text = 'обновлении профиля';
      break;
    default:
      text = '';
      break;
  }

  switch (statusCode) {
    case 401:
      error = 'Вы ввели неправильные почту или пароль';
      break;
    case 409:
      error = 'Пользователь с таким email уже существует';
      break;
    case 404:
      error = 'Страница по указаному маршруту не найдена';
      break;
    case 500:
      error = 'На сервере произошла ошибка';
      break;
    default:
      error = `При ${text} произошла ошибка`;
      break;
  }

  return error;
}

export default errorHandler;