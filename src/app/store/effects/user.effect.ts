import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../user/services/user.service";
import { getAllUsers, getAllUsersRejected, getAllUsersSuccess } from "../actions/user.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class UserEffect {

    constructor(private action: Actions, private userService: UserService, private router: Router) { }

    $getAllUsers = createEffect(() => {
        return this.action.pipe(
            ofType(getAllUsers),
            mergeMap(() => this.userService.getAllUsers().pipe(
                map((res) => getAllUsersSuccess(res)),
                catchError((err) => {
                    if (err.status === 401) {
                        localStorage.removeItem("chat-user")
                        this.router.navigate(['/auth'])
                    }
                    return of(getAllUsersRejected({ error: err }))
                })
            ))
        )
    })





}