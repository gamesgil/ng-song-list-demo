import { Component, OnInit, Inject } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/interfaces/song.interface';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    this.songService.addSong({name: 'dummy', artist: 'me', genre: 'hip-hop', coverUrl: '', releaseDate: new Date().toISOString()});
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
}

@Component({
  selector: 'app-confirm-delete-dialog',
  template: `
    <h1>Are You Sure</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="{result: false}" cdkFocusInitial>No Thanks</button>
      <button mat-button (click)="onNoClick()">Ok</button>
    </div>
    `,
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick() {
      this.dialogRef.close({result: true});
    }
}
