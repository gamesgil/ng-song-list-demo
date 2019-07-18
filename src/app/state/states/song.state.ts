import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Song} from '../../interfaces/song.interface';
import { AddSong, RemoveSong, GetSongs, UpdateSong } from '../actions/song.actions';
import { patch, updateItem } from '@ngxs/store/operators';

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

  @Action(UpdateSong)
  updateSong({getState, setState}: StateContext<SongStateModel>, {payload}: UpdateSong) {
    const state = getState();

    setState(
      patch({
        songs: updateItem<Song>(song => {
          return song.name === payload.prev.name
        }, payload.next)
      })
    )
  }

  @Action(GetSongs)
  get({getState}: StateContext<SongStateModel>) {
    return getState();
  }

}







