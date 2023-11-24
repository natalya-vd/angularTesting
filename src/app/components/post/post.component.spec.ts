import { first } from "rxjs"
import { ComponentFixture, TestBed } from "@angular/core/testing"

import { Post } from "src/app/models/post"
import { PostComponent } from "./post.component"

describe('PostComponent', () => {
  let fixture: ComponentFixture<PostComponent>
  let component: PostComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent]
    })
    fixture = TestBed.createComponent(PostComponent)
    component = fixture.componentInstance
  })

  it('should create post component using TestBed', () => {
    expect(component).toBeDefined()
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
