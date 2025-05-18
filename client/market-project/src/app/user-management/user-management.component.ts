import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  users!: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router  
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    })
  }


    deleteUser(id: string) {
      
      

       this.userService.delete(id).subscribe({
            next: (data) => {
              console.log(data);
              
              this.users = [...this.users];
              console.log('User deleted successfully.');
              this.router.navigateByUrl('/user-management');
              
            }, error: (err) => {
              console.log(err);
            }
          });

  }
}

