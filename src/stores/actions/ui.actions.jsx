import { uiConstants } from "stores/constants";
import { uiService } from "services";

export const uiActions = {
  getLocations,
  getEventTypes
};

function getLocations() {
  return dispatch => {
    dispatch(request());

    uiService.getLocations().then(
      items => dispatch(success(items)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: uiConstants.UI_GET_LOCATIONS_REQUEST };
  }
  function success(items) {
    return { type: uiConstants.UI_GET_LOCATIONS_SUCCESS, items };
  }
  function failure(error) {
    return { type: uiConstants.UI_GET_LOCATIONS_FAILURE, error };
  }
}

function getEventTypes() {
  return dispatch => {
    dispatch(request());

    uiService.getEventTypes().then(
      items => dispatch(success(items)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: uiConstants.UI_GET_TYPES_REQUEST };
  }
  function success(items) {
    return { type: uiConstants.UI_GET_TYPES_SUCCESS, items };
  }
  function failure(error) {
    return { type: uiConstants.UI_GET_TYPES_FAILURE, error };
  }
}
