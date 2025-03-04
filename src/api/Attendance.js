import API from "../Api";

export const postAttendance = async (grupo_id, asistencias) => {
    try {
        const response = await API.post(`/api/asistencia/nueva?grupo_id=${grupo_id}`, { asistencias });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};