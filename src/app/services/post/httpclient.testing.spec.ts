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

    // expectOne - проверяем, что на url '/data' был сделан один запрос
    const request = httpTestingController.expectOne('/data')
    // Добавить тестовые данные
    request.flush(testData)

    expect(request.request.method).toBe('GET')
  })

  it('should test multiple requests', () => {
    const testData: Data[] = [{name: 'name 1'}, {name: 'name 2'}]

    httpClient.get<Data[]>(testUrl).subscribe(data => {
      expect(data.length).toEqual(0)
    })
    httpClient.get<Data[]>(testUrl).subscribe(data => {
      expect(data).toEqual([testData[0]])
    })
    httpClient.get<Data[]>(testUrl).subscribe(data => {
      expect(data).toEqual(testData)
    })

    const requests = httpTestingController.match(testUrl)
    requests[0].flush([])
    requests[1].flush([testData[0]])
    requests[2].flush(testData)

    expect(requests.length).toBe(3)
  })
})
