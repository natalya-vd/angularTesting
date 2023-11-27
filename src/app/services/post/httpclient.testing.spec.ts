import { HttpClient } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

let testUrl = '/data'
interface Data {
  name: string
}

describe('HttpClient', () => {
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })

    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should call the testUrl with get Request', () => {
    const testData: Data = {name: 'test name'}

    httpClient.get<Data>(testUrl).subscribe((data) => {
      // expect(data).toEqual(testData)
    })
    const request = httpTestingController.expectOne('/data')
    request.flush(testData)

    expect(request.request.method).toBe('GET')
  })
})
