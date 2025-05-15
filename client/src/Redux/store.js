import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducer";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)) // esta línea es para poder hacer peticiones a un server
);
export default store;
