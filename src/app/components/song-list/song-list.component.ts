import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  load() {
    this.fileService.loadDb();
  }

  get db() {
    return this.fileService.db;
  }

}
