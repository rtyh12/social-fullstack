import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-new-post-form',
	templateUrl: './new-post-form.component.html',
	styleUrls: ['./new-post-form.component.scss']
})
export class NewPostFormComponent {
	constructor(
		private http: HttpClient
	) { }

	handleErrorObservable(err: any, caught: Observable<Object>): Observable<Object> {
		console.log(err);
		return caught;
	}

	formGroup = new FormGroup({
		content: new FormControl(''),
	});

	onSubmit(): void {
		let value = this.formGroup.value;

		this.http.post(
			'api/newpost',
			{
				content: value.content
			})
			.subscribe({
				next: event => {},
				error: error => console.log(error),
				complete: () => {},
			});

		this.formGroup.reset();
	}
}