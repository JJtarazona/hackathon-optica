import {
  CREATE_FORMULA,
  GET_FORMULA,
  UPDATE_FORMULA,
  DELETE_FORMULA,
} from "@/Redux/constants/formulaActionType";

const initialState = {
  formula: [],
  loading: false,
  error: null,
};

const formulaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FORMULA:
      return { ...state, formula: action.payload };
    case GET_FORMULA:
      return { ...state, formula: action.payload };
    case UPDATE_FORMULA:
      return { ...state, formula: action.payload };
    case DELETE_FORMULA:
      return { ...state, formula: action.payload };
    default:
      return state;
  }
};

export default formulaReducer;
