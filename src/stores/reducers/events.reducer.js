import { eventConstants } from "stores/constants";

export function events(
  state = { loading: false, error: null, events: null, event: null },
  action
) {
  switch (action.type) {
    case eventConstants.EVENT_UPDATE_REQUEST:
    case eventConstants.EVENT_GET_REQUEST:
    case eventConstants.EVENT_CREATE_REQUEST:
      return {
        loading: true
      };
    case eventConstants.EVENT_GET_SUCCESS:
      return {
        events: action.events
      };
    case eventConstants.EVENT_CREATE_SUCCESS:
      return {
        event: action.event
      };
    case eventConstants.EVENT_UPDATE_SUCCESS:
      return {
        event: action.event
      };
    case eventConstants.EVENT_UPDATE_FAILURE:
    case eventConstants.EVENT_CREATE_FAILURE:
    case eventConstants.EVENT_GET_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
