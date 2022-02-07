import * as loginConstants from './loginConstants';
import { URL } from '../../constants/constant';
import apiRequest from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showLoading, hideLoading } from '../loading/loadingActions';
import qs from 'qs';

const dev_user = [
  "wsh_karthiga"
]

export const getUserData = (onSuccess = () => { }, onError = () => { }) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getUserByUserName,
    });

    if (!response?.data?.error) {
      response.data.data.loggedAt = Date.now();
      dispatch({
        type: loginConstants.UPDATE_USER_DATA,
        payload: response.data.data,
      });
      onSuccess(response.data.data);
    } else {
      onError();
    }
  };
};

// export const getStatusOfEmployee = () => {
//   return async (dispatch) => {
//     const response = await apiRequest({
//       method: 'GET',
//       url: URL.getStatusOfEmployee,
//     });

//     if (!response?.data?.error) {
//       dispatch({
//         type: loginConstants.UPDATE_STATUS_OF_EMPLOYEE,
//         payload: response.data.data,
//       });
//     } else {
//     }
//   };
// };

export const LoginAction = (
  {
    userName,
    password,
    userBased,
    mobileToken,
  },
  onSuccess = () => { },
  onError = () => { },
) => {
  const device = 1;
  // console.log('s-s-s>>>>>>>>>>>>>>Responseeeee', value);
  console.log({
    userName,
    password,
    userBased,
    mobileToken,
  })
  return async (dispatch) => {
    let BASELINKURL = URL.BASE_URL;
    let isNewApi = false;

    userName = userName.includes("wsh_") ? userName : `wsh_${userName}`

    switch (userBased) {
      case "Link1":
        BASELINKURL = URL.BASE_URL;
        break;
      case "Link2":
        BASELINKURL = URL.BASE_URL_SBS;
        break;
      case "Link3":
        BASELINKURL = URL.BASE_URL_Link3;
        break;
      case "Link4":
        BASELINKURL = URL.BASE_URL_Link4;
        break;
      case "Link5":
        BASELINKURL = URL.BASE_URL_Link5;
        break;
      case "Link6":
        BASELINKURL = URL.BASE_URL_Link6;
        break;
      case "Link7":
        BASELINKURL = URL.BASE_URL_Link7;
        break;
      case "Link8":
        if (dev_user.includes(`${userName}`)) {
          BASELINKURL = URL.BASE_URL_Link8_DEV;
          await AsyncStorage.setItem('runtimeEnv', "DEV");
        } else {
          BASELINKURL = URL.BASE_URL_Link8;
          await AsyncStorage.setItem('runtimeEnv', "PROD");
        }
        isNewApi = true;
        break;
    }

    // Link1-7 are old api.
    const response = !isNewApi ? await apiRequest({
      method: 'POST',
      url: BASELINKURL + URL.login,
      data: {
        userName,
        password,
        mobileToken,
        device
      },
    }) : await apiRequest({
      method: 'POST',
      url: BASELINKURL + URL.loginV2,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
        grant_type: 'password',
        UserName: userName,
        Password: password,
        'content-type': 'application/x-www-form-urlencoded'
      }),
    });

    if (!response?.data?.error) {

      // console.log(response.data);
      // console.log('s-s-s>>>>>>>>>>>>>>Responseeeee', response.data);
      if (!isNewApi) {
        await AsyncStorage.setItem('userToken', response.data.data.token);
      } else {
        await AsyncStorage.setItem('userToken', response.data.access_token);
        await AsyncStorage.setItem('userEmployeeId', response.data.employeeLoginId)
        await AsyncStorage.setItem('userBussinessUnitId', response.data.businessUnitId)
      }
      await AsyncStorage.setItem('userBased', userBased);
      await AsyncStorage.setItem('apiVersion', isNewApi ? "v2" : "v1");


      if (!isNewApi) {
        dispatch(getUserData());
        onSuccess(response.data.data.role);
      } else {
        // dispatch(getUserData()); // TODO
        onSuccess('3'); // Expects a ROLE but doesnt use role on login screen onSuccessLogin callback. 
      }

      // dispatch({
      //   type: loginConstants.UPDATE_ROLE,
      //   payload: response.data.data.role,
      // });

    } else {
      onError(response?.data?.message || 'Something went wrong');
    }
    // await AsyncStorage.setItem('userRole', response.data.data.role);
    // await AsyncStorage.setItem('userInfo', JSON.stringify(json));
  };
};

export const resetUser = () => ({
  type: loginConstants.RESET,
});

export const changePassword = (
  { newPassword },
  onSuccess = () => { },
  onError = () => { },
) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.changePassword,
      data: { password: newPassword },
    });
    if (!response?.data?.error) {
      onSuccess();
    } else {
      onError();
    }
  };
};

export const getReportUrl = (onSuccess = () => { }, onError = () => { }) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getReportUrl,
    });
    if (!response?.data?.error) {
      onSuccess(response.data);
    } else {
      onError();
    }
  };
};

export const getReportUrlV2 = (projectId, onSuccess = () => { }, onError = () => { }) => {
  return async (dispatch) => {
    const response = await apiRequest({
      method: 'GET',
      url: URL.getMobileReportUrl,
      params: {
        projectId
      }
    });
    if (!response?.data?.error) {
      onSuccess(response.data);
    } else {
      onError();
    }
  };
};


export const auditsBysupervisorForClients = (
  data,
  onSuccess = () => { },
  onError = () => { },
) => {
  return async (dispatch) => {
    // console.log('s-s-s>>>>>>>>>>>>>>>>.heeheheheheheheh', data);
    const response = await apiRequest({
      method: 'POST',
      url: URL.auditsBysupervisorForClients,
      data,
    });
    // console.log('s-s-s>>>>>>>>>>>>>>>>.audititit', response);
    if (!response?.data?.error && response.data) {
      onSuccess(response.data.data);
    } else {
      onError();
    }
  };
};

export const scheduleForClients = (
  data,
  onSuccess = () => { },
  onError = () => { },
) => {
  // console.log('s-s-s>>>>>>>>>>>>>>>.daaatatat', data);

  return async (dispatch) => {
    const response = await apiRequest({
      method: 'POST',
      url: URL.scheduleForClients,
      data,
    });
    if (!response?.data?.error && response.data) {
      onSuccess(response.data.data);
    } else {
      onError();
    }
  };
};
