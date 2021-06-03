import axios from 'axios';

export const buildClient = ({ req }) => {
  if (window) {
    // Request on the browser
    return axios.create({
      baseURL: '/'
    });
  } else {
    // Request on the server
    return axios.create({
      baseURL: 'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local',
      headers: req.headers
    });
  }
};
