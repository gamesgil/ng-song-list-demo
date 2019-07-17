import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { SongTableDataSource } from './song-table-datasource';
import { Song } from 'src/app/interfaces/song.interface';
import { Observable } from 'rxjs';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.css']
})
export class SongTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Song>;

  dataSource: MatTableDataSource<Song> = new MatTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'artist', 'genre', 'coverUrl', 'releaseDate'];

  @Input() set data(data: Song[]) {
    this.dataSource.data = data;
  }

  constructor(private songService: SongService) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    /* this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource; */
  }
}
