import { of } from "rxjs"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from "@angular/core"

import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"
import { PostService } from "src/app/services/post/post.service"
import { By } from "@angular/platform-browser"
import { PostComponent } from "../post/post.component"

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

  // @Component({
  //   selector: 'app-post',
  //   template: '<div></div>'
  // })
  // class FakePostComponent {
  //   @Input() post!: Post
  // }

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
      declarations: [PostsComponent, PostComponent],
      providers: [
        {provide: PostService, useValue: mockPostService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(PostsComponent)
    component = fixture.componentInstance
  })

  it('should create exact same number of PostComponent with posts', () => {
    mockPostService.getPosts.and.returnValue(of(posts))
    fixture.detectChanges()

    // By.directive - получить компонент angular
    const postComponent = fixture.debugElement.queryAll(By.directive(PostComponent))

    expect(postComponent.length).toBe(posts.length)
  })

  it('should check whether exact post is sending to PostComponent', () => {
    mockPostService.getPosts.and.returnValue(of(posts))
    fixture.detectChanges()
    const postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent))

    for(let i = 0; i < postComponentDes.length; i++) {
      const postComponentInstance = postComponentDes[i].componentInstance as PostComponent

      expect(postComponentInstance.post.title).toEqual(posts[i].title)
    }
  })

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(posts))
    fixture.detectChanges()

    expect(component.posts.length).toBe(3)
  })

  it('should create one post child element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(posts))
    fixture.detectChanges()

    const debugElement: DebugElement = fixture.debugElement
    const postElement = debugElement.queryAll(By.css('.posts'))

    expect(postElement.length).toBe(posts.length)
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

    // Почему-то не работает...
    xit('should call delete method when postComponent button is clicked', () => {
      spyOn(component, 'deletePost')
      mockPostService.getPosts.and.returnValue(of(posts))
      //ngOnInit()
      fixture.detectChanges()

      const postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent))
      for(let i = 0; i < postComponentDes.length; i++) {
        postComponentDes[i].query(By.css('button')).triggerEventHandler('click', {preventDefault: () => {}})

        expect(component.deletePost).toHaveBeenCalledWith(posts[i])
      }

    })

    it('should call the delete method when the delete event is emitted in PostComponent', () => {
      spyOn(component, 'deletePost')
      mockPostService.getPosts.and.returnValue(of(posts))
      fixture.detectChanges()

      const postComponentDes = fixture.debugElement.queryAll(By.directive(PostComponent));

      for(let i = 0; i < postComponentDes.length; i++) {
        (postComponentDes[i].componentInstance as PostComponent).delete.emit(posts[i])

        expect(component.deletePost).toHaveBeenCalledWith(posts[i])
      }
    })
  })
})
