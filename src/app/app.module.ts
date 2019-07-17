import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileService } from './services/file.service';
import { SongListComponent, ConfirmDeleteComponent } from './components/song-list/song-list.component';
import { SongTableComponent } from './components/song-list/song-table/song-table.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatSnackBarModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { CapitalizePipe } from './pipes/capitalize.pipe';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SongState } from './state/states/song.state';
import { SongService } from './services/song.service';
import { LoaderInterceptor } from './services/http.interceptor';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongTableComponent,
    ConfirmDeleteComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    NgxsModule.forRoot([SongState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()

  ],
  providers: [
    FileService,
    SongService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
],
  entryComponents: [ConfirmDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

