import React from 'react';

interface ITypographyProps {
	fontSize?: string | number;
	color?: string;
	fontWeight?: number;
	textAlign?: 'center' | 'left' | 'right';
	fontFamily?: string;
	sx?: React.CSSProperties;
	children?: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

const Typography: React.FC<ITypographyProps> = ({
	fontSize,
	color = '#38496C',
	fontWeight,
	textAlign,
	fontFamily,
	sx,
	onClick,
	children,
	className,
}) => {
	return (
		<span
			className={className}
			onClick={onClick}
			style={{ fontSize, color, fontWeight, fontFamily, textAlign, ...sx }}>
			{children}
		</span>
	);
};

export default React.memo(Typography);
