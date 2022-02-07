import * as employeeConstants from './employeeConstants';
import {URL} from '../../constants/constant';
import apiRequest from '../../services';

export const getLocationsForSupervisorCurrent = (onSuccess = () => {}) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.locationsForSupervisorCurrent,
    });

    if (!response?.data?.error) {
      console.log("s-s-s>>>>>>>>>>>>>>>>>>>Rrspnsnenedatata",response)
      dispatch({
        type: employeeConstants.LOCATIONS,
        payload: response.data.data,
      });
    } else {
    }
    onSuccess();
  };
};

export const getShiftsForSupervisorCurrent = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.shiftsForSupervisorCurrent,
      data,
    });

    if (!response?.data?.error) {
      dispatch({
        type: employeeConstants.SHIFTS,
        payload: response.data.data,
      });
    } else {
    }
    onSuccess();
  };
};

export const getEmployeesForshiftAndLocations = (
  data,
  onSuccess = () => {},
) => {

  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.getEmployeesForshiftAndLocations,
      data,
    });
    if (!response?.data?.error) {
      dispatch({
        type: employeeConstants.EMPLOYEES,
        payload: response.data.data,
      });
    } else {
    }
    onSuccess();
  };
};

export const auditBySupervisor = (data, onSuccess = () => {}) => {

  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.auditBySupervisor,
      data,
    });

    if (!response?.data?.error) {
      onSuccess();
    } else {
      onSuccess();
      alert('Failed to submit');
    }
  };
};

export const getEmployeesLeaveForSupervisor = (onSuccess = () => {}) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getEmployeesLeaveForSupervisor,
    });
    if (!response?.data?.error) {
      dispatch({
        type: employeeConstants.EMPLOYEE_LEAVES,
        payload: response.data.data,
      });
    } else {
    }
    onSuccess();
  };
};

export const assignSupervisorItself = (data) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.assignSupervisorItself,
      data,
    });
    if (!response?.data?.error) {
      alert('Assigned successfully');
      dispatch(getEmployeesLeaveForSupervisor());
    } else {
      alert('Failed to assign');
    }
  };
};

export const getUnassignedEmployeeByScheduleId = (data) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.getUnassignedEmployeeByScheduleId,
      data,
    });
    if (!response?.data?.error) {
      dispatch({
        type: employeeConstants.UNASSIGNED_EMPLOYEES,
        payload: response.data.data,
      });
    } else {
    }
  };
};

export const assignBySupervisor = (data) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.assignBySupervisor,
      data,
    });
    if (!response?.data?.error) {
      alert('Assigned successfully');
      dispatch(getEmployeesLeaveForSupervisor());
    } else {
      alert('Failed to assign');
    }
  };
};

export const getAuditsSupervisor = (onSuccess = () => {}) => {

  return async (dispatch) => {
    const response = await apiRequest({
      method: 'get',
      url: URL.getAuditsSupervisor,
    });
    if (!response?.data?.error) {
      onSuccess(response.data.data);
    } else {
      alert('Failed to get');
    }
  };
};
