import Login from '../screens/Login/index';
import Clock from '../screens/Clock/index';
import Schedule from '../screens/Schedule';
import Task from '../screens/Task/index';
import AddTask from '../screens/AddTask';
import ChangePassword from '../screens/ChangePassword';
import Landing from '../screens/Landing';
import Employees from '../screens/Employees';
import Audit from '../screens/Audit';
import Reassign from '../screens/Reassign';
import Dashboard from '../screens/Dashboard';
import Link from '../screens/Link';
import AddAudit from '../screens/Audit/AddAudit';
import AuditView from '../screens/AuditView';
import ScheduleView from '../screens/ScheduleView';
import Reports from '../screens/Reports';
import ReportsView from '../screens/ReportsView';
import AttendanceDetail from '../screens/Attendance';
import AttendanceDashboard from '../screens/AttendanceDashboard';
import { ScreenName } from '../constants/constant';
import SpringCleaning from '../screens/SpringCleaning';
import ClockV2 from '../screens/ClockV2';
import AttendanceDetailV2 from '../screens/AttendanceV2';
import ScheduleV2 from '../screens/ScheduleV2';
import LinkV2 from '../screens/LinkV2';
import ReportsV2 from '../screens/ReportsV2';

export default {
  initialRouteName: ScreenName.landing,
  routes: [
    {
      name: ScreenName.landing,
      component: Landing,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.login,
      component: Login,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.Dashboard,
      component: Dashboard,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.AttendanceDashboard,
      component: AttendanceDashboard,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.Link,
      component: Link,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.clock,
      component: Clock,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.changePassword,
      component: ChangePassword,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.schedule,
      component: Schedule,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.addTask,
      component: AddTask,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.task,
      component: Task,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.Reassign,
      component: Reassign,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.Audit,
      component: Audit,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.Employees,
      component: Employees,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.addAudit,
      component: AddAudit,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.AuditView,
      component: AuditView,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.ScheduleView,
      component: ScheduleView,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.Reports,
      component: Reports,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.ReportsView,
      component: ReportsView,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.AttendanceDetail,
      component: AttendanceDetail,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },
    {
      name: ScreenName.SpringCleaning,
      component: SpringCleaning,
      isAuthenticated: false,
      gestureDisabled: true,
      swipeDisabled: true,
    },

    // NEW API SCREEN
    {
      name: ScreenName.ClockV2,
      component: ClockV2,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.AttendanceDetailV2,
      component: AttendanceDetailV2,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.scheduleV2,
      component: ScheduleV2,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.LinkV2,
      component: LinkV2,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
    {
      name: ScreenName.ReportsV2,
      component: ReportsV2,
      isAuthenticated: false,
      gestureDisabled: false,
      swipeDisabled: false,
    },
  ],
};
