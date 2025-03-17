import { UsersService } from './../../Services/users.service';
import { Component, OnInit } from '@angular/core';
import { IPagedResponse } from 'src/app/core/interfaces/ipaged-response';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ViewUserComponent } from '../view-user/view-user.component';
import { User } from '../../interfaces/user-dto';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  usersResponse!: IPagedResponse<User>;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    
    let paginationRequest: any = {
      pageNumber: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.userService.get(paginationRequest).subscribe({
      next: (res) => {
        this.usersResponse = res;
        this.length = res.totalNumberOfRecords; 
      },
      error: (err) => {
        this.toastr.error(
          err?.error?.message || 'Failed to load users',
          'Error'
        );
      },
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories(); 
  }

  openViewUserDialog(_user: User): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '50%',
      minWidth: '350px',
      data: _user,
    });
  }

 

  openDeleteUserDialog(_user: User): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '50%',
      minWidth: '350px',
      data: { elementType: 'User', elementName: _user.userName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.elementName) {
        this.deleteUser(_user.id);
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.delete(id).subscribe({
      next: () => {
        this.toastr.success('user deleted successfully', 'Success');
        this.loadCategories(); 
      },
      error: (err) => {
        this.toastr.error(
          err?.error?.message || 'Error deleting user',
          'Error'
        );
      },
    });
  }
}
