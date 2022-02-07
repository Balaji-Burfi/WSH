import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/constant';


export default async function apiRequest(apiParams) {
  const token = await AsyncStorage.getItem('userToken');
  const userBase = await AsyncStorage.getItem('userBased');
  const userEnv = await AsyncStorage.getItem('runtimeEnv');


  switch (userBase) {
    case "Link1":
      axios.defaults.baseURL = URL.BASE_URL;
      break;
    case "Link2":
      axios.defaults.baseURL = URL.BASE_URL_SBS;
      break;
    case "Link3":
      axios.defaults.baseURL = URL.BASE_URL_Link3;
      break;
    case "Link4":
      axios.defaults.baseURL = URL.BASE_URL_Link4;
      break;
    case "Link5":
      axios.defaults.baseURL = URL.BASE_URL_Link5;
      break;
    case "Link6":
      axios.defaults.baseURL = URL.BASE_URL_Link6;
      break;
    case "Link7":
      axios.defaults.baseURL = URL.BASE_URL_Link7;
      break;
    case "Link8":
      if (userEnv === "DEV") {
        axios.defaults.baseURL = URL.BASE_URL_Link8_DEV;
      } else {
        axios.defaults.baseURL = URL.BASE_URL_Link8;
      }
      break;
  }

  if (userBase === "Link8") {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    axios.defaults.headers.common['x-access-token'] = token
  }

  try {
    const response = await axios(apiParams);
    return response;
  } catch (exception) {
    return exception;
  }
}
