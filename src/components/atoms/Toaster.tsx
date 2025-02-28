import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';

const ToastWrap = () => (
	<ToastContainer
		position="top-right"
		autoClose={3000}
		hideProgressBar
		closeButton={false}
		transition={Slide}
		draggable={false}
		pauseOnFocusLoss={false}
		closeOnClick={false}
		className="toaster"
	/>
);

export default React.memo(ToastWrap);
