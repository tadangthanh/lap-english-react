import { AuthRequest } from '../modal/AuthRequest';
import Cookies from "js-cookie";


export async function login(request: AuthRequest): Promise<any> {
    const url = "http://localhost:8080/auth/access";
    const response = await fetch(url, { method: "POST", body: JSON.stringify(request), headers: { "Content-Type": "application/json" } });
    if (!response.ok) {
        throw new Error("Login failed");
    };
    const body = await response.json();
    saveTokenAndRefreshToken(body.data.accessToken, body.data.refreshToken);
    return body;
}
const saveTokenAndRefreshToken = (token: string, refreshToken: string): void => {
    Cookies.set('token', token, { expires: 7 }); // Token sẽ hết hạn sau 7 ngày
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
}
// Hàm để lấy token từ cookie
export const getToken = (): string | undefined => {
    return Cookies.get('token');
}
export const getRefreshToken = (): string | undefined => {
    return Cookies.get('refreshToken');
}

export const setToken = (token: string): void => {
    Cookies.set('token', token, { expires: 7 });
}
export const setRefreshToken = (refreshToken: string): void => {
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
}