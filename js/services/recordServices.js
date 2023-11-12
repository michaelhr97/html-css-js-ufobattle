async function getRecords() {
  const URL = 'http://wd.etsisi.upm.es:10000/records';

  let myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const response = await fetch(URL, requestOptions);
  return response.json();
}

export default getRecords;
