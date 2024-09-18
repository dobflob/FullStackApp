/**
 * apiHelper is a reusable function that appends the provided path to the root url for all http requests
 * If a body is provided, it's formatted as json and saved to options.body
 * If credentials are provided, they are encoded and options.headers.Authorization is set to the encoded credentials
 * @param {*} path the path parameter given to the api function or the default /courses path
 * @param {*} method the method given to the api function or the default GET method
 * @param {*} body the body provided to the api function or defaults to null
 * @param {*} credentials the credentials provided to the api function or defaults to null
 * @returns the response to the fetch request sent to the url with the provided options
 */
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
  }

  if(credentials) {
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    options.headers.Authorization = `Basic ${encodedCredentials}`;
  }

  return fetch(url, options);
};