import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Song} from '../../interfaces/song.interface';
import { AddSong, RemoveSong, GetSongs } from '../actions/song.actions';

export class SongStateModel {
  songs: Song[];
}

@State<SongStateModel>({
  name: 'songs',
  defaults: {
    songs: []
  }
})
export class SongState {
  @Selector()
  static getSongs(state: SongStateModel) {
    return state.songs;
  }

  @Action(AddSong)
  add({getState, patchState}: StateContext<SongStateModel>, {payload}: AddSong) {
    const state = getState();

    if (state.songs && !state.songs.find(song => song.name === payload.name)) {
      patchState({
        songs: [...state.songs, payload]
      });
    }
  }

  @Action(RemoveSong)
  remove({getState, patchState}: StateContext<SongStateModel>, {payload}: RemoveSong) {
    patchState({
      songs: getState().songs.filter(song => song.name !== payload)
    });
  }

  @Action(GetSongs)
  get({getState}: StateContext<SongStateModel>) {
    return getState();
  }
}







