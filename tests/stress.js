import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
    const BASE_URL = 'http://127.0.0.1:8000/api'; // make sure this is not production
  
    let responses = http.batch([
      [
        'GET',
        `${BASE_URL}/articles/8001/`,
        null,
        { tags: { name: 'Article' } },
      ],
      [
        'GET',
        `${BASE_URL}/articles/8002/`,
        null,
        { tags: { name: 'Article' } },
      ],
      [
        'GET',
        `${BASE_URL}/articles/8003/`,
        null,
        { tags: { name: 'Article' } },
      ],
      [
        'GET',
        `${BASE_URL}/articles/8004/`,
        null,
        { tags: { name: 'Article' } },
      ],
    ]);
  
    sleep(1);
}  
