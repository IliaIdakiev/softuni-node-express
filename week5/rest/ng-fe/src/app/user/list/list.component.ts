import { Component, OnInit } from '@angular/core';
import { UserListModel } from '../+store/models/list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users$ = this.userListModel.users$;
  isLoaded$ = this.userListModel.isLoaded$;

  constructor(
    private userListModel: UserListModel,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userListModel.loadUsers();
  }

  deleteUser(id: string) {
    this.http.delete(`http://localhost:8080/api/user/${id}`, { withCredentials: true })
      .subscribe({
        next: () => {
          this.userListModel.loadUsers();
        },
        error: err => console.error(err)
      });
  }
}
