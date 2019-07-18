import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Song } from '../interfaces/song.interface';
import { AddSong, RemoveSong, UpdateSong } from '../state/actions/song.actions';
import { Observable } from 'rxjs';
import { SongState } from '../state/states/song.state';
// import {  } from '../state/actions/song.actions';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FileService } from './file.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SongService {

  readonly genres = ['pop', 'rap', 'hip-hop', 'alternative', 'rock'];

  @Select(SongState) songs$: Observable<any>;

  constructor(private store: Store, private fileService: FileService, private snackbar: MatSnackBar) {
  }

  addSong({name, artist, genre, coverUrl, releaseDate}) {
    const song = new Song();

    song.name = name;
    song.artist = artist;
    song.genre = genre;
    song.coverUrl = coverUrl;
    song.releaseDate = releaseDate;

    const numOfSongs = this.store.snapshot().songs.songs.length;

    this.store.dispatch(new AddSong(song)).subscribe(val => {
      if (numOfSongs === val.songs.songs.length) {
        this.snackbar.open('Song exists!', null, {duration: 1000});
      }
    });
  }

  loadSongs() {
    this.fileService.loadDb().subscribe(songs => songs.forEach(song => this.addSong(song)));
  }

  editSong(prev: Song, next: Song) {
    this.store.dispatch(new UpdateSong({prev, next}));
  }

  removeSong(name) {
    this.store.dispatch(new RemoveSong(name));
  }

}
