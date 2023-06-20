import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { PostsEntity } from '../state/posts.models';
import { posts } from './posts';

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {
    getPosts(): Observable<PostsEntity[]> {
        return of(posts)
    }
}