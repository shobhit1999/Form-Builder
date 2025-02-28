import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import Box from 'components/atoms/Box';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/TextField';
import Typography from 'components/atoms/Typography';
import theme from 'theme';

import Popover from './Popover';

interface ISxProps {
	popover?: React.CSSProperties;
}

interface ISelectFieldProps {
	sx?: React.CSSProperties;
	list?: Array<string>;
	value?: string;
	disabled?: boolean;
	onChange?: (val: string) => void;
	children?: React.ReactNode;
	sxProps?: ISxProps;
	placeholder?: string;
	label?: string;
	error?: string;
}

const useStyle = (): Record<string, React.CSSProperties> => ({
	popover: {
		borderRadius: '6px',
		border: `1px solid ${theme.color.border}`,
		maxHeight: 200,
		overflowY: 'auto',
		position: 'absolute',
		left: 0,
	},
	listItem: {
		padding: '8px',
		display: 'flex',
		alignItems: 'center',
		gap: 4,
		cursor: 'pointer',
	},
	text: {
		width: '100%',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
});

const SelectField: React.FC<ISelectFieldProps> = ({
	sx,
	value,
	list = [],
	onChange,
	disabled,
	children,
	sxProps,
	placeholder,
	label,
	error,
}) => {
	const style = useStyle();

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const resetAnchor = () => setAnchorEl(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		if (disabled || !list.length) return;
		if (anchorEl) return resetAnchor();
		setAnchorEl(event.currentTarget);
	};
	const handleSelectChange = (val: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		resetAnchor();
		if (!onChange) return;
		onChange(val);
	};

	return (
		<TextField
			value={value}
			readOnly
			placeholder={placeholder}
			label={label}
			error={error}
			disabled={disabled}
			sx={{ ...sx, cursor: 'pointer' }}
			sxProps={{
				input: {
					cursor: 'pointer',
				},
			}}
			endAdornment={<ChevronsUpDown size={16} />}
			onClick={handleClick}>
			{anchorEl && (
				<Popover
					anchorEl={anchorEl}
					sx={{ ...style.popover, ...sxProps?.popover }}
					onClose={resetAnchor}
					id="select_field_popover">
					<Box display="flex" flexDirection="column" className="grow" position="relative">
						{list.map((i, index) => {
							const isActive = i === value;
							const isLastChild = index === list.length - 1;
							return React.Children.toArray(
								<Button
									variant="normal"
									onClick={handleSelectChange(i)}
									sx={{
										borderRadius: 0,
										borderBottom: !isLastChild ? `1px solid ${theme.color.border}` : 'none',
										background: isActive ? theme.color.secondary : '#fff',
										...style.listItem,
									}}>
									<Typography
										color={isActive ? theme.color.primary : '#000'}
										fontSize={14}
										sx={style.text}>
										{i}
									</Typography>
								</Button>,
							);
						})}
					</Box>
					{children && (
						<Box position="sticky" bottom={0} zIndex={1} width="100%" onClick={resetAnchor}>
							{children}
						</Box>
					)}
				</Popover>
			)}
		</TextField>
	);
};

export default React.memo(SelectField);
