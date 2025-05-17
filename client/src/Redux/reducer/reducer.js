import { combineReducers } from "redux";
import opticaReducer from "./opticaReducer";
import clientesReducer from "./clientesReducer";
import formulaReducer from "./FormulaReducer";
import turnoReducer from "./turnoReducer";

const reducer = combineReducers({
  optica: opticaReducer,
  cliente: clientesReducer,
  formula: formulaReducer,
  turno: turnoReducer,
});

export default reducer;
