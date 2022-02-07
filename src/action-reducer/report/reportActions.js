import * as reportConstants from './reportConstants';
import {URL} from '../../constants/constant';
import apiRequest from '../../services';

export const getReportLocations = (onSuccess) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getLocationsForEmp,
    });
    if (!response?.data?.error) {
      onSuccess(response.data.data);
    } else {
      onSuccess(false);
    }
  };
};

export const getReport = (data, onSuccess) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      data: data,
      url: URL.getMobileReport,
    });
    if (!response?.data?.error) {
      onSuccess(response.data.data);
      dispatch({
        type: reportConstants.GET_REPORT,
        payload: response.data.data,
      });
    } else {
    }
  };
};

export const saveReport = (formData, onSuccess, onError) => {
  return async (dispatch) => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: URL.postMobileReport,
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      if (!response?.data?.error) {
        console.log('response:', response);
        onSuccess(response.data.data);
        dispatch({
          type: reportConstants.SAVE_REPORT,
          payload: response.data.data,
        });
      }
    } catch (error) {
      onError();
      console.log('error===>', error);
    }
  };
};
