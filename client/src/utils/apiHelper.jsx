export const api = (
  path='/courses',
  method='GET',
  body=null,
  credentials=null
) => {
  const url = `http://localhost:5000/api${path}`;

  const options = {
    method,
    headers: {}
  };

  if(body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json; charset=utf-8';
    console.log('hello from body');
  }

  if(credentials) {
    const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`)
    options.headers.Authorization = `Basic ${encodedCredentials}`;
    console.log('hello from credentials');
  }

  return fetch(url, options);
};