import { of } from "rxjs"
import { TestBed } from "@angular/core/testing"

import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"
import { PostService } from "src/app/services/post/post.service"

class MockPostService {
  getPosts() {}

  deletePost(post: Post) {
    return of(true)
  }
}

describe('PostsComponent', () => {
  let posts: Post[]
  let component: PostsComponent
  let postService: any

  beforeEach(() => {
    posts = [
      {
        id: 1,
        title: 'title 1',
        body: 'body 1'
      },
      {
        id: 2,
        title: 'title 2',
        body: 'body 2'
      },
      {
        id: 3,
        title: 'title 3',
        body: 'body 3'
      },
    ]

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        {provide: PostService, useClass: MockPostService}
      ]
    })

    component = TestBed.inject(PostsComponent)
    postService = TestBed.inject(PostService)
  })

  describe('deletePost()', () => {
    beforeEach(() => {
      component.posts = posts
    })

    it('should delete the selected post from the posts', () => {
      component.deletePost(posts[1])

      expect(component.posts.length).toBe(2)
    })

    it('should delete the actual selected post in posts', () => {
      component.deletePost(posts[1])

      for(const post of component.posts) {
        expect(post).not.toEqual(posts[1])
      }
    })

    it('should call the delete method in PostsService once', () => {
      spyOn(postService, 'deletePost').and.callThrough()
      component.deletePost(posts[1])

      expect(postService.deletePost).toHaveBeenCalledTimes(1)
    })
  })
})
