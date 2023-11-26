import { of } from "rxjs"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core"

import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"
import { PostService } from "src/app/services/post/post.service"

// class MockPostService {
//   getPosts() {}

//   deletePost(post: Post) {
//     return of(true)
//   }
// }

describe('PostsComponent', () => {
  let posts: Post[]
  let component: PostsComponent
  let fixture: ComponentFixture<PostsComponent>
  let mockPostService: any

  @Component({
    selector: 'app-post',
    template: '<div></div>'
  })
  class FakePostComponent {
    @Input() post!: Post
  }

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
    // mockPostService = jasmine.createSpyObj({getPosts: of(posts), deletePost: of(true)})
    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost'])

    TestBed.configureTestingModule({
      declarations: [PostsComponent, FakePostComponent],
      providers: [
        {provide: PostService, useValue: mockPostService}
      ]
    })

    fixture = TestBed.createComponent(PostsComponent)
    component = fixture.componentInstance
  })

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(posts))
    fixture.detectChanges()

    expect(component.posts.length).toBe(3)
  })

  describe('deletePost()', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true))
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
      component.deletePost(posts[1])

      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1)
    })
  })
})
