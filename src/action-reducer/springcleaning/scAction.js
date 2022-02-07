import * as scConstants from "./scConstants";
import { URL } from '../../constants/constant';
import apiRequest from '../../services';

export const getSpringCleaningDetails = (
    data,
    onSuccess = () => { },
    onError = () => { },
) => {
    return async (dispatch) => {
        const response = await apiRequest({
            method: 'POST',
            url: URL.getSpringCleaning, // DEMO URL
            data: data,
        });
        if (!response?.data?.error) {
            dispatch({
                type: scConstants.GET_SPRING_CLEANING,
                payload: response.data.data,
            });
            onSuccess();
        } else {
            alert('Something went wrong');
            onError();
        }
    };
};

