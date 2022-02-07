import * as Constant from './reportConstants';

const initialState = {
    getReportLocations: false,
    saveReport: false,
    getReport: false
};

export default function reportReducer(state = initialState, action) {
    switch (action.type) {
        case Constant.SAVE_REPORT:
            return {
                ...state,
                saveReport: action.payload,
            };
        case Constant.GET_REPORT:
            return {
                ...state,
                getReport: action.payload,
            };
        case Constant.GET_REPORT_LOCATIONS:
            return {
                ...state,
                getReportLocations: action.payload,
            };
        default:
            return state;
    }
}
