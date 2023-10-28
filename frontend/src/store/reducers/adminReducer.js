import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoading = false;
            state.genders = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoading = false;
            state.genders = [];
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.isLoading = false;
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoading = false;
            state.positions = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isLoading = false;
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoading = false;
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }


        // case actionTypes.DELETE_USER_SUCCESS:
        //     state.users = action.userId;
        //     return {
        //         ...state
        //     }
        // case actionTypes.DELETE_USER_FAILED:
        //     state.users = [];
        //     return {
        //         ...state
        //     }
        default:
            return state;
    }
}

export default adminReducer;