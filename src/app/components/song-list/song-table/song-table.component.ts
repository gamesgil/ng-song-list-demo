import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { SongTableDataSource } from './song-table-datasource';
import { Song } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.css']
})
export class SongTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Song>;

  @Input() data: Song[];

  dataSource: SongTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];

  ngOnInit() {
    if (this.data.length) {
      for (const key in this.data[0]) {
        if (key) {
          this.displayedColumns.push(key);
        }
      }
    }

    console.log(this.displayedColumns)

    this.dataSource = new SongTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
