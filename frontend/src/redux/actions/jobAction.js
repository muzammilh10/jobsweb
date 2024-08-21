import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./../../config";
import {
  ADMIN_JOB_LOAD_FAIL,
  ADMIN_JOB_LOAD_REQUEST,
  ADMIN_JOB_LOAD_SUCCESS,
  DELETE_JOB_FAIL,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  EDIT_JOB_FAIL,
  EDIT_JOB_REQUEST,
  EDIT_JOB_SUCCESS,
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_SINGLE_FAIL,
  JOB_LOAD_SINGLE_REQUEST,
  JOB_LOAD_SINGLE_SUCCESS,
  JOB_LOAD_SUCCESS,
  REGISTER_JOB_FAIL,
  REGISTER_JOB_REQUEST,
  REGISTER_JOB_SUCCESS,
  SHOW_COMPANY_JOB_FAIL,
  SHOW_COMPANY_JOB_REQUEST,
  SHOW_COMPANY_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_SUCCESS,
  USER_APPLY_JOB_FAIL,
  USER_APPLY_JOB_REQUEST,
  USER_APPLY_JOB_SUCCESS,
} from "../constants/jobConstant";

export const jobLoadAction =
  (
    pageNumber,
    keyword = "",
    location = "",
    minSalary = 0,
    maxSalary = Number.MAX_SAFE_INTEGER
  ) =>
    async (dispatch) => {
      dispatch({ type: JOB_LOAD_REQUEST });
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&location=${location}&minSalary=${minSalary}&maxSalary=${maxSalary}`
        );
        dispatch({
          type: JOB_LOAD_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: JOB_LOAD_FAIL,
          payload: error.response.data.error,
        });
      }
    };

// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
  dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
  try {

    const { data } = await axios.get(`${BASE_URL}/api/job/${id}`);
    dispatch({
      type: JOB_LOAD_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_LOAD_SINGLE_FAIL,
      payload: error.response.data.error,
    });
  }
};

// register job action
export const registerAjobAction = (job) => async (dispatch) => {
  dispatch({ type: REGISTER_JOB_REQUEST });

  try {
        console.log({process:BASE_URL})

    const { data } = await axios.post(`${BASE_URL}/api/job/create`, job);
    console.log(data);
    dispatch({
      type: REGISTER_JOB_SUCCESS,
      payload: data,
    });
    toast.success("Job created successfully");
  } catch (error) {
    dispatch({
      type: REGISTER_JOB_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

export const allJobLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_LOAD_REQUEST });
  try {
        console.log({process:BASE_URL})

    const { data } = await axios.get(`${BASE_URL}/api/jobs/showalljobs`);
    dispatch({
      type: JOB_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// delete job action
export const deleteAjobAction = (id) => async (dispatch) => {
  console.log(id);
  dispatch({ type: DELETE_JOB_REQUEST });

  try {
    console.log(id);
        console.log({process:BASE_URL})

    const { data } = await axios.delete(`${BASE_URL}/api/jobs/delete/${id}`);
    console.log(data);
    console.log(data);
    dispatch({
      type: DELETE_JOB_SUCCESS,
      payload: data,
    });
    toast.success("Job delete successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_JOB_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

export const adminLoadAction = (id) => async (dispatch) => {
  dispatch({ type: ADMIN_JOB_LOAD_REQUEST });
      console.log({process:BASE_URL})

  try {
    const { data } = await axios.get(`${BASE_URL}/api/jobs/showByUser/${id}`);

    dispatch({
      type: ADMIN_JOB_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_JOB_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const editJobAction = (job_id, formdata, id) => async (dispatch) => {
  dispatch({ type: EDIT_JOB_REQUEST });
  try {
        console.log({process:BASE_URL})

    const { data } = await axios.patch(`${BASE_URL}/api/job/update/${job_id}`, formdata);
    console.log(data);
    dispatch({
      type: EDIT_JOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_JOB_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const userApplyLoadJobAction = (id) => async (dispatch) => {
  dispatch({ type: USER_APPLY_JOB_REQUEST });
  try {
        console.log({process:BASE_URL})

    const { data } = await axios.get(`${BASE_URL}/api/admin/applied-jobs/${id}`);
    dispatch({
      type: USER_APPLY_JOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_APPLY_JOB_FAIL,
      payload: error.response.data.error,
    });
  }
};
export const showAllJobsCreatedByCompanyAction =
  (id, searchQuery) => async (dispatch) => {
    dispatch({ type: SHOW_COMPANY_JOB_REQUEST });
    try {
          console.log({process:BASE_URL})

      const { data } = await axios.get(
        `${BASE_URL}/api/jobs/companyjobshow/${id}?search=${searchQuery}`
      );
      dispatch({
        type: SHOW_COMPANY_JOB_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SHOW_COMPANY_JOB_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const updateJobStatusAction = (updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_JOB_REQUEST });
  try {

        console.log({process:BASE_URL})

    const { data } = await axios.patch(`${BASE_URL}/api/updatestatus`, updatedData);
    dispatch({
      type: UPDATE_JOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: UPDATE_JOB_FAIL,
      payload: error.response.data.error,
    });
  }
};
