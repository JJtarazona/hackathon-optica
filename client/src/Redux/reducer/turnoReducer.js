import {
  CREATE_TURNO,
  GET_TURNO,
  UPDATE_TURNO,
  DELETE_TURNO,
  GET_TURNO_BY_OPTICA_ID,
} from "@/Redux/constants/turnosActionType";

const initialState = {
  turno: [],
  loading: false,
  error: null,
};

const turnoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TURNO:
      return {
        ...state,
        turno: [...state.turno, action.payload],
        loading: false,
      };
    case GET_TURNO:
      return { ...state, turno: action.payload };
    case UPDATE_TURNO:
      return {
        ...state,
        turno: state.turno.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        loading: false,
      };
    case DELETE_TURNO:
      return {
        ...state,
        turno: state.turno.filter((turno) => turno.id !== action.payload),
      };
    case GET_TURNO_BY_OPTICA_ID:
      return { ...state, turno: action.payload };
    default:
      return state;
  }
};

export default turnoReducer;
