import axios from "axios";
import { JwtService } from "../services/jwt-service";

axios.interceptors.request.use(function (config) {
  if(!!JwtService.get()) {
    config.headers = {
      ...config.headers,
      authorization: JwtService.get()
    }
  }
  
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});