import {URL} from '../../constants/constant';
import apiRequest from '../../services';
import * as dashboardAttendanceConstants from './daConstants';

export const getDashboardAttendanceDetails = (
  data,
  onSuccess = () => {},
  onError = () => {},
) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: `${URL.getDashboardAttendance}`,
      data: data,
    });
    if (!response?.data?.error) {
      dispatch({
        type: dashboardAttendanceConstants.GET_DASHBOARD_ATTENDANCE,
        payload: response.data.data,
      });
      onSuccess();
    } else {
      alert('Something went wrong');
      onError();
    }
  };
};
