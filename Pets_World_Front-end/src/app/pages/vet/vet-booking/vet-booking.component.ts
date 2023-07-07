import { Component } from '@angular/core';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-vet-booking',
  templateUrl: './vet-booking.component.html',
  styleUrls: ['./vet-booking.component.css']
})
export class VetBookingComponent {
  currentDate = new Date();
  vetBookingData: any;
  vetId!: string;

  constructor(private authService: AuthService,
    private vetBookingService: VetBookingService) {
    this.vetId = authService.getVetId();
  }

  ngOnInit(): void {
    this.getVetBookingData(this.vetId);
  }

  getVetBookingData(id: string) {
    const filter = {
      vet_id: id,
      day: this.currentDate.toISOString().substring(0, 10)
    }
    this.vetBookingService.getVetSchedule(filter).subscribe(
      (data: any) => {
        this.vetBookingData = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.owner_id.user_id.image}`;
          return booking;
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getFormattedDate(): string {
    return this.currentDate.toISOString().substring(0, 10);
  }

  previousDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.getVetBookingData(this.vetId);
  }

  nextDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.getVetBookingData(this.vetId);

  }

}
