import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  constructor(private fileService: FileService, private songService: SongService) { }

  ngOnInit() {
  }

  load() {
    this.fileService.loadDb();
  }

  addSong() {
    this.songService.addSong({name: 'dummy', artist: 'me', genre: 'hip-hop', coverUrl: '', releaseDate: new Date().toISOString()});
  }

  get db() {
    return this.fileService.db;
  }

}
