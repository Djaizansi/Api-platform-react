import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://127.0.0.1:8000';
const USERNAME = 'Djaizansi';
const PASSWORD = 'azerty';

export default () => {
  let loginRes = http.post(`${BASE_URL}/api/login/`, {
    username: USERNAME,
    password: PASSWORD,
  });

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('access') !== '',
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('access')}`,
    },
  };
  
  /*

  let myObjects = http.get(`${BASE_URL}/api/login/`, authHeaders).json();
  check(myObjects, { 'retrieved token': (obj) => obj.length > 0 });
  */


  sleep(1);
};
