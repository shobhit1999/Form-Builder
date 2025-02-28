import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Slide, ToastContainer } from 'react-toastify';

import ToastWrap from '../Toaster';

jest.mock('react-toastify', () => ({
	ToastContainer: jest.fn((props) => <div data-testid="toast-container" {...props} />),
	Slide: jest.fn(),
}));

describe('ToastWrap', () => {
	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	it('should be memoized', () => {
		const firstRender = render(<ToastWrap />);
		const secondRender = render(<ToastWrap />);

		expect(firstRender.container).toEqual(secondRender.container);
	});
});
