import { createAction, props } from "@ngrx/store";
import { User } from "../../types/user";

export const getAllUsers = createAction("GET ALL [USERS]")
export const getAllUsersSuccess = createAction("GET ALL [USERS] SUCCESS", props<{ result: User[], message: string }>())
export const getAllUsersRejected = createAction("GET ALL [USERS] REJECTED", props<{ error: string }>())



