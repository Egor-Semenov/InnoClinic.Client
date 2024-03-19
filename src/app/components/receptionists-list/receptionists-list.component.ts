import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map, merge, startWith, switchMap } from 'rxjs';
import { ReceptionistParameters } from 'src/app/models/receptionists/ReceptinistsParameters';
import { Receptionist } from 'src/app/models/receptionists/Receptionist';
import { UserProfilesService } from 'src/app/services/user-profiles.service';

@Component({
  selector: 'app-receptionists-list',
  templateUrl: './receptionists-list.component.html',
  styleUrls: ['./receptionists-list.component.css'],
  providers: [UserProfilesService]
})
export class ReceptionistsListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource = new MatTableDataSource<Receptionist>();
  displayedColumns = ['id', 'firstname', 'lastname', 'email'];
  isLoadingResults = true;
  searchTerm: string = "";
  officeIdFilterValue!: number;
  resultsLength: number = 0;

  constructor(private userProvilesService: UserProfilesService) {}

  ngAfterViewInit(): void {
    this.initTable();
  }

  initTable() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userProvilesService.getReceptionists(new ReceptionistParameters
            (
              this.officeIdFilterValue,
              this.searchTerm,
              this.paginator.pageIndex + 1,
              this.paginator.pageSize
              ))
        }),
        map(data => {
          this.isLoadingResults = false;
          if (data === null) {
            return [];
          }
          console.log(data);
          this.resultsLength = JSON.parse(data.headers.get("X-Pagination")!).TotalCount
          return data.body!;
        })
      ).subscribe(data => this.dataSource.data = data)
  }
}
