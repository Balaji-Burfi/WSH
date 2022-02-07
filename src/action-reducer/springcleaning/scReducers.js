import * as C from "./scConstants";

const initialState = {
    springCleaningDetails: [],
};

export default function scReducers(state = initialState, action) {
    switch (action.type) {
        case C.GET_SPRING_CLEANING:
            return {
                springCleaningDetails: action.payload 
            }
        default: 
            return state;
    }
}
