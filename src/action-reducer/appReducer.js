import {combineReducers} from 'redux';
import loginReducers from './login/loginReducers';
import clockReducers from './clock/clockReducers';
import scheduleReducers from './schedule/scheduleReducers';
import taskReducers from './task/taskReducers';
import employeeReducers from './employee/employeeReducers';
import loadingReducer from './loading/loadingReducers';
import reportReducer from './report/reportReducers';
import attendanceReducer from './attendance/attendanceReducer';
import springcleaningReducer from "./springcleaning/scReducers";
import dashboardattendanceReducer from "./dashboardattendance/daReducer";
const rootReducer = combineReducers({
  login: loginReducers,
  clock: clockReducers,
  schedule: scheduleReducers,
  task: taskReducers,
  employee: employeeReducers,
  loading: loadingReducer,
  report: reportReducer,
  attendance: attendanceReducer,
  springcleaning: springcleaningReducer,
  dashattendance: dashboardattendanceReducer
});

export default rootReducer;
