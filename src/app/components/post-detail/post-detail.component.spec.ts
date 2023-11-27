import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { Location } from "@angular/common"

import { PostDetailComponent } from "./post-detail.component"
import { PostService } from "src/app/services/post/post.service"
import { of } from "rxjs"
import { Post } from "src/app/models/post"
import { By } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms"

describe('PostDetailComponent', () => {
  let fixture: ComponentFixture<PostDetailComponent>
  let mockPostService: jasmine.SpyObj<PostService>
  let post: Post

  beforeEach(() => {
    post = {
      id: 3,
      title: 'title 1',
      body: 'body 1'
    }

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3'
          }
        }
      }
    }
    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost'])
    const mockLocation = jasmine.createSpyObj(['back'])

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [FormsModule],
      providers: [
        {provide: Location, useValue: mockLocation},
        {provide: PostService, useValue: mockPostService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
    })

    fixture = TestBed.createComponent(PostDetailComponent)
  })

  it('should render the post title in h2 template', () => {
    mockPostService.getPost.and.returnValue(
      of(post)
    )
    fixture.detectChanges()

    const element = fixture.nativeElement.querySelector('h2')
    // const elementDes =fixture.debugElement.query(By.css('h2'))
    // const element: HTMLElement = elementDes.nativeElement

    expect(element.textContent).toBe(post.title)
  })
})
