import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

import { PostService } from "./post.service"
import { Post } from "src/app/models/post"

describe('PostService (HttpClientTestingModule)', () => {
  let postService: PostService
  let httpTestingController: HttpTestingController
  let posts: Post[]
  const urlPosts = 'https://jsonplaceholder.typicode.com/posts'

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
      providers: [PostService],
      imports: [HttpClientTestingModule]
    })

    postService = TestBed.inject(PostService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    // Проверяет, что запрос идет только на урл  указанный в httpTestingController.expectOne
    httpTestingController.verify()
  })

  describe('getPosts()', () => {
    it('should get posts when getPosts() is called', (done: DoneFn) => {
      postService.getPosts().subscribe((data) => {
        expect(data).toEqual(posts)
        done()
      })
      const request = httpTestingController.expectOne(urlPosts)
      request.flush(posts)

      expect(request.request.method).toBe('GET')
    })
  })

  describe('getPost()', () => {
    it('should return single post when getPost is called with postId', () => {
      postService.getPost(1).subscribe()

      const request = httpTestingController.expectOne(`${urlPosts}/1`)

      expect(request.request.method).toBe('GET')
    })
  })
})
