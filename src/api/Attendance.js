import API from "../Api";

export const postAttendance = async () => {
    try {
        const response = await API.post("/asitencia/nueva");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}