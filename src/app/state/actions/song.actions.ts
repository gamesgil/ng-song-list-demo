import { Song } from 'src/app/interfaces/song.interface';

export class AddSong {
  static readonly type = '[SONG] Add';

  constructor(public payload: Song) {

  }
}

export class RemoveSong {
  static readonly type = '[SONG] Remove';

  constructor(public payload: string) {

  }
}

export class GetSongs {
  static readonly type = '[SONG] Get Songs';

  constructor() {}
}

export class UpdateSong {
  static readonly type = '[SONG] Update Song';

  constructor(public payload: {prev: Song, next: Song}) {}
}

