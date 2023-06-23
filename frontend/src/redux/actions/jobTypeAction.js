import axios from "axios";
import { toast } from "react-toastify";
import {
  ADMIN_JOB_TYPE_LOAD_FAIL,
  ADMIN_JOB_TYPE_LOAD_REQUEST,
  ADMIN_JOB_TYPE_LOAD_SUCCESS,
  CREATE_JOB_TYPE_FAIL,
  CREATE_JOB_TYPE_REQUEST,
  CREATE_JOB_TYPE_SUCCESS,
  DELETE_JOB_TYPE_FAIL,
  DELETE_JOB_TYPE_REQUEST,
  DELETE_JOB_TYPE_SUCCESS,
  EDIT_JOBTYPE_FAIL,
  EDIT_JOBTYPE_REQUEST,
  EDIT_JOBTYPE_SUCCESS,
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobTypeConstant";

// load jobs type
export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST });
  try {
    const { data } = await axios.get("/api/type/jobs");
    dispatch({
      type: JOB_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_TYPE_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};
export const adminJobTypeLoadAction = (type_id) => async (dispatch) => {
  dispatch({ type: ADMIN_JOB_TYPE_LOAD_REQUEST });
  try {
    const { data } = await axios.get(`/api/type/showcategory/${type_id}`);
    console.log(data);
    dispatch({
      type: ADMIN_JOB_TYPE_LOAD_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ADMIN_JOB_TYPE_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};
// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
  dispatch({ type: CREATE_JOB_TYPE_REQUEST });

  try {
    const { data } = await axios.post("/api/type/create", jobtype);
    dispatch({
      type: CREATE_JOB_TYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job type created successfully");
  } catch (error) {
    dispatch({
      type: CREATE_JOB_TYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

// delete jobs category
export const deleteJobTypeAction = (type_id) => async (dispatch) => {
  dispatch({ type: DELETE_JOB_TYPE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/type/delete/${type_id}`);

    dispatch({
      type: DELETE_JOB_TYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job type delete successfully");
  } catch (error) {
    dispatch({
      type: DELETE_JOB_TYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};
//edit jobtype
export const editJobTypeAction = (type_id, formdata) => async (dispatch) => {
  dispatch({ type: EDIT_JOBTYPE_REQUEST });
  try {
    console.log(formdata);
    const { data } = await axios.patch(`/api/type/update/${type_id}`, formdata);
    console.log(data);
    dispatch({
      type: EDIT_JOBTYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_JOBTYPE_FAIL,
      payload: error.response.data.error,
    });
  }
};
