import {
  CREATE_CLIENTE,
  GET_CLIENTE,
  UPDATE_CLIENTE,
  GET_NUMERO_CLIENTE,
} from "@/Redux/constants/clientesActionType";

const initialState = {
  clienteNumero: 0,
  loading: false,
  cliente: [],
  error: null,
};

const clientesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLIENTE:
      return { ...state, cliente: action.payload };
    case GET_CLIENTE:
      return { ...state, cliente: action.payload };
    case UPDATE_CLIENTE:
      return { ...state, cliente: action.payload };
    case GET_NUMERO_CLIENTE:
      return { ...state, clienteNumero: action.payload };
    default:
      return state;
  }
};
export default clientesReducer;
