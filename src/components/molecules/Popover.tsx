/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';

import Box from 'components/atoms/Box';

interface IPopoverProps {
	anchorEl: HTMLElement;
	sx?: React.CSSProperties;
	children?: React.ReactNode;
	width?: string | number;
	onClose?: () => void;
	id?: string;
}

const Popover: React.FC<IPopoverProps> = ({ anchorEl, sx, children, width, onClose, id = 'popover' }) => {
	const [top, setTop] = useState<string | number>('unset');
	const [bottom, setBottom] = useState<string | number>('unset');

	const handleClickOutside = (event: globalThis.MouseEvent) => {
		const element = document.getElementById(id);
		if (!onClose || !element || element.contains(event.target as Node) || anchorEl.contains(event.target as Node))
			return;
		onClose();
	};

	const getTop = () => {
		const elementHeight = +(sx?.maxHeight || 0) || document.getElementById(id)?.scrollHeight || 0;
		if (anchorEl.getBoundingClientRect()?.bottom + elementHeight > window?.innerHeight - 150) return 'unset';
		return anchorEl.clientHeight + 5 + window.scrollY;
	};

	const getBottom = () => {
		const elementHeight = +(sx?.maxHeight || 0) || document.getElementById(id)?.scrollHeight || 0;
		if (anchorEl.getBoundingClientRect()?.bottom + elementHeight > window?.innerHeight - 150)
			return anchorEl.clientHeight + 5 + window.scrollY;
		return 'unset';
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useLayoutEffect(() => {
		setTop(getTop());
		setBottom(getBottom());
	}, []);

	return (
		<Box
			id={id}
			position="fixed"
			background="#fff"
			zIndex={1}
			boxShadow="0px 1px 5px 0px rgba(0, 0, 0, 0.12)"
			width={width || anchorEl.getBoundingClientRect()?.width}
			top={top}
			bottom={bottom}
			{...sx}>
			{children}
		</Box>
	);
};

export default React.memo(Popover);
