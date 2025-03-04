import API from "../Api";

export const login = async (data) => {
    try {
        const response = await API.post("/api/login", {
            email: data.email,
            password: data.password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        return error.response ? error.response.data : { success: false, message: 'Error desconocido' };
    }
}