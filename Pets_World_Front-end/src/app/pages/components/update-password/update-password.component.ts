import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  user_id!: string;
  form!: FormGroup;
  hide = true;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(7)]],
      newPassword: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  submitForm() {
    const data = {
      password: this.form.get('password')?.value,
      newPassword: this.form.get('newPassword')?.value,
    }
    console.log(data)
    this.userService.updatePassword(data).subscribe(
      (data: any) => {
        console.log(data)
        Swal.fire({
          title: 'Updated!',
          text: 'Your password has been updated successfully.',
          icon: 'success',
          timer: 1500
        })
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
