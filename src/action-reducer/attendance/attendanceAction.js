import {URL} from '../../constants/constant';
import apiRequest from '../../services';
import * as attendanceConstants from './attendanceConstants';

export const getAttendanceDetails = (
  data,
  onSuccess = () => {},
  onError = () => {},
) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: `${URL.getAttandance}`,
      data: data,
    });
    if (!response?.data?.error) {
      dispatch({
        type: attendanceConstants.GET_EMPLOYEE_LEAVES,
        payload: response.data.data,
      });
      onSuccess();
    } else {
      alert('Something went wrong');
      onError();
    }
  };
};

export const getAttendanceDetailsV2 = (
  {
    startDate,
    endDate
  },
  onSuccess = () => {},
  onError = () => {},
) => {
  return async (dispatch) => {
    console.log({

      startDate, endDate
    })
    const response = await apiRequest({
      method: 'GET',
      url: `${URL.getAttandance}`,
      params: {
        startDate,
        endDate
      },
    });

    console.log(response, 123)
    if (!response?.data?.error) {
      dispatch({
        type: attendanceConstants.GET_EMPLOYEE_LEAVES,
        payload: response.data,
      });
      onSuccess();
    } else {
      alert('Something went wrong');
      onError();
    }
  };
};
