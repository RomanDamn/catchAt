import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../reducers/tokenSlice';


export const axiosResponse = (token) => {
  axios.interceptors.response.use((response) => {
    response.headers.Authorization = `Bearer ${response.data.token}`
    console.log(response, "=response")
    return response;
  });
}

export const axiosRequest = (token) => {
  axios.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${token}`
    console.log(request, "=request")
    return request;
  });
}


