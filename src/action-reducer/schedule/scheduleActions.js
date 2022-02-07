import * as scheduleConstants from './scheduleConstants';
import {URL} from '../../constants/constant';
import apiRequest from '../../services';
import {hideLoading, showLoading} from '../loading/loadingActions';

export const getUpcomingSchedule = (onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const response = await apiRequest({
      method: 'GET',
      url: URL.getUpcomingSchedule,
    });

    if (!response?.data?.error) {
      dispatch({
        type: scheduleConstants.UPCOMING_SCHEDULES,
        payload: response.data.data,
      });
    } else {
    }
    onSuccess();
    // dispatch(hideLoading());
  };
};

export const applyLeave = (data) => {
  return async (dispatch, getState) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.applyLeave,
      data,
    });

    if (!response?.data?.error) {
      var state = getState();
      var schedules = [...state.schedule.upcomingSchedules];
      dispatch({
        type: scheduleConstants.UPCOMING_SCHEDULES,
        payload: schedules.reduce((acc, cv) => {
          if (cv._id === data.scheduleId) {
            cv.isLeaveReq = true;
          }
          acc.push(cv);
          return acc;
        }, []),
      });
    } else {
    }
  };
};

export const applyLeaveV2 = ({
  scheduleId, Reason, LeaveTypeId
}) => {
  return async (dispatch, getState) => {
    console.log(scheduleId + '--' + LeaveTypeId);
    const response = await apiRequest({
      method: 'POST',
      url: URL.applyLeave,
      params: {
        scheduleId,
        LeaveTypeId,
        Reason
      },
    });
    console.log(response);
    if (!response?.data?.error) {
      var state = getState();
      var schedules = [...state.schedule.upcomingSchedules];
      dispatch({
        type: scheduleConstants.UPCOMING_SCHEDULES,
        payload: schedules.reduce((acc, cv) => {
          if (cv._id === scheduleId) {
            cv.isLeaveReq = true;
          }
          acc.push(cv);
          return acc;
        }, []),
      });
    } else {
    }
  };
};

export const getUpcomingScheduleV2 = (onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const response = await apiRequest({
      method: 'GET',
      url: URL.getUpcomingSchedule,
    });

    if (!response?.data?.error) {
      dispatch({
        type: scheduleConstants.UPCOMING_SCHEDULES,
        payload: response.data,
      });
    } else {
    }
    onSuccess();
    // dispatch(hideLoading());
  };
};