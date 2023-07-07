import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Keeper } from '../../keeper/models/Keeper';
import { KeeperService } from '../../../../core/services/user/keeper/keeperService/keeper.service';
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
@Component({
  selector: 'app-home',
  templateUrl: './keeper-list.component.html',
  styleUrls: ['./keeper-list.component.css'],
})
export class KeeperListComponent implements OnInit {

  keepers: Keeper[] = [];
  pagedKeepers: Keeper[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  ownerId!: string;
  userImage!: string;

  constructor(private titleService: Title,
    private router: Router,
    public keeperApis: KeeperService,
    private authService: AuthService) {
    this.titleService.setTitle('Keeper Home');
    this.ownerId = authService.getOwnerId();
  }

  ngOnInit(): void {
    this.getAllKeeper();
  }

  getAllKeeper(): void {
    this.keeperApis.geAlltKeepers({ id: this.ownerId }).subscribe((data) => {
      this.keepers = data as Keeper[];
      this.updatePagedVets();
      this.keepers.map((keeper: Keeper) => {
        keeper.userImage = `${API_URL}/${keeper.owner_id.user_id.image}`;
      })
      console.log(this.keepers)
    });
  }

  viewKeeper(keeper: any) {
    this.router.navigate(['user', 'keepers', 'details', keeper._id]);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedVets();
  }

  updatePagedVets() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedKeepers = this.keepers?.slice(startIndex, endIndex);
  }
}
