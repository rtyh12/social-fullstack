import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
	selector: 'app-new-post-form',
	templateUrl: './new-post-form.component.html',
	styleUrls: ['./new-post-form.component.scss']
})
export class NewPostFormComponent {
	newPostForm = this.formBuilder.group({
		author: '',
		content: ''
	});

	constructor(
		private formBuilder: FormBuilder,
	) { }

	onSubmit(): void {
		console.warn('yes');
		this.newPostForm.reset();
	}
}