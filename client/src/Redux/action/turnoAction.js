import {
  CREATE_TURNO,
  GET_TURNO,
  UPDATE_TURNO,
  DELETE_TURNO,
  GET_TURNO_BY_OPTICA_ID,
} from "@/Redux/constants/turnosActionType";
import axios from "axios";
import { ENDPOINTS } from "@/lib/api/endpoint";
import { toast } from "sonner";

// export const createTurno = (turno) => async (dispatch) => {
//   const opticaId = localStorage.getItem("opticaId");
//   try {
//     const response = await axios.post(`${ENDPOINTS.TURNO}`, turno);
//     dispatch({
//       type: CREATE_TURNO,
//       payload: response.data,
//     });
//     toast.success("Turno creado con éxito");

//     dispatch(getTurnoByOpticaId(opticaId));
//   } catch (error) {
//     console.error("Error creating turno:", error);
//   }
// };

export const createTurno = (turno) => async (dispatch) => {
  const opticaId = localStorage.getItem("opticaId");
  try {
    const response = await axios.post(`${ENDPOINTS.TURNO}`, turno);

    // Obtener información completa del cliente
    const clienteResponse = await axios.get(
      `${ENDPOINTS.CLIENTE}/${response.data.clienteId}`
    );

    dispatch({
      type: CREATE_TURNO,
      payload: {
        ...response.data,
        clienteNombre: `${clienteResponse.data.nombre} ${clienteResponse.data.apellido}`,
      },
    });

    toast.success("Turno creado con éxito");
    dispatch(getTurnoByOpticaId(opticaId));
  } catch (error) {
    console.error("Error creating turno:", error);
    toast.error("Error al crear turno");
  }
};

// export const updateTurno = (id, turno) => async (dispatch) => {
//   const opticaId = localStorage.getItem("opticaId");
//   try {
//     const response = await axios.put(`${ENDPOINTS.TURNO}/${id}`, turno);
//     dispatch({
//       type: UPDATE_TURNO,
//       payload: response.data,
//     });
//     toast.success("Turno actualizado con éxito");

//     dispatch(getTurnoByOpticaId(opticaId));
//   } catch (error) {
//     console.error("Error updating turno:", error);
//   }
// };

export const updateTurno = (id, turno) => async (dispatch) => {
  const opticaId = localStorage.getItem("opticaId");
  try {
    const response = await axios.put(`${ENDPOINTS.TURNO}/${id}`, turno);

    // Obtener información completa del cliente
    const clienteResponse = await axios.get(
      `${ENDPOINTS.CLIENTE}/${response.data.clienteId}`
    );

    dispatch({
      type: UPDATE_TURNO,
      payload: {
        ...response.data,
        clienteNombre: `${clienteResponse.data.nombre} ${clienteResponse.data.apellido}`,
      },
    });

    toast.success("Turno actualizado con éxito");
    dispatch(getTurnoByOpticaId(opticaId));
  } catch (error) {
    console.error("Error updating turno:", error);
    toast.error("Error al actualizar turno");
  }
};

export const getTurno = () => async (dispatch) => {
  try {
    const response = await axios.get(`${ENDPOINTS.TURNO}`);
    dispatch({
      type: GET_TURNO,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error getting turnos:", error);
  }
};

export const deleteTurno = (id) => async (dispatch) => {
  try {
    await axios.delete(`${ENDPOINTS.TURNO}/${id}`);
    dispatch({
      type: DELETE_TURNO,
      payload: id,
    });
    toast.success("Turno eliminado con éxito");
  } catch (error) {
    console.error("Error deleting turno:", error);
  }
};

export const getTurnoByOpticaId = (opticaId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${ENDPOINTS.TURNO}/por-optica/${opticaId}`
    );
    dispatch({
      type: GET_TURNO_BY_OPTICA_ID,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error getting turnos by opticaId:", error);
  }
};
