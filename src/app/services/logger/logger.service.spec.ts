import { ComponentFixture, TestBed } from "@angular/core/testing"
import { LoggerService } from "./logger.service"

describe('LoggerService', () => {
  let service: LoggerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    })
    service = TestBed.inject(LoggerService)
  })

  it('should not have any messages at starting', () => {
    const count = service.messages.length

    expect(count).toBe(0)
  })

  it('should add the message when log is called', () => {
    service.log('message')

    expect(service.messages.length).toBe(1)
    expect(service.messages).toContain('message')
  })

  it('should clear all the messages when clear is called', () => {
    service.log('message')

    service.clear()

    expect(service.messages.length).toBe(0)
  })
})
