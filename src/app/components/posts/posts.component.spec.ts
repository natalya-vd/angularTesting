import { of } from "rxjs"

import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"

describe('PostsComponent', () => {
  let posts: Post[]
  let component: PostsComponent
  let mockPostService: any

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

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost'])

    component = new PostsComponent(mockPostService)
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
