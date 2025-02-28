import React, { KeyboardEvent, useState } from 'react';

import theme from 'theme';

import Box from './Box';
import Typography from './Typography';

interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children' | 'onClick'> {
	sx?: React.CSSProperties;
	label?: string;
	sxProps?: {
		startAdornment?: React.CSSProperties;
		endAdornment?: React.CSSProperties;
		input?: React.CSSProperties;
	};
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;
	ref?: React.RefObject<HTMLInputElement>;
	onEnter?: () => void;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	children?: React.ReactNode;
	error?: string;
}

const useStyle = (value: boolean, error: boolean): Record<string, React.CSSProperties> => ({
	main: {
		borderRadius: '10px',
		display: 'flex',
		alignItems: 'center',
		gap: '4px',
		background: '#fff',
		height: 40,
		border: `1px solid ${error ? theme.color.error : value ? theme.color.primary : theme.color.border}`,
		position: 'relative',
	},
	input: {
		padding: '8px 16px',
		border: 'none',
		outline: 'none',
		borderRadius: 'inherit',
		width: '100%',
		fontSize: 16,
	},
	startAdornment: {
		display: 'flex',
		padding: '8px 0 8px 8px',
	},
	endAdornment: {
		display: 'flex',
		padding: '8px 8px 8px 0',
	},
	label: {
		position: 'absolute',
		left: '16px',
		pointerEvents: 'none',
		transition: 'all 0.2s ease',
		color: error ? theme.color.error : value ? theme.color.primary : theme.color.border,
		background: '#fff',
		padding: '0 4px',
		...(value
			? {
					transform: 'translateY(-20px) scale(0.8)',
					transformOrigin: 'left top',
				}
			: {
					transform: 'translateY(0px)',
				}),
	},
});
const TextField = React.forwardRef<HTMLInputElement, IProps>(
	({ sx, sxProps, startAdornment, endAdornment, onEnter, label, children, onClick, error, ...props }, ref) => {
		const [isFocused, setIsFocused] = useState<boolean>(false);
		const style = useStyle(!!props?.value || isFocused, !!error);

		const handleKeyDownEnterWrap = (fn: () => void) => {
			const keyDown = (e: KeyboardEvent) => {
				e.keyCode === 13 && fn();
			};
			return keyDown;
		};

		const defaultEnter = () => {
			return;
		};

		const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true);
			props.onFocus?.(e);
		};

		const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			props.onBlur?.(e);
		};

		return (
			<Box display="flex" flexDirection="column" gap={10} width={sx?.width || 'fit-content'}>
				<div style={{ ...style.main, ...sx, width: '100%' }} onClick={onClick}>
					{label && <span style={style.label}>{label}</span>}
					{!!startAdornment && (
						<div style={{ ...style.startAdornment, ...sxProps?.startAdornment }}>{startAdornment}</div>
					)}
					<input
						ref={ref}
						onFocus={handleFocus}
						onBlur={handleBlur}
						style={{ ...style.input, ...sxProps?.input }}
						onKeyDown={handleKeyDownEnterWrap(onEnter || defaultEnter)}
						{...props}
					/>
					{!!endAdornment && (
						<div style={{ ...style.endAdornment, ...sxProps?.endAdornment }}>{endAdornment}</div>
					)}
					{children}
				</div>
				{!!error && (
					<Typography fontSize={12} color={theme.color.error}>
						{error}
					</Typography>
				)}
			</Box>
		);
	},
);

TextField.displayName = 'TextField';
export default React.memo(TextField);
