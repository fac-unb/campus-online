/* eslint-env jest */
/* globals global */

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn(),
}

global.localStorage = localStorageMock
