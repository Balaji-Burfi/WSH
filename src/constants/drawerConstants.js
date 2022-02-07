import {Icons, ScreenName} from './constant';
export const drawerConstants = [
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'home',
    },
    label: 'Dashboard',
    pathName: ScreenName.Dashboard,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'user'
    },
    label: 'Attendance Dashboard',
    pathName: ScreenName.AttendanceDashboard
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'clock',
    },
    label: 'Clock In & Clock Out',
    pathName: ScreenName.clock,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'calendar',
    },
    label: 'Upcoming Schedules',
    pathName: ScreenName.schedule,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'note',
    },
    label: 'Task',
    pathName: ScreenName.task,
  },
  {
    icon: {
      type: Icons.MaterialIcons,
      name: 'people',
    },
    label: 'Employees',
    pathName: ScreenName.Employees,
  },
  {
    icon: {
      type: Icons.MaterialIcons,
      name: 'search',
    },
    label: 'Audit',
    pathName: ScreenName.Audit,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'calendar',
    },
    label: 'Reassign',
    pathName: ScreenName.Reassign,
  },

  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'link',
    },
    label: 'Link',
    pathName: ScreenName.Link,
  },
  {
    icon: {
      type: Icons.FontAwesome,
      name: 'calendar-o',
    },
    label: 'Audit View',
    pathName: ScreenName.AuditView,
  },
  {
    icon: {
      type: Icons.FontAwesome,
      name: 'calendar-o',
    },
    label: 'Schedule View',
    pathName: ScreenName.ScheduleView,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'note',
    },
    label: 'Reports',
    pathName: ScreenName.Reports,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'eye',
    },
    label: 'View Reports',
    pathName: ScreenName.ReportsView,
  },
  {
    icon: {
      type: Icons.FontAwesome,
      name: 'calendar-o',
    },
    label: 'Spring Cleaning',
    pathName: ScreenName.SpringCleaning,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'key',
    },
    label: 'Change Password',
    pathName: ScreenName.changePassword,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'key',
    },
    label: 'Attendance View',
    pathName: ScreenName.AttendanceDetail,
  },
  {
    icon: {
      type: Icons.SimpleLineIcons,
      name: 'logout',
    },
    label: 'Logout',
    pathName: ScreenName.login,
  }
];
