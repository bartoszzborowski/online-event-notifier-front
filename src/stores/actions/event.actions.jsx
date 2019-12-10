import { eventConstants } from "stores/constants";
import { eventService } from "services";
import { history } from "../../helpers";

export const eventActions = {
  addEvent,
  getEvents,
  updateEvent,
  deleteEvent
};

function addEvent(event) {
  return dispatch => {
    dispatch(request());
    eventService.create(event).then(
      event => {
        dispatch(success(event));
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: eventConstants.EVENT_CREATE_REQUEST };
  }
  function success(event) {
    return { type: eventConstants.EVENT_CREATE_SUCCESS, event };
  }
  function failure(error) {
    return { type: eventConstants.EVENT_CREATE_FAILURE, error };
  }
}

function updateEvent(event) {
  return dispatch => {
    dispatch(request(event));
    eventService.update(event).then(
      event => {
        dispatch(success(event));
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: eventConstants.EVENT_UPDATE_REQUEST };
  }
  function success(event) {
    return { type: eventConstants.EVENT_UPDATE_SUCCESS, event };
  }
  function failure(error) {
    return { type: eventConstants.EVENT_UPDATE_FAILURE, error };
  }
}

function getEvents() {
  return dispatch => {
    dispatch(request());

    eventService.getByUser().then(
      events => dispatch(success(events)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: eventConstants.EVENT_GET_REQUEST };
  }
  function success(events) {
    return { type: eventConstants.EVENT_GET_SUCCESS, events };
  }
  function failure(error) {
    return { type: eventConstants.EVENT_GET_FAILURE, error };
  }
}

// function getAll() {
//     return dispatch => {
//         dispatch(request());
//
//         userService.getAll()
//             .then(
//                 users => dispatch(success(users.data.users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };
//
//     function request() { return { type: eventConstants.GETALL_REQUEST } }
//     function success(users) { return { type: eventConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: eventConstants.GETALL_FAILURE, error } }
// }
//
// // prefixed function name with underscore because delete is a reserved word in javascript
function deleteEvent(id) {
  return dispatch => {
    dispatch(request(id));

    eventService.delete(id).then(
      event => {
        dispatch(success(id));
        history.push("/listView");
      },
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: eventConstants.EVENT_DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: eventConstants.EVENT_DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: eventConstants.EVENT_DELETE_FAILURE, id, error };
  }
}
