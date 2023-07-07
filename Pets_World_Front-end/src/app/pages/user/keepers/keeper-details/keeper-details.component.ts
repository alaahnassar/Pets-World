import { PetsService } from '../../../../core/services/pet/pets.service';
import { Component, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { API_URL } from '../../../../core/services/environment/environment';
import { KeeperService } from 'src/app/core/services/user/keeper/keeperService/keeper.service';
import { KeeperAppointmentService } from 'src/app/core/services/user/keeper/keeperAppointment/keeper-appointment.service';
import { KeeperBookingService } from 'src/app/core/services/user/keeper/keeperBooking/keeper-booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

interface Appointment {
  _id: String;
  keeper_id: String;
  start_time: String;
  end_time: String;
  number_of_pets: Number;
}

interface AddAppointment {
  appointment_id: String;
  keeper_id: String;
  owner_id: String;
  pet_id: String;
  // day: String,
}

@Component({
  selector: 'app-keeper-details',
  templateUrl: './keeper-details.component.html',
  styleUrls: ['./keeper-details.component.css'],
})
export class KeeperDetailsComponent {
  keepId: string = '';
  isSticky = false;
  rating: number | null = null;
  hoveredStar: number | null = null;
  owner_Id!: string;
  keeperData: any;
  keeperImage: any;
  keeperRating: number | null = null;
  keeperAppointments: any;
  pets: any;
  keeperBookingData: any;
  bookingFormGroup!: FormGroup;
  days: Date[] = [];
  addAppointment: AddAppointment = {
    appointment_id: '',
    keeper_id: '',
    owner_id: '',
    pet_id: '',
    // day: ''
  };

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private keeperService: KeeperService,
    private keeperAppointmentService: KeeperAppointmentService,
    private datePipe: DatePipe,
    private petsService: PetsService,
    private keeperBookingService: KeeperBookingService
  ) {
    this.owner_Id = authService.getOwnerId();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.keepId = params['id'];
      this.getkeeperData(this.keepId);
      this.getKeeperAppointments(this.keepId);
      this.getPetsByOwnerId(this.owner_Id);
      // this.getKeeperBookingData("648f98130dcac62b73ca2f62");

      this.bookingFormGroup = this._formBuilder.group({
        pet: ['', Validators.required],
        appointment: ['', Validators.required],
      });
    });
  }
  getkeeperData(id: string) {
    this.keeperService.getKeeperById(id).subscribe(
      (data: any) => {
        this.keeperData = data;
        this.keeperImage = `${API_URL}/${this.keeperData.owner_id.user_id.image}`;
        this.staticRate();
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getKeeperAppointments(id: string) {
    this.keeperAppointmentService.getKeeperAppointment(id).subscribe(
      (data: any) => {
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(
          currentDate,
          'yyyy-MM-dd'
        );
        this.keeperAppointments = data.filter((appointment: any) => {
          if (appointment && appointment.end_time && formattedDate) {
            appointment.end_time = this.datePipe.transform(
              appointment.end_time,
              'yyyy-MM-dd'
            );
            return (
              appointment.number_of_pets > 0 &&
              appointment.end_time > formattedDate
            );
          }
          return false;
        });
        console.log(this.keeperAppointments);
        // this.getAppointmentDays(this.keeperAppointments)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getPetsByOwnerId(id: string) {
    this.petsService.getPetsByOwnerId(id).subscribe(
      (data: any) => {
        this.pets = data;
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  submitForm() {
    if (this.bookingFormGroup.valid) {
      console.log(this.keeperAppointments);
      this.addAppointment = {
        appointment_id: this.bookingFormGroup.value.appointment,
        keeper_id: this.keepId,
        owner_id: this.owner_Id,
        pet_id: this.bookingFormGroup.value.pet,
        // day: this.bookingFormGroup.value.appointment
      };

      this.keeperBookingService.addKeeperBooking(this.addAppointment).subscribe(
        (data: any) => {
          console.log(data);
          Swal.fire({
            title: 'Success!',
            text: 'Booking done successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            // Handle the result or perform additional actions
          });
        },
        (error: any) => {
          Swal.fire({
            title: 'Error!',
            text: `${error.error.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          }).then((result) => {
            // Handle the result or perform additional actions
          });
        }
      );
    } else {
      console.log('Please fill in all required fields.');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset > 100) {
      // Adjust the scroll threshold as needed
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  getStarClass(index: number): string {
    if (this.rating !== null && index <= this.rating) {
      return 'active';
    } else if (this.hoveredStar !== null && index <= this.hoveredStar) {
      return 'hover';
    } else {
      return '';
    }
  }

  hoverStar(index: number): void {
    this.hoveredStar = index;
  }

  unhoverStar(): void {
    this.hoveredStar = null;
  }

  rateStar(index: number): void {
    if (this.rating === index) {
      this.rating = null; // Unrate the star if it was already selected
    } else {
      this.rating = index; // Set the rating to the selected star index
    }
    const data = {
      owner_id: this.owner_Id,
      rate: index,
    };
    this.keeperService.updateKeeperRating(this.keepId, data).subscribe(
      (data: any) => {
        console.log(data);
        window.location.reload();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  staticRate(): void {
    this.keeperRating =
      this.keeperData.totalOfReviews / this.keeperData.numberOfReviews;
  }

  getStaticStarClass(index: number): string {
    if (this.keeperRating !== null && index <= this.keeperRating) {
      return 'active';
    } else {
      return '';
    }
  }
}
