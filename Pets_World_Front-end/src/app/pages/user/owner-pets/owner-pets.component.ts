import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/pages/user/owner-pets/models/Ipets';
import { PetService } from 'src/app/core/services/user/userPets/user-pets.service';
import { ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { API_URL } from 'src/app/core/services/environment/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-owner-pets',
  templateUrl: './owner-pets.component.html',
  styleUrls: ['./owner-pets.component.css'],
})
export class OwnerPetsComponent {
  petId: any;
  addPet: any;
  editPet: any;
  id!: string;
  clicked: boolean = false;
  modelStatus: any = 'Add';
  genderOptions: string[] = ['male', 'female'];
  petTypeOptions: string[] = ['dog', 'cat', 'bird'];
  petFormGroup!: FormGroup;
  ownerId: string = '';
  pets: Pet[] = [];
  pagedPets: any[] = []; // Array to hold the paged booking data
  pageSize = 10; // Number of items to display per page
  currentPage = 0; // Current page index

  constructor(
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private petService: PetService
  ) {
    this.id = authService.getVetId();
    this.ownerId = authService.getOwnerId();
  }
  noNumberValidator = (control: FormControl) => {
    const value = control.value;
    const hasNumber = /\d/.test(value);
    return hasNumber ? { containsNumber: true } : null;
  };

  //CREATE FUNCTION TO GET DATA FROM SERVICE
  ngOnInit(): void {
    const ownerId = this.route.snapshot.paramMap.get('ownerId');

    this.petService.getAllPetsByOwnerId(this.ownerId).subscribe((pets) => {
      this.pets = pets;
      this.updatePagedAppointments();
      console.log(pets);
    });

    this.petFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, this.noNumberValidator]],
      type: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: [, Validators.required],
      description: [''],
    });
  }
  submitForm() {
    if (this.modelStatus == 'Add') {
      this.submitAdd();
    } else {
      this.submitEdit();
    }
  }
  submitAdd() {
    this.addPet = {
      name: this.petFormGroup.value.name,
      type: this.petFormGroup.value.type,
      gender: this.petFormGroup.value.gender,
      dateOfBirth: this.petFormGroup.value.dateOfBirth,
      age: this.petFormGroup.value.age,
      description: this.petFormGroup.value.description,
    };
    this.clicked = true;
    this.petService.createPet(this.addPet, this.ownerId).subscribe(
      (data: any) => {
        if (data.status == '201') {
          Swal.fire({
            title: 'Success!',
            text: 'Pet done successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            title: 'Error!',
            text: `${data.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          this.clicked = false;
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: `${error.error.message}`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  fillForm(pet: any) {
    this.modelStatus = 'Edit';
    this.petId = pet._id;
    this.petFormGroup.patchValue({
      name: pet.name,
      type: pet.type,
      gender: pet.gender,
      dateOfBirth: pet.dateOfBirth,
      age: pet.age,
      description: pet.description,
    });
  }

  submitEdit() {
    this.addPet = {
      name: this.petFormGroup.value.name,
      type: this.petFormGroup.value.type,
      gender: this.petFormGroup.value.gender,
      dateOfBirth: this.petFormGroup.value.dateOfBirth,
      age: this.petFormGroup.value.age,
      description: this.petFormGroup.value.description,
    };
    this.clicked = true;
    this.petService.updatePet(this.addPet, this.petId, this.ownerId).subscribe(
      (data: any) => {
        if (data.status == '201') {
          Swal.fire({
            title: 'Success!',
            text: 'Pet done successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            title: 'Error!',
            text: `${data.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
          this.clicked = false;
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: `${error.error.message}`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  resetForm() {
    this.modelStatus = 'Add';
    this.petFormGroup.reset();
  }

  deletePet(petId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.petService
          .deletePet(petId, this.ownerId)
          .subscribe((deletedPet) => {
            // Handle successful deletion
            console.log('Pet deleted:', deletedPet);
          });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  }

  // deletePet(petId: string): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.petService
  //         .deletePet(petId, this.ownerId)
  //         .subscribe((deletedPet) => {
  //           // Handle successful deletion
  //           console.log('Pet deleted:', deletedPet);
  //         });
  //       Swal.fire({
  //         title: 'Deleted!',
  //         text: 'Your file has been deleted.',
  //         icon: 'success',
  //         timer: 1500,
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1500);
  //     }
  //   });
  // }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedAppointments();
  }

  updatePagedAppointments() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPets = this.pets?.slice(startIndex, endIndex);
  }
}
