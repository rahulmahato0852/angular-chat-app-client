import { createReducer, on } from "@ngrx/store"
import { User } from "../../types/user"
import { getAllUsers, getAllUsersRejected, getAllUsersSuccess } from "../actions/user.action"

export type userStateType = {
    allusers: User[],
    loading: boolean,
    message: string,
    error: any,

}
const initialState: userStateType = {
    allusers: [], error: "", loading: false, message: ""
}

export const userReducer = createReducer(
    initialState,
    on(getAllUsers, (state, { }) => ({ ...state, loading: true })),
    on(getAllUsersSuccess, (state, { message, result }) => ({ ...state, loading: false, allusers: result, message })),
    on(getAllUsersRejected, (state, { error }) => ({ ...state, loading: false, error })),
)

