import { LoggerService } from "../logger/logger.service"
import { CalculatorService } from "./calculator.service"

describe('CalculatorService', () => {
  it('should add two numbers', () => {
    const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log'])  // Создаем объект-шпион
    // spyOn(loggerService, 'log') // Следит за методом, но метод не вызывается в CalculatorService

    const calculator = new CalculatorService(mockLoggerService)
    const res = calculator.add(2, 2)

    expect(res).toBe(4)
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)
  })

  it('should subtract two numbers', () => {
    const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log'])

    const calculator = new CalculatorService(mockLoggerService)
    const res = calculator.subtract(2, 2)

    expect(res).toBe(0)
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)
  })
})
