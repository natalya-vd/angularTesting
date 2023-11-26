import { first } from "rxjs"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from "@angular/core"

import { Post } from "src/app/models/post"
import { PostComponent } from "./post.component"

describe('PostComponent', () => {
  let fixture: ComponentFixture<PostComponent>
  let component: PostComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(PostComponent)
    component = fixture.componentInstance
  })

  it('should create post component using TestBed', () => {
    expect(component).toBeDefined()
  })

  it('should render the post title in the anchor element', () => {
    const post: Post = {
      id: 1,
      title: 'title 1',
      body: 'body 1'
    }

    component.post = post
    // Чтобы angular обнаружил изменения в компоненте (присвоили post) нужно вызвать fixture.detectChanges()
    fixture.detectChanges()
    const postElement: HTMLElement = fixture.nativeElement
    const a = postElement.querySelector('a')

    expect(a?.textContent).toContain(post.title)
  })

  it('should raise and event when the delete post is clicked', () => {
    const post: Post = {
      id: 1,
      title: 'title 1',
      body: 'body 1'
    }
    component.post = post

    component.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post)
    })
    component.onDeletePost(new MouseEvent('click'))
  })
})
