import { Injectable } from '@angular/core';
import { Post } from './post';
// import { mockPosts } from './mock-posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) { }

    fetch(): Observable<Post[]> {
        return this.http.get<Post[]>(
            environment.apiUrl + 'timeline',
            { withCredentials: true }
        );
    }
}
