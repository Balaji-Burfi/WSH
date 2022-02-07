import * as Constant from './clockConstants';

const initialState = {
  clockInOutStatuses: {
    isCheckIn: false,
    isSchedule: false,
    isShift: false,
  },
};

export default function clockReducer(state = initialState, action) {
  switch (action.type) {
    case Constant.CHECK_IN_OR_OUT:
      return {
        ...state,
      };
    case Constant.CLOCK_IN_OUT_STATUSES:
      return {
        ...state,
        clockInOutStatuses: action.payload,
      };
    default:
      return state;
  }
}
