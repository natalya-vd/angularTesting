import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private urlPosts = 'https://jsonplaceholder.typicode.com/posts'

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(this.urlPosts)
  }

  deletePost(post: Post) {
    return this.http.delete(`${this.urlPosts}/${post.id}`)
  }
}
