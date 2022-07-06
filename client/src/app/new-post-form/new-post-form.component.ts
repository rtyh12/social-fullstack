import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';


@Component({
	selector: 'app-new-post-form',
	templateUrl: './new-post-form.component.html',
	styleUrls: ['./new-post-form.component.scss']
})
export class NewPostFormComponent {
	// newPostForm = this.formBuilder.group({
	// 	author: '',
	// 	content: ''
	// });
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient
	) { }

	handleErrorObservable(err: any, caught: Observable<Object>): Observable<Object> {
		console.log(err);
		return caught;
	}

	formGroup = new FormGroup({
		author: new FormControl(''),
		content: new FormControl(''),
	});

	onSubmit(): void {
		let value = this.formGroup.value;

		// this.http.post(
		// 	`api/newpost`,
		// 	// `${environment.apiUrl}/newpost`,
		// 	{
		// 		author: value.author,
		// 		content: value.content
		// 	}
		// );

		this.http.post(
			'api/newpost',
			{
				author: value.author,
				content: value.content
			})
			.subscribe({
				next: event => {
					console.log(event);
				},
				error: error => console.log(error),
				complete: () => console.log('complete'),
			});

		this.formGroup.reset();
	}
}