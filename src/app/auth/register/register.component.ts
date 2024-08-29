import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { authStateType } from '../../store/reducers/auth.reducer';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { registerUser } from '../../store/actions/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({})
  loading: Boolean = false

  constructor(private fb: FormBuilder, private store: Store<{ authReducer: authStateType }>) {

    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      mobile: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
      hero: ["", Validators.required]
    }, {
      validators: this.matchPassword
    })
    store.select(state => state.authReducer.loading).subscribe((data) => {
      this.loading = data
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please Fill All Fields',
        icon: 'error',
        confirmButtonText: 'Cool',
      })
    } else {
      const fd = new FormData()
      for (const key in this.registerForm.value) {
        if (Object.prototype.hasOwnProperty.call(this.registerForm.value, key)) {
          fd.append(key, this.registerForm.value[key])
        }
      }
      this.store.dispatch(registerUser({ userData: fd }))
    }
  }


  handleHero(e: Event) {
    const { files } = e.target as HTMLInputElement
    if (files && files.length > 0) {
      this.registerForm.patchValue({
        hero: files[0]
      })
    }
  }










  matchPassword(arg: AbstractControl): ValidationErrors | null {
    const pass = arg.get('password')?.value
    const cpass = arg.get('cpassword')?.value
    return pass === cpass ? null : { mismatch: true }
  }





}
