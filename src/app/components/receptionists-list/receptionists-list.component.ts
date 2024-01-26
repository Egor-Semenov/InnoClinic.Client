import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ReceptionistsListDataSource, ReceptionistsListItem } from './receptionists-list-datasource';

@Component({
  selector: 'app-receptionists-list',
  templateUrl: './receptionists-list.component.html',
  styleUrls: ['./receptionists-list.component.css']
})
export class ReceptionistsListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ReceptionistsListItem>;
  dataSource: ReceptionistsListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'lastname', 'delete'];

  constructor() {
    this.dataSource = new ReceptionistsListDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
