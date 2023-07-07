import { Component, ViewChild, ElementRef } from '@angular/core';
import { VetAppointmentService } from 'src/app/core/services/vet/vetAppointment/vet-appointment.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-vet-appointments',
  templateUrl: './vet-appointments.component.html',
  styleUrls: ['./vet-appointments.component.css'],
})
export class VetAppointmentsComponent {
  appointmentFormGroup!: FormGroup;
  appointments: any;
  addAppointment: any;
  editAppointment: any;
  id!: string;
  clicked: boolean = false;
  modelStatus: any = 'Add';
  pagedAppointments: any[] = []; // Array to hold the paged booking data
  pageSize = 10; // Number of items to display per page
  currentPage = 0; // Current page index

  constructor(
    private authService: AuthService,
    private _VetAppointments: VetAppointmentService,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder
  ) {
    this.id = authService.getVetId();
  }

  ngOnInit() {
    this.getVetAppointments();
    this.appointmentFormGroup = this._formBuilder.group({
      id: [''],
      start_date: [''],
      end_date: [''],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      number_of_clients: [
        ,
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+')],
      ],
    });
  }

  getVetAppointments() {
    // console.log(this.id);
    this._VetAppointments.getVetAppointments(this.id).subscribe(
      (data: any) => {
        this.appointments = data;
        this.updatePagedAppointments();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteVetAppointment(id: any) {
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
        this._VetAppointments.deleteVetAppointment(id).subscribe(
          (data: any) => {
            this.appointments = this.appointments.filter(
              (element: any) => element._id != id
            );
            this.pagedAppointments = this.appointments;
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
    });
  }

  formatDate(date: any) {
    const dateString = date; // Replace with your date string
    const datePipe = new DatePipe('en-US');
    const dateObj = new Date(dateString);
    const formattedDate = datePipe.transform(dateObj, 'MMMM d');
    return formattedDate;
  }

  resetForm() {
    this.modelStatus = 'Add';
    this.appointmentFormGroup.reset();
  }

  fillForm(appointment: any) {
    this.modelStatus = 'Edit';
    this.appointmentFormGroup.patchValue({
      id: appointment._id,
      start_time: appointment.start_time,
      end_time: appointment.end_time,
      number_of_clients: appointment.number_of_clients,
      start_date: '2023-06-20',
      end_date: '2023-06-20',
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
    let start = this.datePipe.transform(
      this.appointmentFormGroup.value.start_date,
      'yyyy-MM-dd'
    );
    let end = this.datePipe.transform(
      this.appointmentFormGroup.value.end_date,
      'yyyy-MM-dd'
    );
    this.addAppointment = {
      number_of_clients: this.appointmentFormGroup.value.number_of_clients,
      start_date: start,
      end_date: end,
      start_time: this.appointmentFormGroup.value.start_time,
      end_time: this.appointmentFormGroup.value.end_time,
    };
    this.clicked = true;
    this._VetAppointments
      .addVetAppointments(this.addAppointment, this.id)
      .subscribe(
        (data: any) => {
          if (data.status == '201') {
            Swal.fire({
              title: 'Success!',
              text: 'Appointment done successfully',
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

  submitEdit() {
    this.editAppointment = {
      id: this.appointmentFormGroup.value.id,
      number_of_clients: this.appointmentFormGroup.value.number_of_clients,
      start_time: this.appointmentFormGroup.value.start_time,
      end_time: this.appointmentFormGroup.value.end_time,
    };
    this._VetAppointments.updateVetAppointment(this.editAppointment).subscribe(
      (data: any) => {
        if (data.status == '201') {
          Swal.fire({
            title: 'Success!',
            text: 'Appointment updated successfully',
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

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedAppointments();
  }

  updatePagedAppointments() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedAppointments = this.appointments?.slice(startIndex, endIndex);
  }
}
