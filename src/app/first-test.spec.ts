describe('First Test', () => {
  let testVariable: any

  // Выполняется перед каждым запуском
  beforeEach(() => {
    testVariable = {}
  })

  it('should return true if a is true', () => {
    // Инициализация данных
    testVariable.a = false

    // Проверка логики
    testVariable.a = true

    // Утверждение
    expect(testVariable.a).toBe(true)
  })
})
