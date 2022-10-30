import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/modal/user';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = [];
  selectedUser: User;
  action: string = '';
  
  constructor(private httpClientService: HttpClientService,private router: Router, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.url.subscribe(params=>{
      this.action = params[0].path;
      // const selectedUserId = params['id'];
      //   if (selectedUserId) {
      //     this.selectedUser = this.users.find(user => user.id === +selectedUserId);
      //   }
    });
  }
  ngOnInit(): void {
    this.httpClientService.getUsers().subscribe(
      response=>this.handleSuccessfulResponse(response)
    );
    this.refreshData();
  }
  viewUser(id: number) {
  this.action = 'view';
  this.selectedUser = this.users.find(user => user.id === +id);
  // this.router.navigate(['admin','users'], {queryParams : {id, action: 'view'}});
  }
  handleSuccessfulResponse(response: User[]): void {
    this.users = response;
  }
  addUser() {
    this.selectedUser = new User();
    this.action = 'add';
  }
  refreshData() {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action']
      }
    );
    const selectedUserId = this.activatedRoute.snapshot.params['id'];
    if (selectedUserId) {
      this.selectedUser = this.users.find(user => user.id === +selectedUserId);
    }

  }

  

}
