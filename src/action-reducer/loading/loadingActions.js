import * as loadingConstants from './loadingConstants';

export const showLoading = () => {
  return async (dispatch) => {
    dispatch({type: loadingConstants.SHOW_LOADING});
  };
};

export const hideLoading = () => {
  return async (dispatch) => {
    dispatch({type: loadingConstants.HIDE_LOADING});
  };
};
