import axios from "axios";
import {
  CREATE_CLIENTE,
  GET_CLIENTE,
  UPDATE_CLIENTE,
  GET_NUMERO_CLIENTE,
} from "@/Redux/constants/clientesActionType";
import { ENDPOINTS } from "@/lib/api/endpoint";
import { toast } from "sonner";

export const createCliente = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${ENDPOINTS.CLIENTE}`, data);
    dispatch({
      type: CREATE_CLIENTE,
      payload: response.data,
    });
    toast.success("Clientes cargados correctamente");
    dispatch(clientePorOptica(data.opticaId));
  } catch (error) {
    console.error("Error creating cliente:", error);
  }
};

export const clientePorOptica = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${ENDPOINTS.CLIENTE}/por-optica/${id}`);
    dispatch({
      type: GET_CLIENTE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching cliente by optica:", error);
  }
};

export const updateCliente = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(`${ENDPOINTS.CLIENTE}/${id}`, data);
    dispatch({
      type: UPDATE_CLIENTE,
      payload: response.data,
    });
    dispatch(clientePorOptica(data.opticaId));
    toast.success("Cliente actualizado con éxito");
  } catch (error) {
    console.error("Error updating cliente:", error);
  }
};

export const numeroClientes = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${ENDPOINTS.CLIENTE}/numero/${id}`);
    dispatch({
      type: GET_NUMERO_CLIENTE,
      payload: response.data,
    });
    console.log("Datos del action ", response.data);
  } catch (error) {
    console.error("Error fetching cliente by optica:", error);
  }
};
