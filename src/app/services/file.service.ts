import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  db: Song[];

  constructor(private http: HttpClient) { }

  loadDb() {
    return this.http.get<Song[]>('../../assets/db.json');
  }
}
