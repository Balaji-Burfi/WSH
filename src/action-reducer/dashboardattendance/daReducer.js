import * as C from "./daConstants"
const initialState = {
  dashboardAttendanceDetails: [],
};

export default function daReducer(state = initialState, action) {
  // return {
  //   ...state,
  //   dashboardAttendanceDetails: action.payload,
  // };
  switch (action.type) {
    case C.GET_DASHBOARD_ATTENDANCE:
        return {
          dashboardAttendanceDetails: action.payload 
        }
    default: 
        return state;
  }
}
