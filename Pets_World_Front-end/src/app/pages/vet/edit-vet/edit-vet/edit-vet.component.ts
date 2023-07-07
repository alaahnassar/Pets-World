import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { EditVetService } from 'src/app/core/services/vet/editVet/edit-vet.service';

@Component({
  selector: 'app-edit-vet',
  templateUrl: './edit-vet.component.html',
  styleUrls: ['./edit-vet.component.css'],
})
export class EditVetComponent implements OnInit {
  vet: any = {}; // Object to store vet data
  vetId!: any; // Replace with the actual vet ID
  vetImage: any;

  constructor(
    private vetService: EditVetService,
    private authService: AuthService
  ) {
    this.vetId = authService.getVetId();
  }

  ngOnInit(): void {
    this.getVetData(this.vetId);
  }

  getVetData(id: string) {
    this.vetService.getVetById(id).subscribe(
      (data: any) => {
        this.vet = data;
        this.vetImage = `${API_URL}/${this.vet.user_id.image}`;
        console.log(this.vet);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onUserImageClick(event: MouseEvent): void {
    event.preventDefault();
    const hiddenInput = document.querySelector('input[type="file"]');
    hiddenInput?.dispatchEvent(new MouseEvent('click'));
  }

  onUserImageChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileName = file.name;
      this.vetImage = fileName;

      // Read the image file and display it preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vetImage = e.target.result;
      };
      reader.readAsDataURL(file);
      this.vet.user_id.image = file;
    } else {
      this.vetImage = ''; // Clear the image preview
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.vetId);
    formData.append('firstName', this.vet.user_id.firstName);
    formData.append('lastName', this.vet.user_id.lastName);
    formData.append('phone', this.vet.user_id.phone);
    formData.append('gender', this.vet.user_id.gender);
    formData.append('experience', this.vet.experience);
    formData.append('cost', this.vet.cost);
    formData.append('address', this.vet.address);
    formData.append('description', this.vet.description);
    formData.append('image', this.vet.user_id.image);

    this.vetService.updateVetById(formData).subscribe(
      (res) => {
        // Handle response from the backend
        window.location.reload();
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }
}
