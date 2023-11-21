import { CalculatorService } from "./calculator.service"

describe('CalculatorService', () => {
  it('should add two numbers', () => {
    const calculator = new CalculatorService()
    const res = calculator.add(2, 2)

    expect(res).toBe(4)
  })

  it('should subtract two numbers', () => {
    const calculator = new CalculatorService()
    const res = calculator.subtract(2, 2)

    expect(res).toBe(0)
  })
})
