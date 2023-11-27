import { HttpClient } from "@angular/common/http"

import { PostService } from "./post.service"
import { of } from "rxjs"
import { Post } from "src/app/models/post"
import { TestBed } from "@angular/core/testing"

describe('PostService', () => {
  let postService: PostService
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let posts: Post[]

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

    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get'])
    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    })
    postService = TestBed.inject(PostService)
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  })

  describe('getPosts()', () => {
    it('should return expected posts when getPosts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(posts))

      postService.getPosts().subscribe({
        next: (p) => {
          expect(p).toEqual(posts)
          done()
        },
        error: () => {
          done.fail()
        }
      })
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    })
  })
})
