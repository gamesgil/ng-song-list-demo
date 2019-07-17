import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileService } from './services/file.service';
import { SongListComponent, ConfirmDeleteComponent, EditDialogComponent } from './components/song-list/song-list.component';
import { SongTableComponent } from './components/song-list/song-table/song-table.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatSnackBarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatFormFieldControl, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CapitalizePipe } from './pipes/capitalize.pipe';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SongState } from './state/states/song.state';
import { SongService } from './services/song.service';
import { LoaderInterceptor } from './services/http.interceptor';
import { LoaderService } from './services/loader.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongTableComponent,
    ConfirmDeleteComponent,
    EditDialogComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
  entryComponents: [ConfirmDeleteComponent, EditDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

