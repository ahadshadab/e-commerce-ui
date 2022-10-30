import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modal/user';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  @Input()
  user!: User

  @Output()
  userDeleteEvent = new  EventEmitter();
  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit() {
  }

  deleteUser() {
    this.httpClientService.deleteUser(this.user.id).subscribe(
      (user) => {
        this.userDeleteEvent.emit();
        // this.router.navigate(['admin', 'users']);
      }
    );
  }

}
