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

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SongState } from './state/states/song.state';
import { SongService } from './services/song.service';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongTableComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    NgxsModule.forRoot([SongState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()

  ],
  providers: [
    FileService,
    SongService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

