import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { Location } from "@angular/common"

import { PostDetailComponent } from "./post-detail.component"
import { PostService } from "src/app/services/post/post.service"

describe('PostDetailComponent', () => {
  let fixture: ComponentFixture<PostDetailComponent>

  beforeEach(() => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3'
          }
        }
      }
    }
    const mockPostService = jasmine.createSpyObj(['getPost', 'updatePost'])
    const mockLocation = jasmine.createSpyObj(['back'])

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        {provide: Location, useValue: mockLocation},
        {provide: PostService, useValue: mockPostService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    })

    fixture = TestBed.createComponent(PostDetailComponent)
  })
})
