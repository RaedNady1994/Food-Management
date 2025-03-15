import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


let declarationsArray = [SidebarComponent, NavbarComponent, DeleteItemComponent, SpinnerComponent];
let importsArray = [
  MatIconModule,
  MatMenuModule,
  MatButtonModule, 
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  CommonModule,
  RouterModule,
  FormsModule,
  MatPaginatorModule,
  MatSelectModule,
  MatOptionModule,
  NgxDropzoneModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: declarationsArray,
  imports: importsArray,
  exports: [...declarationsArray, ...importsArray],
})
export class SharedModule {}
