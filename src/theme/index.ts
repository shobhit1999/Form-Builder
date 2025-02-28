export const theme = {
	color: {
		primary: '#2D3F5F',
		error: '#C53434',
		success: '#57D883',
		warning: '#FEB872',
		secondary: '#F5F7FA',
		border: '#CFD6DD',
	},
	screen: {
		maxWidth: 1200,
	},
	button: {
		hover: {
			// transform: 'scale(0.95)',
		},
	},
	footer: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '-webkit-fill-available',
		padding: '20px',
		zIndex: 10,
		background: '#fff',
		boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.08)',
	},
};

const overlayColor = (baseRgb: number[], overlayColor: number[], opacity: number) => {
	const [r, g, b] = baseRgb.map((color, index) => {
		return Math.round(color * (1 - opacity) + overlayColor[index] * opacity);
	});
	return `rgb(${r},${g},${b}, 1)`;
};

export const getButtonHoverColor = (hexColor: string) => {
	const hex = hexColor.replace('#', '');

	if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex)) return hexColor;

	const expandedHex =
		hex.length === 3
			? hex
					.split('')
					.map((char) => char + char)
					.join('')
			: hex;

	const r = parseInt(expandedHex.substring(0, 2), 16);
	const g = parseInt(expandedHex.substring(2, 4), 16);
	const b = parseInt(expandedHex.substring(4, 6), 16);

	const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

	if (lum <= 0.4) return overlayColor([r, g, b], [255, 255, 255], 0.2);
	return overlayColor([r, g, b], [0, 0, 0], 0.05);
};

export default theme;
