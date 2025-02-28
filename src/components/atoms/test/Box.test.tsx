import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Box from '../Box';

describe('Box Component', () => {
	it('handles onClick events', () => {
		const handleClick = jest.fn();
		render(
			<Box onClick={handleClick} dataTestid="box">
				onClick
			</Box>,
		);

		fireEvent.click(screen.getByTestId('box'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('renders children correctly', () => {
		render(
			<Box>
				<div data-testid="child">Test Content</div>
			</Box>,
		);
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});

	it('applies style props correctly', () => {
		render(<Box display="flex" flexDirection="column" gap={10} padding="20px" dataTestid="box" />);

		const box = screen.getByTestId('box');
		expect(box).toHaveStyle({
			display: 'flex',
			flexDirection: 'column',
			gap: '10px',
			padding: '20px',
		});
	});

	it('merges custom className with default styles', () => {
		render(<Box className="custom-class" dataTestid="box" />);

		const box = screen.getByTestId('box');
		expect(box).toHaveClass('custom-class');
	});
});
