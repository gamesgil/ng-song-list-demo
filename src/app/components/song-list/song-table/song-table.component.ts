import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Song } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.css']
})
export class SongTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<Song>;

  @Output() removeSong: EventEmitter<string> = new EventEmitter();

  dataSource: MatTableDataSource<Song> = new MatTableDataSource();

  displayedColumns = ['name', 'artist', 'genre', 'coverUrl', 'releaseDate', 'delete', 'edit'];

  @Input() set data(data: Song[]) {
    this.dataSource.data = data;
  }

  constructor() {}

  ngOnInit() {
  }

  onRemoveSong(name) {
    this.removeSong.emit(name);
  }
}
