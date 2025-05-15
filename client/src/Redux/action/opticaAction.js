import axios from "axios";
import {
  CREATE_OPTICA,
  GET_OPTICA,
  GET_OPTICA_ID,
  UPDATE_OPTICA,
  VALIDAR_OPTICA,
} from "@/Redux/constants/opticaActionType";
import { ENDPOINTS } from "@/lib/api/endpoint";

export const createOptica = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${ENDPOINTS.OPTICA}`, data);
    dispatch({
      type: CREATE_OPTICA,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error creating optica");
  }
};

export const getOptica = () => async (dispatch) => {
  try {
    const response = await axios.get(`${ENDPOINTS.OPTICA}`);
    dispatch({
      type: GET_OPTICA,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching optica");
  }
};

export const validarOptica = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${ENDPOINTS.OPTICA}/validar/${id}`);
    dispatch({
      type: VALIDAR_OPTICA,
      payload: response.data,
    });
  } catch (error) {
    console.error("Optica not found");
  }
};
export const updateOptica = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(`${ENDPOINTS.OPTICA}/${id}`, data);
    dispatch({
      type: UPDATE_OPTICA,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error updating optica");
  }
};

export const getOpticaId = (id) => async (dispatch) => {
  console.log("opticaId", id);

  try {
    const response = await axios.get(`${ENDPOINTS.OPTICA}/${id}`);
    dispatch({
      type: GET_OPTICA_ID,
      payload: response.data,
    });

    if (response.data) {
      localStorage.setItem("opticaId", response.data.id);
    }
  } catch (error) {
    console.error("Error fetching optica by ID");
  }
};
