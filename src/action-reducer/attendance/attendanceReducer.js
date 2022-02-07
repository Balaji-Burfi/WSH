import * as C from "./attendanceConstants"

const initialState = {
  attendanceDetails: [],
};

export default function attendanceReducer(state = initialState, action) {
  switch (action.type) {
    case C.GET_EMPLOYEE_LEAVES:
        return {
          attendanceDetails: action.payload 
        }
    default: 
        return state;
  }
}
