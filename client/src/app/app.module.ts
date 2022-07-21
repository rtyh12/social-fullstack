import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NewPostFormComponent } from './new-post-form/new-post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TimelinePageComponent } from './timeline-page/timeline-page.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        TimelineComponent,
        NewPostFormComponent,
        NavbarComponent,
        LoginFormComponent,
        TimelinePageComponent,
        SignupFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: TimelinePageComponent },
            { path: 'login', component: LoginFormComponent },
            { path: 'signup', component: SignupFormComponent },
            // { path: 'products/:productId', component: ProductDetailsComponent },
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
