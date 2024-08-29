import { createReducer, on } from "@ngrx/store"
import { verifyOtpResponse } from "../../auth/types/response"
import { loginUser, loginUserRejected, loginUserSuccess, registerUser, registerUserRejected, registerUserSuccess, verifyOtp, verifyOtpRejected, verifyOtpSuccess } from "../actions/auth.action"

export type authStateType = {
    user?: verifyOtpResponse,
    message: string,
    error: any,
    loading: boolean,
    userName: string

}
const x = localStorage.getItem("chat-user")
let u;
if (x) {
    u = JSON.parse(x)
}
const initialState: authStateType = { user: u, error: "", message: "", loading: false, userName: "" }


export const authReducer = createReducer(
    initialState,
    on(registerUser, (state, action) => ({ ...state, loading: true })),
    on(registerUserSuccess, (state, { message }) => ({ ...state, loading: false, message })),
    on(registerUserRejected, (state, { error }) => ({ ...state, loading: false, error })),

    on(loginUser, (state, action) => ({ ...state, loading: true })),
    on(loginUserSuccess, (state, { message, userName }) => ({ ...state, loading: false, message, userName })),
    on(loginUserRejected, (state, { error }) => ({ ...state, loading: false, error })),

    on(verifyOtp, (state, action) => ({ ...state, loading: true })),
    on(verifyOtpSuccess, (state, { message, res }) => ({ ...state, loading: false, message, user: res })),
    on(verifyOtpRejected, (state, { error }) => ({ ...state, error, loading: false, })),


);
