import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../auth/services/auth.service";
import { logOut, logOutRejected, logOutSuccess, loginUser, loginUserRejected, loginUserSuccess, registerUser, registerUserRejected, registerUserSuccess, verifyOtp, verifyOtpRejected, verifyOtpSuccess } from "../actions/auth.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class authEffect {

    constructor(private action: Actions, private authService: AuthService, private router: Router) { }

    $registerUser = createEffect(() => {
        return this.action.pipe(
            ofType(registerUser),
            mergeMap(({ userData }) => this.authService.registerUser(userData).pipe(
                map(({ message }) => {
                    this.router.navigate(['/auth/'])
                    return registerUserSuccess({ message })
                }),
                catchError((error) => of(registerUserRejected({ error })))
            ))
        )
    })


    $loginUser = createEffect(() => {
        return this.action.pipe(
            ofType(loginUser),
            mergeMap(({ userData }) => this.authService.loginUser(userData).pipe(
                map(({ message }) => {
                    Swal.fire({
                        title: 'Good Job',
                        text: 'OTP sent to your email',
                        icon: 'warning',
                        confirmButtonText: 'Cool',
                    })
                    this.router.navigate(['/auth/verify-otp'])
                    return loginUserSuccess({ message, userName: userData.userName })
                }),
                catchError(({ error }) => {
                    Swal.fire({
                        title: 'Opps',
                        text: error.message || error,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    })
                    return of(loginUserRejected({ error }))
                })
            ))
        )
    })



    $verifyOtp = createEffect(() => {
        return this.action.pipe(
            ofType(verifyOtp),
            mergeMap(({ userData }) => {
                return this.authService.verifyOtp(userData).pipe(
                    map(({ message, result }) => {
                        Swal.fire({
                            title: 'Great',
                            text: `Welcome back! ${result.name} 🎈`,
                            icon: 'warning',
                            confirmButtonText: 'Cool',
                        })
                        localStorage.setItem("chat-user", JSON.stringify(result))
                        this.router.navigate(['/user'])
                        return verifyOtpSuccess({ message, res: result })
                    }),
                    catchError((error) => {
                        console.log(error);
                        if (error.status === 403) {
                            Swal.fire({
                                title: 'Invalid OTP',
                                text: `Check your email and enter correct OTP`,
                                icon: 'error',
                                confirmButtonText: 'Try Again',
                            })
                        }
                        return of(verifyOtpRejected({ error }))
                    })
                )
            },
            )
        )
    })



    $logOut = createEffect(() => {
        return this.action.pipe(
            ofType(logOut),
            mergeMap(() => this.authService.logOut().pipe(
                map(({ message }) => {
                    localStorage.removeItem('chat-user')
                    Swal.fire({
                        title: 'Log Out Success',
                        text: `Thanks for using our chat service! `,
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    })
                    this.router.navigate(['/auth'])
                    return logOutSuccess({ message })
                }),
                catchError((err) => of(logOutRejected({ error: err })))
            )
            ))
    })



}