import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { KeeperBookingService } from 'src/app/core/services/user/keeper/keeperBooking/keeper-booking.service';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.css']
})
export class UserScheduleComponent {
  form!: FormGroup;
  currentDate = new Date();
  currentDateKeeper = new Date();
  ownerBookingData: any;
  ownerBookingKeeper: any;
  ownerBookingKeeperDay: any;
  owner_id!: string;

  constructor(private authService: AuthService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private vetBookingService: VetBookingService,
    private keeperBookingService: KeeperBookingService) {
    this.owner_id = authService.getOwnerId();
  }

  ngOnInit(): void {
    this.getVetBookingData(this.owner_id);
    this.form = this._formBuilder.group({
      day: [this.currentDate],
    });
    this.form.get('day')?.valueChanges.subscribe(value => {
      // Perform actions when the value changes
      this.currentDate = value
      this.getVetBookingData(this.owner_id);
      this.getBookingKeeper(value);
    });

    this.getKeeperBookingData();
  }

  getVetBookingData(id: string) {
    const filter = {
      owner_id: id,
      day: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
    }
    this.vetBookingService.getVetSchedule(filter).subscribe(
      (data: any) => {
        this.ownerBookingData = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.owner_id.user_id.image}`;
          return booking;
        });
        console.log(this.ownerBookingData)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getKeeperBookingData() {
    const filter = {
      owner_id: this.owner_id,
    }
    this.keeperBookingService.getKeeperSchedule(filter).subscribe(
      (data: any) => {
        console.log(data)
        this.ownerBookingKeeper = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.keeper_id.owner_id.user_id.image}`;
          return booking;
        });
        console.log(this.ownerBookingKeeper)
        this.getBookingKeeper(this.currentDateKeeper);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getBookingKeeper(day: any) {
    day = this.datePipe.transform(day, 'yyyy-MM-dd');
    this.ownerBookingKeeperDay = this.ownerBookingKeeper.filter((booking: any) => {
      const start = this.datePipe.transform(booking.appointment_id.start_time, 'yyyy-MM-dd');
      const end = this.datePipe.transform(booking.appointment_id.end_time, 'yyyy-MM-dd');
      if (start != null && end != null && day != null && start <= day && end >= day)
        return booking
    })
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
        if (booking.appointment_id.vet_id) {
          this.vetBookingService.deleteVetBooking(booking._id, { appointment_id: booking.appointment_id._id }).subscribe(
            (data: any) => {
              console.log(data)
              this.ownerBookingData = this.ownerBookingData.filter((item: any) => item._id !== booking._id);
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          this.keeperBookingService.deleteVetBooking(booking._id, { appointment_id: booking.appointment_id._id }).subscribe(
            (data: any) => {
              console.log(data)
              this.ownerBookingKeeperDay = this.ownerBookingKeeperDay.filter((item: any) => item._id !== booking._id);
            },
            (error: any) => {
              console.error(error);
            }
          );
        }
        // this.keeperBookingService.deleteVetBooking(booking._id, { appointment_id: booking.appointment_id._id }).subscribe(
        //   (data: any) => {
        //     console.log(data)
        //     this.keeperBookingData = this.keeperBookingData.filter((item: any) => item._id !== booking._id);
        //   },
        //   (error: any) => {
        //     console.error(error);
        //   }
        // );
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }

}
