import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  retypePassword: string;
  phone: string;
  gender: string;
  role: string;
  pets?: PetData[];
  user_id?: string;
  cost?: number;
  experience?: number;
  address?: string;
  description?: string;
  images: File[];
}

interface PetData {
  name: string;
  type: string;
  gender: string;
  dateOfBirth?: Date;
  age: number;
  description?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup<{}>;
  genderOptions: string[] = ['male', 'female'];
  roleOptions: string[] = ['owner', 'vet'];
  petTypeOptions: string[] = ['dog', 'cat', 'bird'];
  errorMessages: { [key: string]: string } = {};
  file_store: File[] = [];
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(3), this.noNumberValidator],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(3), this.noNumberValidator],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
        ],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('^01[0-2]{1}[0-9]{8}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      retypePassword: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      role: ['', Validators.required],
      pets: this._formBuilder.array([]),
      userImage: ['', Validators.required], // Control for user image
      vet: this._formBuilder.group({
        cost: [, Validators.required],
        experience: [, Validators.required],
        address: [, Validators.required],
        description: [''],
        vetLicense: ['', Validators.required], // Control for vet license
      }),
    });

    this.addPet();
    this.thirdFormGroup = this._formBuilder.group({});
  }

  get petFormArray() {
    return this.secondFormGroup.get('pets') as FormArray;
  }

  submitForm() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const userdata: UserData = {
        firstName: this.firstFormGroup.get('firstName')?.value,
        lastName: this.firstFormGroup.get('lastName')?.value,
        phone: this.firstFormGroup.get('phone')?.value,
        email: this.firstFormGroup.get('email')?.value,
        password: this.firstFormGroup.get('password')?.value,
        retypePassword: this.firstFormGroup.get('retypePassword')?.value,
        gender: this.secondFormGroup.get('gender')?.value,
        role: this.secondFormGroup.get('role')?.value,
        images: [],
      };

      if (this.file_store[0]) {
        userdata.images.push(this.file_store[0]);
      }
      if (this.file_store[1]) {
        userdata.images.push(this.file_store[1]);
      }
      const formData = new FormData();

      if (userdata.role === 'owner') {
        const petFormArray = this.secondFormGroup.get('pets') as FormArray;
        userdata.pets = petFormArray.value;
        if (!userdata.pets || userdata.pets.length === 0) {
          console.log('Please add at least one pet.');
          return;
        }
        formData.append('pets', JSON.stringify(userdata.pets));
      } else if (userdata.role === 'vet') {
        const costControl = this.secondFormGroup.get('vet')?.get('cost');
        const experienceControl = this.secondFormGroup
          .get('vet')
          ?.get('experience');
        const addressControl = this.secondFormGroup
          .get('vet')
          ?.get('address');
        const descriptionControl = this.secondFormGroup
          .get('vet')
          ?.get('description');

        if (!costControl?.value || !experienceControl?.value || !addressControl?.value) {
          console.log('Please fill in all vet information.');
          return;
        }
        formData.append('cost', '' + costControl?.value);
        formData.append('experience', '' + experienceControl?.value);
        formData.append('address', '' + addressControl?.value);
        formData.append('description', '' + descriptionControl?.value);

      } else {
        console.log('Invalid role selected.');
        return;
      }

      formData.append('firstName', this.firstFormGroup.get('firstName')?.value);
      formData.append('lastName', this.firstFormGroup.get('lastName')?.value);
      formData.append('phone', this.firstFormGroup.get('phone')?.value);
      formData.append('email', this.firstFormGroup.get('email')?.value);
      formData.append('password', this.firstFormGroup.get('password')?.value);
      formData.append(
        'retypePassword',
        this.firstFormGroup.get('retypePassword')?.value
      );
      formData.append('gender', this.secondFormGroup.get('gender')?.value);
      formData.append('role', this.secondFormGroup.get('role')?.value);

      formData.append('images', userdata.images[0]);
      formData.append('images', userdata.images[1]);
      console.log(formData.get('description'));
      console.log(formData.get('address'));
      this.userService.register(formData).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          const errorMessages = err.error.errors;

          Object.keys(errorMessages).forEach((field) => {
            const formControl =
              this.firstFormGroup.get(field) || this.secondFormGroup.get(field);
            if (formControl) {
              formControl.setErrors({ serverError: errorMessages[field] });
              this.errorMessages[field] = errorMessages[field]; // Store the error message for display
            }
          });
        },
      });
    } else {
      console.log('Please fill in all required fields.');
    }
  }

  // --------add and remove pets --------
  addPet() {
    const petGroup = this._formBuilder.group({
      name: ['', [Validators.required, this.noNumberValidator]],
      type: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: [, Validators.required],
      description: [''],
    });

    this.petFormArray.push(petGroup);
  }

  removePet(index: number) {
    this.petFormArray.removeAt(index);
  }

  // ---------validations-----------
  onUserImageChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
      const fileName = files[0].name;
      this.secondFormGroup.controls['userImage'].patchValue(
        `${fileName}${count}`
      );
      this.file_store[0] = files[0];
      if (files.length > 1) {
        const fileName2 = files[1].name;
        this.secondFormGroup.controls['vetLicense'].patchValue(
          `${fileName2}${count}`
        );
        this.file_store[1] = files[1];
      }
      console.log(this.file_store);
    } else {
      this.secondFormGroup.controls['userImage'].patchValue('');
      this.secondFormGroup.controls['vetLicense'].patchValue('');
      this.file_store = [];
    }
  }

  onVetLicenseChange(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
      const fileName = files[0].name;
      this.secondFormGroup
        .get('vet')
        ?.get('vetLicense')
        ?.patchValue(`${fileName}${count}`);
      this.file_store[1] = files[0];
      if (files.length > 1) {
        const fileName2 = files[1].name;
        this.secondFormGroup
          .get('vet')
          ?.get('userImage')
          ?.patchValue(`${fileName2}${count}`);
        this.file_store[0] = files[1];
      }
      console.log(this.file_store);
    } else {
      this.secondFormGroup.get('vet')?.get('userImage')?.patchValue('');
      this.secondFormGroup.get('vet')?.get('vetLicense')?.patchValue('');
      this.file_store = [];
    }
  }

  selectRole(value: any) {
    if (value === 'vet') {
      this.secondFormGroup.controls['pets'].disable();
      this.secondFormGroup.controls['vet'].enable();
    } else {
      this.secondFormGroup.controls['pets'].enable();
      this.secondFormGroup.controls['vet'].disable();
    }
  }

  checkPasswords() {
    const passwordControl = this.firstFormGroup.get('password');
    const retypePasswordControl = this.firstFormGroup.get('retypePassword');

    if (passwordControl && retypePasswordControl) {
      const password = passwordControl.value;
      const retypePassword = retypePasswordControl.value;

      // Update the validity of the 'retypePassword' form control based on the match status
      if (password === retypePassword) {
        retypePasswordControl.setErrors(null);
      } else {
        retypePasswordControl.setErrors({ mismatch: true });
      }
    }
  }
  passwordsMatch() {
    const retypePasswordControl = this.firstFormGroup.get('retypePassword');
    return retypePasswordControl && !retypePasswordControl.hasError('mismatch');
  }
  // Custom validator function to check for numbers in the input
  noNumberValidator = (control: FormControl) => {
    const value = control.value;
    const hasNumber = /\d/.test(value);
    return hasNumber ? { containsNumber: true } : null;
  };
}
