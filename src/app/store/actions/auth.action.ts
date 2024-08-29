import { createAction, props } from "@ngrx/store";
import { loginData, verifyOtpData, verifyOtpResponse } from "../../auth/types/response";

export const registerUser = createAction("REGISTER USER", props<{ userData: FormData }>())
export const registerUserSuccess = createAction("REGISTER USER SUCCESS", props<{ message: string }>())
export const registerUserRejected = createAction("REGISTER USER REJECTED", props<{ error: string }>())

export const loginUser = createAction("LOGIN USER", props<{ userData: loginData }>())
export const loginUserSuccess = createAction("LOGIN USER SUCCESS", props<{ message: string, userName: string }>())
export const loginUserRejected = createAction("LOGIN USER REJECTED", props<{ error: string }>())

export const verifyOtp = createAction("VERIFY-OTP", props<{ userData: verifyOtpData }>());
export const verifyOtpSuccess = createAction("VERIFY-OTP SUCCESS", props<{ res: verifyOtpResponse, message: string }>());
export const verifyOtpRejected = createAction("VERIFY-OTP REJECTED", props<{ error: string }>());


export const logOut = createAction("LOG OUT");
export const logOutSuccess = createAction("LOG OUT SUCCESS", props<{ message: string }>());
export const logOutRejected = createAction("LOG OUT REJECTED", props<{ error: string }>());


