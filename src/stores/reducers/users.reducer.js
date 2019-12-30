import { userConstants } from "stores/constants";

export function users(
  state = {
    loading: false,
    error: null,
    users: null,
    user: null,
    success: false
  },
  action
) {
  switch (action.type) {
    case userConstants.GET_BY_ID_REQUEST:
    case userConstants.GETALL_REQUEST:
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: action.users
      };
    case userConstants.GET_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.user
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.user
      };
    case userConstants.UPDATE_FAILURE:
    case userConstants.GET_BY_ID_FAILURE:
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        success: false,
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, deleting: true } : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        users: state.users.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state;
  }
}
