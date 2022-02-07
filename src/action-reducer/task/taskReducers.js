import * as taskConstants from './taskConstants';

const initialState = {
  tasks: [],
  taskTypes:[]
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case taskConstants.UPDATE_TASK_TYPES: {
      return {
        ...state,
        taskTypes: action.payload,
      };
    }
    case taskConstants.ADD_TASKS: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case taskConstants.ADD_NEW_TASKS_BY_EMPLOYEES:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case taskConstants.GET_TASK_BY_EMPLOYEES: {
      return {
        ...state,
        // tasks: [action.payload, ...state.tasks],
      };
    }
    default:
      return state;
  }
}
