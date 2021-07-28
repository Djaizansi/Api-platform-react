import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '10m', target: 400 }, // stay at 400 for ~4 hours (pour des raisons pratiques, cette partie durera 10 minutes)
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function () {
  http.batch([
    ['GET', `${API_BASE_URL}/articles/8001/`],
    ['GET', `${API_BASE_URL}/articles/8002/`],
    ['GET', `${API_BASE_URL}/articles/8003/`],
    ['GET', `${API_BASE_URL}/articles/8004/`],
  ]);

  sleep(1);
}
