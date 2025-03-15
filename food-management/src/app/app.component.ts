import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements AfterViewInit {
  title = 'food-management';
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
   this.loaderService.isLoading$.subscribe(loading => {
      this.isLoading = loading;

      this.cdr.detectChanges();
    });
  }
}
