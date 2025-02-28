import React from 'react';
import { toast, ToastOptions } from 'react-toastify';

import Box from './Box';
import Typography from './Typography';

interface Props {
	message: string;
}
const ToastMessage: React.FC<Props> = ({ message }) => {
	return (
		<Box display="flex" alignItems="center" gap={10}>
			<Typography>{message}</Typography>
		</Box>
	);
};

export default {
	error: (message: string, options?: ToastOptions): React.ReactNode =>
		toast.error(<ToastMessage message={message} />, options),
	success: (message: string, options?: ToastOptions): React.ReactNode =>
		toast.success(<ToastMessage message={message} />, options),
};
