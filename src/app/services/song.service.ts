import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Song } from '../interfaces/song.interface';
import { AddSong } from '../state/actions/song.actions';

@Injectable()
export class SongService {

  constructor(private store: Store) { }

  addSong({name, artist, genre, coverUrl, releaseDate}) {
    const song = new Song();

    song.name = name;
    song.artist = artist;
    song.genre = genre;
    song.coverUrl = coverUrl;
    song.releaseDate = releaseDate;

    this.store.dispatch(new AddSong(song));
  }

}
