import * as scheduleConstants from './scheduleConstants';

const initialState = {
  upcomingSchedules: [],
};

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case scheduleConstants.UPCOMING_SCHEDULES:
      return {
        ...state,
        upcomingSchedules: action.payload,
      };
    case scheduleConstants.UPDATE_UPCOMING_SCHEDULES:
      return {
        ...state,
        upcomingSchedules: action.payload,
      };
    default:
      return state;
  }
}
