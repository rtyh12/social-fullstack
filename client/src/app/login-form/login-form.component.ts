import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
	constructor(
		private http: HttpClient,
		private auth: AuthenticationService,
		private router: Router
	) { }

	formGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
	});

	onSubmit(): void {
		let value = this.formGroup.value;

		this.http
			.post(
				'api/auth/get_token',
				{ username: value.username, password: value.password },
				{ responseType: 'text' },
			)
			.subscribe({
				next: event => {
					// server says authorization was correct; token cookie should have been set
					this.auth.loggedIn = true;
					this.router.navigate(['/']);
				},
				error: error => console.log(error),
				complete: () => {},
			});

		this.formGroup.reset();
	}

	ngOnInit(): void {
	}
}
