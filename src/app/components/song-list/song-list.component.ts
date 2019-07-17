import { Component, OnInit, Inject } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/interfaces/song.interface';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

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

  onEditSong(name) {
    const dialogRef = this.dialogService.open(EditDialogComponent, {
      width: '250px',
      data: {name: 'test name'}
    });

    dialogRef.afterClosed().subscribe(data => {

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

@Component({
  selector: 'app-edit-dialog',
  template: `
    <h1>EDIT</h1>
    <div class="example-container">
      <mat-form-field>
        <input matInput placeholder="Name" [formControl]="name" required>
        <mat-error *ngIf="name.invalid">{{getNameErrorMessage()}}</mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Artist" [formControl]="artist" required>
        <mat-error *ngIf="artist.invalid">{{getArtistErrorMessage()}}</mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="URL" [formControl]="coverUrl" required>
        <mat-error *ngIf="coverUrl.invalid">{{getUrlErrorMessage()}}</mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-select placeholder="Select">
          <mat-option *ngFor="let option of songService.genres; let i = index" value="{{i}}">{{ option }} / {{ i }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <input matInput [matDatepicker]="picker" placeholder="Choose a date">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <button mat-button mat-raised-button color="primary">Confirm</button>

    </div>
  `,
  styles: [`
    .example-container {
      display: flex;
      flex-direction: column;
    }

    .example-container > * {
      width: 100%;
    }
  `]
})

export class EditDialogComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.nullValidator]);
  artist = new FormControl('', [Validators.required, Validators.nullValidator]);
  coverUrl = new FormControl('', [Validators.required, Validators.nullValidator,
    Validators.pattern(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm)]
      );

  constructor(
    public songService: SongService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() { }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name required' : '';
  }

  getArtistErrorMessage() {
    return this.artist.hasError('required') ? 'Artist required' : '';
  }

  getUrlErrorMessage() {
    return this.coverUrl.hasError('required') ? 'URL Required' :
      this.coverUrl.hasError('pattern') ? 'Not a valid URL' : '';
  }
}
