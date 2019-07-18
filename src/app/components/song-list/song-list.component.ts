import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/interfaces/song.interface';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteComponent } from '../dialog/confirm/confirm-dialog.component';
import { EditDialogComponent } from '../dialog/edit/edit-dialog.component';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  list: Song[] = [];

  constructor(public songService: SongService, private dialogService: MatDialog) { }

  ngOnInit() {
    this.songService.songs$.subscribe(songs => {
      this.list = songs.songs;
    });
  }

  load() {
    this.songService.loadSongs();
  }

  addSong() {
    this.songService.addSong({name: 'Elektronik Supersonik', artist: 'Zlad!', genre: 'hip-hop',
      coverUrl: 'https://www.youtube.com/watch?v=MNyG-xu-7SQ', releaseDate: 'Mar 14, 2013'});
  }

  onRemoveSong(name) {
    const dialogRef = this.dialogService.open(ConfirmDeleteComponent, {
      width: '250px',
      data: {name: 'test name'}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.result === true) {
        this.songService.removeSong(name);
      }
    });
  }

  onEditSong(name) {
    const song = this.list.find(song => song.name === name)

    const dialogRef = this.dialogService.open(EditDialogComponent, {
      width: '500px',
      data: song
    });


    dialogRef.afterClosed().subscribe(data => {
      if (data.name) {
        this.songService.editSong(song, data);
      }
    });
  }
}

