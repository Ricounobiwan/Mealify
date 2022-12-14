// TODO: Remove useEffect from import
import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_MEAL_BEGIN,
  CREATE_MEAL_SUCCESS,
  CREATE_MEAL_ERROR,
  GET_MEALS_BEGIN,
  GET_MEALS_SUCCESS,
  GET_GLUCOSE_BEGIN,
  GET_GLUCOSE_SUCCESS,
  SET_EDIT_MEAL,
  DELETE_JOB_BEGIN,
  EDIT_MEAL_BEGIN,
  EDIT_MEAL_SUCCESS,
  EDIT_MEAL_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editMealId: "",
  mealTitle: "",
  mealDate: "",
  mealLocation: userLocation || "",
  mealTypeOptions: ["Breakfast", "Lunch", "Dinner", "Snack"],
  mealType: "Snack",
  mealScoreOptions: [
    "stableGlucoseResponse",
    "moderateGlucoseResponse",
    "highGlucoseResponse",
    "noScoreYet",
  ],
  mealScore: "noScoreYet",
  meals: [],
  totalMeals: 0,
  numOfPages: 1,
  page: 1,
  glucose: [],
  totalGlucose: 0,
  numOfPagesGlucose: 1,
  pageGlucose: 1,
  stats: {},
  monthlyMeals: [],
  dailyGlucose: [],
  search: "",
  searchMealScore: "all",
  searchMealType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1/",
  });

  // ==============================================================
  // request axios interceptor
  authFetch.interceptors.request.use(
    (config) => {
      // WRONG SYNTAX - NOT: config.headers.common["Authorization"] = `Bearer ${state.token}`;
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // ==============================================================
  // response axios interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser(); //
        console.log("AUTH ERROR => LOGGING OUT USER");
      }
      return Promise.reject(error);
    }
  );

  // ==============================================================
  // display alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // ==============================================================
  // clear alert
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // ==============================================================
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  // ====================================================================
  // ===== TOGGLE SIDEBAR
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  // ==============================================================
  // ===== REGISTER USER
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);

      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // ====================================================================
  // ===== LOGIN USER
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // ====================================================================
  // ===== LOGOUT USER
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  // ====================================================================
  // ===== UPDATE USER
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      console.log(data);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  // ====================================================================
  // ===== HANDLE CHANGE
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  // ====================================================================
  // ===== CLEAR VALUES
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // ====================================================================
  // ===== CREATE MEAL
  const createMeal = async () => {
    dispatch({ type: CREATE_MEAL_BEGIN });
    try {
      const { mealTitle, mealDate, mealLocation, mealType, mealScore } = state;
      console.log(
        mealTitle,
        mealDate,
        mealLocation,
        mealType,
        mealScore,
        token
      );
      console.log("authFetch");
      await authFetch.post("/meals", {
        mealTitle,
        mealDate,
        mealLocation,
        mealType,
        mealScore,
      });
      dispatch({ type: CREATE_MEAL_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_MEAL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // ====================================================================
  // ===== GET ALL MEALS
  const getMeals = async () => {
    const { page, search, searchMealScore, searchMealType, sort } = state;

    let url = `/meals?page=${page}&mealScore=${searchMealScore}&mealType=${searchMealType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_MEALS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { meals, totalMeals, numOfPages } = data;
      dispatch({
        type: GET_MEALS_SUCCESS,
        payload: {
          meals,
          totalMeals,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser(); // TODO: to comment when developping/debugging
    }
    clearAlert();
  };

  // ====================================================================
  // ===== GET ALL GLUCOSE
  const getGlucose = async () => {
    let url = "/glucose";
    dispatch({ type: GET_GLUCOSE_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { glucose, totalGlucose, numOfPagesGlucose } = data;
      dispatch({
        type: GET_GLUCOSE_SUCCESS,
        payload: {
          glucose,
          totalGlucose,
          numOfPagesGlucose,
        },
      });
    } catch (error) {
      // here, only possible errors are: 500 Server's down or 401 Unauthenticated user
      console.log(error.response);
      // logoutUser();  // TODO
    }
    clearAlert();
  };

  // ====================================================================
  // ===== SET EDIT MEAL
  const setEditMeal = (id) => {
    dispatch({ type: SET_EDIT_MEAL, payload: { id } });
  };

  const editMeal = async () => {
    dispatch({ type: EDIT_MEAL_BEGIN });
    try {
      const { mealTitle, mealDate, mealLocation, mealType, mealScore } = state;
      await authFetch.patch(`/meals/${state.editMealId}`, {
        mealTitle,
        mealDate,
        mealLocation,
        mealType,
        mealScore,
      });
      dispatch({ type: EDIT_MEAL_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_MEAL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // ====================================================================
  // ===== DELETE MEAL
  const deleteMeal = async (mealId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/meals/${mealId}`);
      getMeals();
    } catch (error) {
      console.log(error.response);
      logoutUser(); // TODO: to comment when developping/debugging
    }
  };

  // ====================================================================
  // ===== SHOW STATS
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/meals/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyMeals: data.monthlyMeals,
          dailyGlucose: data.dailyGlucose,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser(); // TODO: to comment when developping/debugging
    }
  };

  // ====================================================================
  // ===== CLEAR FILTERS
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  // ====================================================================
  // ===== CHANGE PAGE
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createMeal,
        getGlucose,
        getMeals,
        setEditMeal,
        deleteMeal,
        editMeal,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
