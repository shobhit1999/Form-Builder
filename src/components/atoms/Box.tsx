import React, { useState } from 'react';

export interface IBoxProps extends React.CSSProperties {
	children?: React.ReactNode;
	hover?: React.CSSProperties;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	id?: string;
	className?: string;
	ref?: React.RefObject<HTMLDivElement>;
	dataTestid?: string;
}

const Box = React.forwardRef<HTMLDivElement, IBoxProps>(
	({ children, className, hover, onClick, id, dataTestid, ...props }, ref) => {
		const [isHovered, setIsHovered] = useState<boolean>(false);

		const handleMouseEnter = () => setIsHovered(true);

		const handleMouseLeave = () => setIsHovered(false);

		return (
			<div
				data-testid={dataTestid}
				className={className}
				id={id}
				ref={ref}
				onClick={onClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{ WebkitTapHighlightColor: 'transparent', ...props, ...(isHovered ? hover : {}) }}>
				{children}
			</div>
		);
	},
);

Box.displayName = 'Box';
export default React.memo(Box);
