import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import { InjectHttpInterceptor } from './agent'

import { Server } from 'http'

const originalHttp = jest.createMockFromModule('http')

describe('HTTP Interceptor Agent', () => {
  const eventName = 'request'
  const defaultRequest = null

  beforeEach(() => jest.clearAllMocks())

  test('should not change header', () => {
    const responseMock = {
      setHeader: jest.fn().mockReturnThis(),
    }

    const serverInstance = new originalHttp.Server()
    serverInstance.emit(eventName, defaultRequest, responseMock)

    expect(responseMock.setHeader).not.toHaveBeenCalled()
  })

  test('should activate header interceptor', () => {
    InjectHttpInterceptor()

    const response = {
      setHeader: jest.fn().mockReturnThis(),
    }

    const serverInstance = new Server()
    serverInstance.emit(eventName, defaultRequest, response)
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Maurício Romagnollo')
  })
})