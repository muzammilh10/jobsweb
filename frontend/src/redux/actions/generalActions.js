import { LOAD_USER } from "../constants/generalConstants";

export const loadJobAction = () => async (dispatch) => {
  dispatch({ type: LOAD_USER, payload: Math.random().toString() });
};
