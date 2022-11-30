import { SETSENDER } from "./action";

let initialState = {
  receiver: "errrr",
};

function userReducer(state = initialState, action) {
  if (action.type === SETSENDER) {
    return { ...state, receiver: action.payload };
  } else {
    return state;
  }
}

export default userReducer;
