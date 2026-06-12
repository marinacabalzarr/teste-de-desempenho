import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const payload = JSON.stringify({
    userId: 1,
    productId: 1,
    quantity: 1,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(
    'http://localhost:3000/checkout/simple',
    payload,
    params
  );

  check(response, {
    'status é 200 ou 201': (r) => r.status === 200 || r.status === 201,
    'tempo menor que 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}