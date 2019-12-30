import { userConstants } from "stores/constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { loggedIn: true, user, userEvents: user.events, error: null }
  : { error: null, userEvents: [] };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case userConstants.UPDATE_SUCCESS:
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        userEvents: action.user && action.user.events && action.user.events
      };
    case userConstants.UPDATE_FAILURE:
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
