import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { ui } from "./ui.reducer";
import { events } from "./events.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  ui,
  events
});

export default rootReducer;
