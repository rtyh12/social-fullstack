import { Injectable } from '@angular/core';
import { Post } from './post';
// import { mockPosts } from './mock-posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) { }

    private apiUrlRoot = "api";

    fetch(): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrlRoot + '/timeline');
    }
}
