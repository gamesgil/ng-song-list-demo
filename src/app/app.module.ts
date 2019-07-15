import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileService } from './services/file.service';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongTableComponent } from './components/song-list/song-table/song-table.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongTableComponent,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule

  ],
  providers: [
    FileService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

