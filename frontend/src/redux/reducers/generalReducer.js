import { LOAD_USER } from "../constants/generalConstants";

export const initialState = {
  loadJobs: "",
};
export const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loadJobs: action.payload,
      };
    default:
      return state;
  }
};
