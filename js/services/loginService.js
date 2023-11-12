async function loginUser(credentials) {
  const username = credentials.username;
  const password = credentials.password;

  const URL = `http://wd.etsisi.upm.es:10000/users/login?username=${username}&password=${password}`;

  let myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const response = await fetch(URL, requestOptions);
  return response.text();
}

export default loginUser;
