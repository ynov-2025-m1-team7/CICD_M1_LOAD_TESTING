import http from "k6/http";
import { check, sleep } from "k6";

// Test configuration
export const options = {
  thresholds: {
    http_req_duration: ["p(99) < 3000"],
    http_req_failed: ["rate<0.01"],
  },
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 50 },
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  let res = http.get("https://cicdm1.onrender.com/feedbacks");

  // Validate response status and content
  check(res, {
    "status was 200": (r) => r.status === 200,
    "response time < 2000ms": (r) => r.timings.duration < 2000,
  });

  sleep(1);
}

// Stress Test
export function stressTest() {
  let res = http.get("https://cicdm1.onrender.com/feedbacks");
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(0.5);
}

export function spikeTest() {
  let res = http.get("https://cicdm1.onrender.com/feedbacks");
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(0.2);
}

export function soakTest() {
  let res = http.get("https://cicdm1.onrender.com/feedbacks");
  check(res, {
    "status was 200": (r) => r.status === 200,
  });
  sleep(1);
}

import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "summary.json": JSON.stringify(data),
    stdout: textSummary(data, { indent: "  " }),
  };
}