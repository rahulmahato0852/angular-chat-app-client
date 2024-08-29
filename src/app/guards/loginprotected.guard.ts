import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginprotectedGuard: CanActivateFn = (route, state) => {
  const y = inject(Router)

  const x = localStorage.getItem("chat-user");
  return (x && JSON.parse(x).name) ? true : y.navigate(['/auth']);
};
