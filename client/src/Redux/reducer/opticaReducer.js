import {
  CREATE_OPTICA,
  GET_OPTICA,
  UPDATE_OPTICA,
  VALIDAR_OPTICA,
  GET_OPTICA_ID,
} from "../constants/opticaActionType";

const initialState = {
  optica: [],
  opticaId: null,
  validaOptica: [],
  loading: false,
  error: null,
};

const opticaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_OPTICA:
      return { ...state, optica: action.payload };
    case GET_OPTICA:
      return { ...state, optica: action.payload };
    case UPDATE_OPTICA:
      return { ...state, optica: action.payload };
    case VALIDAR_OPTICA:
      return { ...state, validaOptica: action.payload };
    case GET_OPTICA_ID:
      return { ...state, opticaId: action.payload };
    default:
      return state;
  }
};
export default opticaReducer;
