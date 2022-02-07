import * as loadingConstants from './loadingConstants';

const initialState = {
  loading: false,
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case loadingConstants.SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case loadingConstants.HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
