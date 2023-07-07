import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { KeeperAppointmentService } from 'src/app/core/services/user/keeper/keeperAppointment/keeper-appointment.service';
import { KeeperBookingService } from 'src/app/core/services/user/keeper/keeperBooking/keeper-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-keeper-schedule',
  templateUrl: './keeper-schedule.component.html',
  styleUrls: ['./keeper-schedule.component.css']
})
export class KeeperScheduleComponent {
  form!: FormGroup;
  currentDate = new Date();
  keeperAppointments: any;
  appointment: any;
  keeperBookingData: any;
  pagedKeeperBookingData: any[] = []; // Array to hold the paged booking data
  pageSize = 10; // Number of items to display per page
  currentPage = 0; // Current page index
  keeper_id!: string;

  constructor(private authService: AuthService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private keeperAppointmentService: KeeperAppointmentService,
    private keeperBookingService: KeeperBookingService) {
    this.keeper_id = authService.getKeeperId();
  }

  ngOnInit(): void {
    this.getKeeperAppointments(this.keeper_id);
    this.form = this._formBuilder.group({
      appointment: [this.appointment?._id]
    });
  }

  getKeeperAppointments(id: string) {
    this.keeperAppointmentService.getKeeperAppointment(id).subscribe(
      (data: any) => {
        console.log(data)
        this.keeperAppointments = data;
        this.setSelectedAppointment();
        this.form?.get('appointment')?.setValue(this.appointment?._id);
        this.getKeeperBookingData();
      }, (error: any) => {
        console.error(error);
      }
    )
  }

  setSelectedAppointment() {
    const formattedCurrentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.appointment = this.keeperAppointments?.find((appointment: any) => {
      const start = this.datePipe.transform(appointment.start_time, 'yyyy-MM-dd');
      const end = this.datePipe.transform(appointment.end_time, 'yyyy-MM-dd');
      if (start !== null && end !== null && formattedCurrentDate !== null && start <= formattedCurrentDate && end >= formattedCurrentDate)
        return appointment
    })
  }

  onAppointmentChange(): void {
    this.getKeeperBookingData();
  }

  getKeeperBookingData() {
    const filter = {
      keeper_id: this.keeper_id,
      appointment_id: this.form?.get('appointment')?.value
    }
    console.log(filter)
    this.keeperBookingService.getKeeperSchedule(filter).subscribe(
      (data: any) => {
        console.log(data)
        this.keeperBookingData = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.owner_id.user_id.image}`;
          return booking;
        });
        this.updatePagedKeeperBookingData();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedKeeperBookingData();
  }

  updatePagedKeeperBookingData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedKeeperBookingData = this.keeperBookingData?.slice(startIndex, endIndex);
  }

  deleteBooking(booking: any, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.keeperBookingService.deleteVetBooking(booking._id, { appointment_id: booking.appointment_id._id }).subscribe(
          (data: any) => {
            console.log(data)
            this.pagedKeeperBookingData.splice(index, 1);
            this.keeperBookingData = this.keeperBookingData.filter((item: any) => item._id !== booking._id);
            this.updatePagedKeeperBookingData();
          },
          (error: any) => {
            console.error(error);
          }
        );
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
