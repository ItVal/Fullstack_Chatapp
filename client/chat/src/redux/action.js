export const SETSENDER = "SETSENDER";

export const setSender = (sender) => (dispatch) => {
  dispatch({
    type: SETSENDER,
    payload: sender,
  });
};
