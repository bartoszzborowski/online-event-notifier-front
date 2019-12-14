import { uiConstants } from "stores/constants";

export function ui(
  state = { loading: false, error: null, locations: null, eventTypes: null },
  action
) {
  switch (action.type) {
    case uiConstants.UI_GET_LOCATIONS_REQUEST:
    case uiConstants.UI_GET_TYPES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case uiConstants.UI_GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.items
      };
    case uiConstants.UI_GET_TYPES_SUCCESS:
      return {
        ...state,
        eventTypes: action.items
      };
    case uiConstants.UI_GET_LOCATIONS_FAILURE:
    case uiConstants.UI_GET_TYPES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
