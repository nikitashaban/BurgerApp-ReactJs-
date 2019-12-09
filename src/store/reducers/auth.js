import * as actions from "../actions/actionTypes";

const initialState = {
  token: null,
  error: null,
  userId: null,
  loading: false,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        loading: false,
        error: null
      };
    case actions.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actions.AUTH_LOGOUT:
      return {
        ...state,
        userId: null,
        token: null
      };
    case actions.SET_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };
    default:
      return state;
  }
};

export default reducer;
