import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  db: Song[];

  constructor(private http: HttpClient) { }

  loadDb() {
    this.http.get<Song[]>('../../assets/db.json').subscribe(songs => this.db = songs);
  }
}
