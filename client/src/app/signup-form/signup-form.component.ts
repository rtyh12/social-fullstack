import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup-form',
	templateUrl: './signup-form.component.html',
	styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
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
				'api/auth/create_account',
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
