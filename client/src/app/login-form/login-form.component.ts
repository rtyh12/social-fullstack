import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    constructor(
		private http: HttpClient
	) { }

    formGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    onSubmit(): void {
        let value = this.formGroup.value;

		this.http.post(
			'api/get_token',
			{
				username: value.username,
				password: value.password
			})
			.subscribe({
				next: event => {
					console.log(event);
				},
				error: error => console.log(error),
				complete: () => console.log('complete'),
			});

        console.log(value);

		this.formGroup.reset();
    }

    ngOnInit(): void {
    }
}
