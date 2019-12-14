import { eventConstants } from "stores/constants";

export function events(
  state = {
    loading: false,
    error: null,
    events: null,
    searchedEvents: null,
    event: null,
    attend: false
  },
  action
) {
  switch (action.type) {
    case eventConstants.EVENT_SEARCH_REQUEST:
    case eventConstants.EVENT_ATTEND_REQUEST:
    case eventConstants.EVENT_UPDATE_REQUEST:
    case eventConstants.EVENT_GET_REQUEST:
    case eventConstants.EVENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.EVENT_ATTEND_SUCCESS:
      return {
        ...state,
        loading: false,
        attend: true
      };
    case eventConstants.EVENT_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedEvents: action.events
      };
    case eventConstants.EVENT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.events
      };
    case eventConstants.EVENT_CREATE_SUCCESS:
      return {
        ...state,
        event: action.events
      };
    case eventConstants.EVENT_UPDATE_SUCCESS:
      return {
        ...state,
        event: action.event
      };
    case eventConstants.EVENT_SEARCH_FAILURE:
    case eventConstants.EVENT_ATTEND_FAILURE:
    case eventConstants.EVENT_UPDATE_FAILURE:
    case eventConstants.EVENT_CREATE_FAILURE:
    case eventConstants.EVENT_GET_FAILURE:
      return {
        error: action.error
      };

    case eventConstants.EVENT_DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.id ? { ...event, deleting: true } : event
        )
      };
    case eventConstants.EVENT_DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.id)
      };
    case eventConstants.EVENT_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...eventCopy } = event;
            // return copy of user with 'deleteError:[error]' property
            return { ...eventCopy, deleteError: action.error };
          }

          return event;
        })
      };
    default:
      return state;
  }
}
