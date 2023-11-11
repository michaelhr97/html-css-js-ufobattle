async function registerUser(credentials) {
  const URL = 'http://wd.etsisi.upm.es:10000/users';

  let myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  let urlencoded = new URLSearchParams();
  urlencoded.append('username', credentials.username);
  urlencoded.append('email', credentials.email);
  urlencoded.append('password', credentials.password);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch(URL, requestOptions);
  return response.text();
}

export default registerUser;
