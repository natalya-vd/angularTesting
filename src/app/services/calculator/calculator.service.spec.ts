import { LoggerService } from "../logger/logger.service"
import { CalculatorService } from "./calculator.service"

describe('CalculatorService', () => {
  it('should add two numbers', () => {
    const loggerService = new LoggerService()
    const calculator = new CalculatorService(loggerService)
    const res = calculator.add(2, 2)

    expect(res).toBe(4)
  })

  it('should subtract two numbers', () => {
    const loggerService = new LoggerService()
    const calculator = new CalculatorService(loggerService)
    const res = calculator.subtract(2, 2)

    expect(res).toBe(0)
  })
})
