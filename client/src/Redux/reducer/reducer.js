import { combineReducers } from "redux";
import opticaReducer from "./opticaReducer";
import clientesReducer from "./clientesReducer";
import formulaReducer from "./FormulaReducer";

const reducer = combineReducers({
  optica: opticaReducer,
  cliente: clientesReducer,
  formula: formulaReducer,
});

export default reducer;
