import React from 'react';

import theme, { getButtonHoverColor } from 'theme';

import Box from './Box';

type TVariant = 'contained' | 'outlined' | 'normal';
type TColor = 'primary' | 'error' | 'success' | 'warning' | 'secondary';

export interface IButtonProps {
	variant?: TVariant;
	children?: React.ReactNode;
	sx?: React.CSSProperties;
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	disabled?: boolean;
	color?: TColor;
	width?: string | number;
	className?: string;
	id?: string;
}

const getTextColor = (color: string) => {
	if (color === theme.color.secondary) return '#38496C';
	return '#fff';
};

const useStyle = (color: string): Record<TVariant, React.CSSProperties> => ({
	contained: {
		padding: '8px 12px',
		color: getTextColor(color),
		background: color,
	},
	outlined: {
		padding: '8px 12px',
		border: `1px solid ${color}`,
		color: color,
		background: getTextColor(color),
	},
	normal: {
		padding: '8px 12px',
		border: 'none',
		color: color,
		background: 'inherit',
	},
});

const Button: React.FC<IButtonProps> = ({
	variant = 'contained',
	onClick,
	children,
	startIcon,
	endIcon,
	sx,
	disabled,
	className,
	color = 'primary',
	width,
	id,
}) => {
	const buttonStyles = { ...useStyle(Reflect.get(theme.color, color) || theme.color.primary)[variant], ...sx };

	const handleButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (disabled || !onClick) return;
		onClick(e);
	};

	const hoverStyles = {
		...theme.button.hover,
		background: getButtonHoverColor(
			(buttonStyles?.background || buttonStyles?.backgroundColor || theme.color.primary) + '',
		),
	} as React.CSSProperties;

	return (
		<Box
			onClick={handleButtonClick}
			className={className ? className : ''}
			display="flex"
			alignItems="center"
			justifyContent="center"
			cursor={disabled ? 'no-drop' : 'pointer'}
			gap={8}
			id={id}
			width={width}
			borderRadius={10}
			whiteSpace="nowrap"
			opacity={disabled ? 0.5 : 1}
			transition="all 0.25s ease-in-out"
			hover={disabled ? {} : hoverStyles}
			{...buttonStyles}>
			{!!startIcon && startIcon}
			{children}
			{!!endIcon && endIcon}
		</Box>
	);
};

export default React.memo(Button);
