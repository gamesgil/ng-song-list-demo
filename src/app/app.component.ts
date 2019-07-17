import { Component } from '@angular/core';
import { LoaderInterceptor } from './services/http.interceptor';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'music';

  constructor(public loaderService: LoaderService) {

  }
}
