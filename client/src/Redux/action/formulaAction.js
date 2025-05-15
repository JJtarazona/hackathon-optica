import axios from "axios";
import {
  CREATE_FORMULA,
  GET_FORMULA,
  UPDATE_FORMULA,
  DELETE_FORMULA,
} from "@/Redux/constants/formulaActionType";
import { ENDPOINTS } from "@/lib/api/endpoint";
import { toast } from "sonner";

export const createFormula = (formula) => async (dispatch) => {
  try {
    const response = await axios.post(`${ENDPOINTS.FORMULA}`, formula);
    dispatch({
      type: CREATE_FORMULA,
      payload: response.data,
    });
    dispatch(getFormula());
    toast.success("Fórmula creada con éxito");
  } catch (error) {
    toast.error("Error al crear la fórmula" + error.message);
    console.error("Error creating formula:", error);
  }
};

export const getFormula = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${ENDPOINTS.FORMULA}/por-optica/${id}`);
    dispatch({
      type: GET_FORMULA,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching formulas:", error);
  }
};

export const updateFormula = (formula) => async (dispatch) => {
  const { id, data } = formula; // Desestructura el objeto

  console.log("Action de actualizar formula", id, data);

  if (!id) {
    console.error("No se ha proporcionado un ID de fórmula válido");
    return;
  }

  try {
    const response = await axios.put(
      `${ENDPOINTS.FORMULA}/${id}`,
      data // Enviamos solo data, no el objeto completo
    );

    dispatch({
      type: UPDATE_FORMULA,
      payload: response.data,
    });

    toast.success("Fórmula actualizada con éxito");
    dispatch(getFormula());
  } catch (error) {
    console.error("Error updating formula:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    toast.error("Error al actualizar la fórmula");
  }
};

export const deleteFormula = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API}/${id}`);
    dispatch({
      type: DELETE_FORMULA,
      payload: id,
    });
    toast.success("Formula eliminada con éxito");
    dispatch(getFormula());
  } catch (error) {
    console.error("Error deleting formula:", error);
  }
};
