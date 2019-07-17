import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/interfaces/song.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  list: Song[] = [];

  constructor(private fileService: FileService, public songService: SongService) { }

  ngOnInit() {
    this.songService.songs$.subscribe(songs => {
      this.list = songs.songs;
    });
  }

  load() {
    this.songService.loadSongs();
  }

  addSong() {
    this.songService.addSong({name: 'dummy', artist: 'me', genre: 'hip-hop', coverUrl: '', releaseDate: new Date().toISOString()});
  }
}
