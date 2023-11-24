import { CalculatorService } from "./calculator.service"

describe('CalculatorService', () => {
  let mockLoggerService: any
  let calculator: CalculatorService

  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log'])  // Создаем объект-шпион
    // spyOn(loggerService, 'log') // Следит за методом, но метод не вызывается в CalculatorService

    calculator = new CalculatorService(mockLoggerService)
  })

  it('should add two numbers', () => {
    const res = calculator.add(2, 2)

    expect(res).toBe(4)
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)
  })

  it('should subtract two numbers', () => {
    const res = calculator.subtract(2, 2)

    expect(res).toBe(0)
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)
  })
})
