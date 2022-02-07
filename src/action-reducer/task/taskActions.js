import * as taskConstants from './taskConstants';
import apiRequest from '../../services';
import {URL} from '../../constants/constant';
import Axios from 'axios';

export const getAllTaskTypeMaster = (onSuccess = () => {}) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getAllTaskTypeMaster,
    });

    // console.log('S-s-s>>>>>>>>>>>>>>>', response);
    if (!response?.data?.error) {
      dispatch({
        type: taskConstants.UPDATE_TASK_TYPES,
        payload: response?.data?.data,
      });
    }
    onSuccess();
  };
};

export const GetTasks = (onSuccess = () => {}) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getTaskByEmployee,
    });

    // console.log('S-s-s>>>>>>>>>>>>>respspgettassks>>', response.data.data);
    if (!response?.data?.error) {
      dispatch({
        type: taskConstants.ADD_TASKS,
        payload: response?.data?.data,
      });
    }
    onSuccess();
  };
};

export const AddNewTasks = (data, onSuccess = () => {}, onError = () => {}) => {
  // console.log('S-s-s>>>>>>>>>>>>>>>', data);

  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.taskByEmployees,
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    });
    // console.log('s-s-s>>>>>>>>>>>responseeee>>...', response.response);

    if (!response?.data?.error) {
      // console.log('s-s-s>>>>>>>>>>>responseeee>>...', response.data);
      dispatch(GetTasks());
      onSuccess();
    } else {
      alert('Something went wrong');
      onError();
    }
  };
};

// export const taskByEmployeee = () => {
//   return async (dispatch) => {
//     const response = await apiRequest({
//       method: 'GET',
//       url: URL.taskByEmployees,
//     });

//     console.log('S-s-s>>>>>>>>>>>>>>>', response);

//     if (!response?.data?.error) {
//       dispatch({
//         type: taskConstants.GET_TASK_BY_EMPLOYEES,
//         payload: response?.data?.data,
//       });
//     }
//   };
// };
