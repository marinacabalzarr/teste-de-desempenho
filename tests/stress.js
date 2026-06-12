import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
  ],
};

export default function () {
  const response = http.post(
    'http://localhost:3000/checkout/crypto',
    JSON.stringify({})
  );

  check(response, {
    'status 201': (r) => r.status === 201,
  });
}