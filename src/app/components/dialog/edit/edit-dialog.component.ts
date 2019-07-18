import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})

export class EditDialogComponent implements OnInit {
  name = new FormControl(this.data.name, [Validators.required, Validators.nullValidator]);
  artist = new FormControl(this.data.artist, [Validators.required, Validators.nullValidator]);
  coverUrl = new FormControl(this.data.coverUrl, [Validators.required, Validators.nullValidator,
    Validators.pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
      )]);
  genre = new FormControl(this.data.genre || this.songService.genres[0], [Validators.required, Validators.nullValidator]);
  date = new FormControl(this.data.releaseDate, [Validators.required, Validators.nullValidator]);

  constructor(
    public songService: SongService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data);
  }

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

  formatDate(date: string) {
    const result = new Date(date);

    return result;
  }

  onConfirm() {
    const result = this.getNameErrorMessage() + this.getArtistErrorMessage() + this.getUrlErrorMessage();

    if (result === '') {
      this.dialogRef.close({
        name: this.name.value,
        artist: this.artist.value,
        genre: this.genre.value,
        coverUrl: this.coverUrl.value,
        releaseDate: new Date(this.date.value).toDateString()
      });
    }
  }

  close() {
    this.dialogRef.close({});
  }
}
