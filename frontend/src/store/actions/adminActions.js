import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let resArr = ["GENDER", "POSITION", "ROLE"]
            for (const key in resArr) {
                if (resArr.hasOwnProperty(key)) {
                    let res = await getAllCodeService(resArr[key]);
                    if (res && res.errCode === 0) {
                        dispatch(fetchGenderSuccess(res.data, key));
                    } else {
                        dispatch(fetchGenderFailed());
                    }
                }
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e);
        }
    }
}

export const fetchGenderSuccess = (genderData, key) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
    key: key
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
