import {
  ADMIN_JOB_TYPE_LOAD_FAIL,
  ADMIN_JOB_TYPE_LOAD_REQUEST,
  ADMIN_JOB_TYPE_LOAD_RESET,
  ADMIN_JOB_TYPE_LOAD_SUCCESS,
  CREATE_JOB_TYPE_FAIL,
  CREATE_JOB_TYPE_REQUEST,
  CREATE_JOB_TYPE_RESET,
  CREATE_JOB_TYPE_SUCCESS,
  DELETE_JOB_TYPE_FAIL,
  DELETE_JOB_TYPE_REQUEST,
  DELETE_JOB_TYPE_RESET,
  DELETE_JOB_TYPE_SUCCESS,
  EDIT_JOBTYPE_FAIL,
  EDIT_JOBTYPE_REQUEST,
  EDIT_JOBTYPE_RESET,
  EDIT_JOBTYPE_SUCCESS,
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_RESET,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobTypeConstant";

// load job type reducer
export const loadJobTypeReducer = (state = { jobType: [] }, action) => {
  switch (action.type) {
    case JOB_TYPE_LOAD_REQUEST:
      return { loading: true };
    case JOB_TYPE_LOAD_SUCCESS:
      return {
        loading: false,
        jobType: action.payload.jobT,
      };
    case JOB_TYPE_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case JOB_TYPE_LOAD_RESET:
      return {};
    default:
      return state;
  }
};
export const AdminLoadJobTypeReducer = (state = { jobType: [] }, action) => {
  switch (action.type) {
    case ADMIN_JOB_TYPE_LOAD_REQUEST:
      return { loading: true };
    case ADMIN_JOB_TYPE_LOAD_SUCCESS:
      return {
        loading: false,
        jobType: action.payload,
      };
    case ADMIN_JOB_TYPE_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_JOB_TYPE_LOAD_RESET:
      return {};
    default:
      return state;
  }
};
// create job type reducer
export const createJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_JOB_TYPE_REQUEST:
      return { loading: true };
    case CREATE_JOB_TYPE_SUCCESS:
      return {
        loading: false,
        jobType: action.payload,
      };
    case CREATE_JOB_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_JOB_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

// create job type reducer
export const deleteJobTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_JOB_TYPE_REQUEST:
      return { loading: true };
    case DELETE_JOB_TYPE_SUCCESS:
      return {
        loading: false,
        jobType: action.payload,
      };
    case DELETE_JOB_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_JOB_TYPE_RESET:
      return {};
    default:
      return state;
  }
};
export const editJobTypeReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case EDIT_JOBTYPE_REQUEST:
      return { loading: true };
    case EDIT_JOBTYPE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        jobs: action.payload,
      };
    case EDIT_JOBTYPE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_JOBTYPE_RESET:
      return {};
    default:
      return state;
  }
};
