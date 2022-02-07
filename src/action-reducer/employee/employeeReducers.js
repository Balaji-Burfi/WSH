import * as employeeConstants from './employeeConstants';

const initialState = {
  locations: [],
  shifts: [],
  employees: [],
  employeeLeaves: [],
  unAssignedEmployees: [],
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    // case loginConstants.LOGIN: {
    //   return {
    //     ...state,
    //     loginSuccess: action.payload,
    //   };
    // }
    // case loginConstants.UPDATE_ROLE: {
    //   return {
    //     ...state,
    //     loginError: action.payload,
    //   };
    // }
    case employeeConstants.LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case employeeConstants.SHIFTS:
      return {
        ...state,
        shifts: action.payload,
      };
    case employeeConstants.EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case employeeConstants.EMPLOYEE_LEAVES:
      return {
        ...state,
        employeeLeaves: action.payload,
      };
    case employeeConstants.UNASSIGNED_EMPLOYEES:
      return {
        ...state,
        unAssignedEmployees: action.payload,
      };
    default:
      return state;
  }
}
