// src/api/auth.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.2.2:4000/api",
    // mobile device -> local IP
    timeout: 10000,
});

export default api

export const login = async (payload: { email: string; password: string }) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
};

export const getProducts = async (productId: string,searchQuery: string, division: string) => {
    const res = await api.get("/company/product", {
        params: {
            searchQuery,
            productId,
            division,
        },
    });
    console.log("res", res.data);
    return res.data;
};