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

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  // ====================================================================
  // ===== USER REGISTER
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.userLocation,
      mealLocation: action.payload.mealLocation,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting...",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // ====================================================================
  // ===== USER LOGIN
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.userLocation,
      mealLocation: action.payload.mealLocation,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  // ====================================================================
  // ===== UPDATE USER
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.userLocation,
      mealLocation: action.payload.mealLocation,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // ====================================================================
  // ===== LOGOUT USER
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      mealLocation: "",
      userLocation: "",
    };
  }

  // ====================================================================
  // ===== HANDLE CHANGE
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  // ====================================================================
  // ===== CLEAR VALUES
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editMealId: "",
      mealTitle: "",
      mealDate: "",
      mealLocation: state.userLocation,
      mealType: "Snack",
      mealScore: "No score yet",
    };

    return {
      ...state,
      ...initialState,
    };
  }

  // ====================================================================
  // ===== CREATE MEALS
  if (action.type === CREATE_MEAL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_MEAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Meal Created!",
    };
  }

  if (action.type === CREATE_MEAL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // ====================================================================
  // ===== GET MEALS
  if (action.type === GET_MEALS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_MEALS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      meals: action.payload.meals,
      totalMeals: action.payload.totalMeals,
      numOfPages: action.payload.numOfPages,
    };
  }

  // ====================================================================
  // ===== GET GLUCOSE
  if (action.type === GET_GLUCOSE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_GLUCOSE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      glucose: action.payload.glucose,
      totalGlucose: action.payload.totalGlucose,
      numOfPagesGlucose: action.payload.numOfPagesGlucose,
    };
  }

  // ====================================================================
  // ===== SET EDIT MEAL
  if (action.type === SET_EDIT_MEAL) {
    const meal = state.meals.find((meal) => meal._id === action.payload.id);
    const { _id, mealTitle, mealDate, mealLocation, mealType, mealScore } =
      meal;
    return {
      ...state,
      isEditing: true,
      editMealId: _id,
      mealTitle,
      mealDate,
      mealLocation,
      mealType,
      mealScore,
    };
  }

  // ====================================================================
  // ===== DELETE MEAL
  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  // ====================================================================
  // ===== EDIT MEAL
  if (action.type === EDIT_MEAL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_MEAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Meal updated!",
    };
  }

  if (action.type === EDIT_MEAL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // ====================================================================
  // ===== SHOW STATS MEAL
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyMeals: action.payload.monthlyMeals,
      dailyGlucose: action.payload.dailyGlucose,
    };
  }

  // ====================================================================
  // ===== CLEAR FILTERS
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchMealScore: "all",
      searchMealType: "all",
      sort: "latest",
    };
  }
  // ====================================================================
  // ===== CHANGE_PAGE
  if (action.type === CHANGE_PAGE) {
    console.log(action.payload);
    return {
      ...state,
      page: action.payload.page,
    };
  }

  throw new Error(`No such action : ${action.type}`);
};
export default reducer;
