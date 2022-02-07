import * as loginConstants from './loginConstants';

const initialState = {
  userData: null,
  status: null,
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
    case loginConstants.UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case loginConstants.UPDATE_STATUS_OF_EMPLOYEE:
      return {
        ...state,
        status: action.payload,
      };
    case loginConstants.RESET:
      return {
        ...state,
        status: null,
        userData: null,
      };
    default:
      return state;
  }
}
