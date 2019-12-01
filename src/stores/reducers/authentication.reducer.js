import { userConstants } from 'stores/constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, error: null} : {error: null};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            console.log('action', action);
            return {
                error: action.error
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
