import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  adminJobReducer,
  deleteAjobReducer,
  editJobReducer,
  loadJobReducer,
  loadJobSingleReducer,
  registerAjobReducer,
  showAllJobsCreatedByCompanyReducer,
  updateJobStatusReducer,
  useApplyLoadJobReducer,
} from "./reducers/jobReducer";
import {
  AdminLoadJobTypeReducer,
  createJobTypeReducer,
  editJobTypeReducer,
  loadJobTypeReducer,
} from "./reducers/jobTypeReducer";
import {
  allUserReducer,
  editUserReducer,
  resetPasswordReducer,
  userApplyJobReducer,
  userReducerLogout,
  userReducerProfile,
  userReducerSignIn,
  userReducerSignUp,
} from "./reducers/userReducer";
import { modeReducer } from "./reducers/themeModeReducer";
import { deleteJobTypeReducer } from "./reducers/jobTypeReducer";
import { generalReducer } from "./reducers/generalReducer";

//combine reducers
const reducer = combineReducers({
  loadJobs: loadJobReducer,
  jobTypeAll: loadJobTypeReducer,
  signIn: userReducerSignIn,
  logOut: userReducerLogout,
  userprofile: userReducerProfile,
  singleJob: loadJobSingleReducer,
  userJobApplication: userApplyJobReducer,
  allUsers: allUserReducer,
  signUp: userReducerSignUp,
  mode: modeReducer,
  registerJob: registerAjobReducer,
  createJobType: createJobTypeReducer,
  deleteJobType: deleteJobTypeReducer,
  deleteJob: deleteAjobReducer,
  adminCreateJob: adminJobReducer,
  editJob: editJobReducer,
  general: generalReducer,
  jobType: AdminLoadJobTypeReducer,
  editJobType: editJobTypeReducer,
  resetPassword: resetPasswordReducer,
  editUser: editUserReducer,
  applyByUser: useApplyLoadJobReducer,
  updateStatus: updateJobStatusReducer,
  companyJobCreated: showAllJobsCreatedByCompanyReducer,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  mode: {
    mode: "light",
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
