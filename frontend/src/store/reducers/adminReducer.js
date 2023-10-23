import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire gender start', action);
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            let stateArr = ['genders', 'positions', 'roles'];
            for (const key in stateArr) {
                if (stateArr.hasOwnProperty(key)) {
                    if (action.key === key) {
                        copyState[stateArr[key]] = action.data;
                    }
                }
            }
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire gender failed', action);
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;