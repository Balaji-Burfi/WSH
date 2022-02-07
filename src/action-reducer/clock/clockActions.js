import * as clockConstants from './clockConstants';
import { URL } from '../../constants/constant';
import apiRequest from '../../services';

export const GetClockInAndOutStatus = (onSuccess = () => { }) => {
  console.log('s-s-s>>>>>>>>>>>.i am called');

  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getClockInAndOutStatus,
    });
    console.log('s-s-s>>>>>>>>>>>.i am called res', response);

    if (!response?.data?.error) {
      dispatch({
        type: clockConstants.CLOCK_IN_OUT_STATUSES,
        payload: response.data.data,
      });
    } else {
    }
    console.log('s-s-s>>>>>>>>>>>.i am called');
    onSuccess();
  };
};

export const updateCheckInOrOut = (data, isCheckIn = true) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: isCheckIn ? URL.checkIn : URL.checkOut,
      data,
    });

    if (!response?.data?.error) {
      dispatch(GetClockInAndOutStatus());
      // dispatch({
      //   type: clockConstants.CHECK_IN_OR_OUT,
      //   payload: response.data.data,
      // });
    } else {
      // Unhandle error
      console.log("Unhandled Error Stack @ updateCheckInorOut")
    }
  };
};

export const GetClockInAndOutStatusV2 = (onSuccess = () => { }) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getClockInAndOutStatus
    });

    console.log('s-s-s>>>>>>>>>>>.i am called res v2', response);

    if (!response?.data?.error) {
      dispatch({
        type: clockConstants.CLOCK_IN_OUT_STATUSES,
        payload: response.data,
      });
    } else {
      console.log("ERROR")
    }
    console.log('s-s-s>>>>>>>>>>>.i am called');
    onSuccess();
  };
};

export const updateCheckInOrOutV2 = ({ shiftId, checkInLatitude, checkInLongitude }, isCheckIn = true) => {

  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: isCheckIn ? URL.checkIn : URL.checkOut,
      params: {
        shiftId,
        checkInLatitude,
        checkInLongitude
      },
    });

    if (!response?.data?.error) {
      dispatch(GetClockInAndOutStatusV2());
      // dispatch({
      //   type: clockConstants.CHECK_IN_OR_OUT,
      //   payload: response.data.data,
      // });
    } else {
      // Unhandle error

      console.log("Unhandled Error Stack @ updateCheckInorOut")
    }
  };
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const locationTracking = (data) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.locationTracking,
      data,
    });

    if (!response?.data?.error) {
    } else {
    }
  };
};
