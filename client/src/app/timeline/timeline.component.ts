import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
    posts: Post[] = [];
    
    constructor(public postsService: PostsService) { }

    fetchPosts(): void {
        this.postsService.fetch()
            .subscribe(posts => this.posts = posts);
    };
    
    ngOnInit(): void {
        this.fetchPosts();
    }
}
