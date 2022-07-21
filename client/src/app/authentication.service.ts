import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public loggedIn = false;
    constructor(private http: HttpClient) { }

    // Sends token as cookie
    checkTokenValidRequest
        = this.http.get(
            '/api/auth/check_token_valid',
            { observe: 'response' }
        );

    checkIfLoggedIn(): void {
        this.checkTokenValidRequest.subscribe(response => {
            console.log(response.status);
            this.loggedIn = true;
        });
    }

    ngOnInit(): void {

    }
}
