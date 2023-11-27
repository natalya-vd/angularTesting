import { TestBed } from "@angular/core/testing"
import { CalculatorService } from "./calculator.service"
import { LoggerService } from "../logger/logger.service"

// Для установки настроек можно создать отдельную функцию и вызывать ее в каждом it, а не устанавливать настройки в beforeEach
// function setUp() {
//   const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log'])  // Создаем объект-шпион
//   // spyOn(loggerService, 'log') // Следит за методом, но метод не вызывается в CalculatorService
//   TestBed.configureTestingModule({
//     providers: [
//       CalculatorService,
//       {
//         provide: LoggerService,
//         useValue: mockLoggerService
//       }
//     ]
//   })

//   const calculator = TestBed.inject(CalculatorService)
//   const loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>

//   return {calculator, loggerServiceSpy}
// }

describe('CalculatorService', () => {
  let calculator: CalculatorService
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>

  beforeEach(() => {
    const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log'])  // Создаем объект-шпион
    // spyOn(loggerService, 'log') // Следит за методом, но метод не вызывается в CalculatorService
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService
        }
      ]
    })

    calculator = TestBed.inject(CalculatorService)
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>
  })

  it('should add two numbers', () => {
    const res = calculator.add(2, 2)

    expect(res).toBe(4)
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1)
  })

  it('should subtract two numbers', () => {
    const res = calculator.subtract(2, 2)

    expect(res).toBe(0)
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1)
  })
})
