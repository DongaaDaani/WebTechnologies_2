import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/domain/auth/current-user/current-user.service';
import { AuthService } from 'src/app/services/domain/auth/user.service';
import { UserDTO } from 'src/app/services/domain/auth/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailPattern = '[A-Za-z0-9_=]+([-+.\'][A-Za-z0-9_=]+)*@[A-Za-z0-9_]+([-.][A-Za-z0-9_]+)*\\.[A-Za-z0-9_]+([-.][A-Za-z0-9_]+)*';
  loginGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });
  user: UserDTO;
  constructor(
    private authService: AuthService,
    private router: Router,
    private currentUserService: CurrentUserService,

  ) { }

  ngOnInit(): void {
  }
  login() {

    this.user = {
      email: this.loginGroup.get('email').value,
      password: this.loginGroup.get('password').value,
    };
    this.authService.login(this.user.email, this.user.password).subscribe((res) => {
      if (res == null) {
        this.loginGroup.reset();
      } else {
        sessionStorage.clear();
        this.currentUserService.create({ email: this.user.email, role: 1 });
        this.router.navigate(['car', 'cars']);
      }

    });

  }
  navigateBack() {
    this.router.navigate(['../']);
  }
  navigateRegister() {
    this.router.navigate(['register']);
  }
}
