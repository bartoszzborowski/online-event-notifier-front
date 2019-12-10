import { uiConstants } from "stores/constants";

export function ui(
  state = { loading: false, error: null, locations: null, eventTypes: null },
  action
) {
  switch (action.type) {
    case uiConstants.UI_GET_LOCATIONS_REQUEST:
    case uiConstants.UI_GET_TYPES_REQUEST:
      state.loading = true;
      break;
    case uiConstants.UI_GET_LOCATIONS_SUCCESS:
      state.locations = action.items;
      break;
    case uiConstants.UI_GET_TYPES_SUCCESS:
      state.eventTypes = action.items;
      break;
    case uiConstants.UI_GET_LOCATIONS_FAILURE:
    case uiConstants.UI_GET_TYPES_FAILURE:
      state.error = action.error;
      break;
    default:
      break;
  }

  return state;
}
