import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { EditOwnerService } from 'src/app/core/services/user/editOwner/edit-owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css'],
})
export class EditOwnerComponent implements OnInit {
  owner: any = {}; // Object to store owner data
  ownerId!: any; // Replace with the actual owner ID
  ownerImage: any;
  keeper: any = {};
  isKeeper: boolean = false;

  constructor(private ownerService: EditOwnerService,
    private authService: AuthService) {
    this.ownerId = authService.getOwnerId();
  }

  ngOnInit(): void {
    this.getOwnerData(this.ownerId);
  }

  getOwnerData(id: string) {
    this.ownerService.getOwnerById(id).subscribe(
      (data: any) => {
        console.log(data);
        this.owner = data.owner;
        if (data.keeper) {
          this.keeper = data.keeper;
          this.isKeeper = true;
        }
        this.ownerImage = `${API_URL}/${this.owner.user_id.image}`;
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
      this.ownerImage = fileName;

      // Read the image file and display it preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.ownerImage = e.target.result;
      };
      reader.readAsDataURL(file);
      this.owner.user_id.image = file;
    } else {
      this.ownerImage = ''; // Clear the image preview
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.ownerId);
    formData.append('isKeeper', this.owner.isKeeper);
    formData.append('firstName', this.owner.user_id.firstName);
    formData.append('lastName', this.owner.user_id.lastName);
    formData.append('phone', this.owner.user_id.phone);
    formData.append('gender', this.owner.user_id.gender);
    formData.append('experience', this.keeper.experience);
    formData.append('cost', this.keeper.cost);
    formData.append('address', this.keeper.address);
    formData.append('description', this.keeper.description);
    formData.append('image', this.owner.user_id.image);
    console.log(this.isKeeper)
    if (this.isKeeper !== this.owner.isKeeper) {
      Swal.fire({
        title: 'A keeper!',
        text: "You will have to login again.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateOwnerData(formData)
          this.authService.logout();
          window.location.reload();
        }
      })
    } else {
      this.updateOwnerData(formData);
      window.location.reload();
    }
  }

  updateOwnerData(formData: any) {
    this.ownerService.updateOwnerById(formData).subscribe(
      (res) => {
        console.log(res)
        // Handle response from the backend
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }
}
