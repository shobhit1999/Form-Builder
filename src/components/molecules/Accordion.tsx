/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownCircle } from 'lucide-react';

import Box from 'components/atoms/Box';
import Typography from 'components/atoms/Typography';
import theme from 'theme';

interface IAccordionSxProps {
	header?: React.CSSProperties;
}

interface IAccordionProps {
	expanded?: boolean;
	onChange?: (expand: boolean) => void;
	children?: React.ReactNode;
	title?: string | React.ReactNode;
	id?: string;
	sx?: React.CSSProperties;
	sxProps?: IAccordionSxProps;
	expandedMarginTop?: number;
	loading?: boolean;
}

const useStyles = (expanded: boolean, expandedMarginTop: number) => ({
	expandIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'all 0.5 ease-in-out',
		...(expanded && {
			transform: 'rotate(180deg)',
		}),
	},
	contentWrapper: {
		transition: 'all 0.5s ease-in-out',
		marginTop: expandedMarginTop,
		paddingTop: 10,
		overflow: 'hidden',
		...(!expanded && {
			marginTop: 0,
			paddingTop: 0,
		}),
	},
	loader: {
		animation: 'spin 1s linear infinite',
		width: '16px',
		height: '16px',
		borderRadius: '50%',
		border: '2px solid transparent',
		borderTopColor: theme.color.primary,
		borderLeftColor: theme.color.primary,
	},
});

const Accordion: React.FC<IAccordionProps> = ({
	onChange,
	expanded = false,
	title,
	sx,
	children,
	sxProps,
	loading,
	expandedMarginTop = 25,
}) => {
	const [isExpanded, setExpanded] = useState<boolean>(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const styles = useStyles(isExpanded, expandedMarginTop);

	const handleExpandToggle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		setExpanded((val) => !val);
		if (!onChange) return;
		onChange(!expanded);
	};

	useEffect(() => {
		if (!contentRef?.current) return;
		if (isExpanded) {
			setTimeout(() => {
				contentRef?.current?.parentElement?.style.setProperty('overflow', 'unset');
			}, 500);
			return;
		}
		contentRef?.current?.parentElement?.style.setProperty('overflow', 'hidden');
	}, [isExpanded]);

	useEffect(() => {
		if (expanded === isExpanded) return;
		setExpanded(expanded);
	}, [expanded, contentRef]);

	return (
		<Box
			borderRadius={8}
			boxShadow="0px 4px 8px rgba(0, 0, 0, 0.06)"
			padding="16px"
			display="flex"
			flexDirection="column"
			{...sx}>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				cursor="pointer"
				gap={14}
				{...sxProps?.header}
				WebkitTapHighlightColor="transparent"
				onClick={handleExpandToggle}>
				<Box display="flex" alignItems="center" gap={12} width="100%">
					<Typography>{title}</Typography>
				</Box>
				<Box display="flex" gap={8}>
					{loading && <div style={styles.loader} />}
					<Box {...styles.expandIcon}>
						<ChevronDownCircle size={16} />
					</Box>
				</Box>
			</Box>
			<Box className="grow" height="fit-content" maxHeight={isExpanded ? 'unset' : 0} {...styles.contentWrapper}>
				<div ref={contentRef}>{children}</div>
			</Box>
		</Box>
	);
};

export default React.memo(Accordion);
