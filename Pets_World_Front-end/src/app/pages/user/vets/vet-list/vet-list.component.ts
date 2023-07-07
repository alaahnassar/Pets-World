import { Component, OnInit } from '@angular/core';
import { VetService } from 'src/app/core/services/vet/vetService/vet.service';
import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Vet } from "../../../vet/models/Vet";
import { PageEvent } from "@angular/material/paginator";
import { API_URL } from 'src/app/core/services/environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css'],
})

export class VetListComponent implements OnInit {

  vets: Vet[] = [];
  pagedVets: Vet[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(public vetAPis: VetService,
    private router: Router,
    private titleService: Title) { }
  ngOnInit(): void {
    this.titleService.setTitle('Vets Home');
    this.getAllData()
  }

  getAllData(): void {
    this.vetAPis.getAllVets().subscribe((data: any) => {
      this.vets = data;
      this.vets.map((vet: Vet) => {
        vet.userImage = `${API_URL}/${vet.user_id.image}`;
      })
      this.updatePagedVets();
    })
  }

  viewVet(vet: Vet) {
    this.router.navigate(['user', 'vets', 'details', vet._id]);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedVets();
  }

  updatePagedVets() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedVets = this.vets?.slice(startIndex, endIndex);
  }
}
