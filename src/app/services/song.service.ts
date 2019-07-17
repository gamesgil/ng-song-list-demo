import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Song } from '../interfaces/song.interface';
import { AddSong } from '../state/actions/song.actions';
import { Observable } from 'rxjs';
import { SongState } from '../state/states/song.state';
// import {  } from '../state/actions/song.actions';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FileService } from './file.service';

@Injectable()
export class SongService {

  songs: Song[] = [];

  @Select(SongState) songs$: Observable<any>;

  constructor(private store: Store, private fileService: FileService) {
  }

  addSong({name, artist, genre, coverUrl, releaseDate}) {
    const song = new Song();

    song.name = name;
    song.artist = artist;
    song.genre = genre;
    song.coverUrl = coverUrl;
    song.releaseDate = releaseDate;

    this.store.dispatch(new AddSong(song));
  }

  songExists(name: string) {
    console.log(this.songs$);
  }

  loadSongs() {
    this.fileService.loadDb().subscribe(songs => songs.forEach(song => this.addSong(song)));
  }

}
