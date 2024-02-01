import axios from 'axios';

const fetchAPI = (options = {}) => {
  
    // TODO headers bearer token?
    // defaulting API call
  const defaultConfig = {
    method: 'get',
    timeout: 5000,
    data: {},
    url: '/',
    // headers: {
    //   Authorization: 'Bearer token',
    // },
  };

  const headers = options.token
    ? {
        Authorization: 'Bearer ' + options.token,
      }
    : {};

//   merging default, headers, and custom configuration
  const axiosConfig = {
    ...defaultConfig,
    ...options,
    headers,
  };

  return axios(axiosConfig);
};

export { fetchAPI };