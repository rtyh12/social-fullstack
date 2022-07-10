import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';

function timeDifference(current: number, previous: number) {
	var elapsed = current - previous;

	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	if (elapsed < msPerMinute) {
		return Math.round(elapsed / 1000) + 's';
	}
	else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + 'min';
	}
	else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + 'h';
	}
	else if (elapsed < msPerMonth) {
		return Math.round(elapsed / msPerDay) + 'd';
	}
	else if (elapsed < msPerYear) {
		return Math.round(elapsed / msPerMonth) + 'm';
	}
	else {
		return Math.round(elapsed / msPerYear) + 'y';
	}
}

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	@Input() post?: Post;
	@Input() last?: boolean;

	constructor() {	}

	createdTimeAgo(): String {
		var created_on = this.post?.created_on;
		if (created_on === undefined)
			return 'unknown time ago';
		var date = Math.round(new Date(created_on).getTime());
		return timeDifference(Date.now(), date);
	};

	ngOnInit(): void { }
}
