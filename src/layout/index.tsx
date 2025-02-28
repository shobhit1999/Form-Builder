import React, { useState } from 'react';

import Box from 'components/atoms/Box';
import Button from 'components/atoms/Button';
import FormBuilder from 'features/FormBuilder';
import FormRender from 'features/FormRender';
import theme from 'theme';

export interface ILayoutProps {
	isMobile?: boolean;
}

type TTab = 'FORM_BUILDER' | 'FORM_RENDER';

const TABS: Array<{ label: string; value: TTab }> = [
	{ label: 'Form Builder', value: 'FORM_BUILDER' },
	{ label: 'Form Render', value: 'FORM_RENDER' },
];

const Layout: React.FC = () => {
	const [isMobile] = useState<boolean>(window.innerWidth < 768);
	const [activeTab, setActiveTab] = useState<TTab>('FORM_BUILDER');

	const handleTabChange = (tab: TTab) => () => setActiveTab(tab);

	if (isMobile) {
		return (
			<Box height="100dvh" width="100dvw">
				<Box padding={20} display="flex" flexDirection="column" gap={40} overflow="hidden">
					<Box
						borderRadius={10}
						display="flex"
						alignItems="center"
						border={`1px solid ${theme.color.primary}`}>
						{TABS.map((t, index) => {
							const isFirstIndex = index === 0;
							const isLastIndex = index === TABS.length - 1;
							return React.Children.toArray(
								<Button
									variant="normal"
									onClick={handleTabChange(t.value)}
									sx={{
										borderTopLeftRadius: isFirstIndex ? 10 : 0,
										borderBottomLeftRadius: isFirstIndex ? 10 : 0,
										borderTopRightRadius: isLastIndex ? 10 : 0,
										borderBottomRightRadius: isLastIndex ? 10 : 0,
										background: activeTab === t.value ? theme.color.primary : '#fff',
										color: activeTab === t.value ? '#fff' : theme.color.primary,
										width: `${100 / TABS.length}%`,
									}}>
									{t.label}
								</Button>,
							);
						})}
					</Box>
					<Box width="100%" height="calc(100dvh - 200px)" overflowY="auto" display="content">
						{activeTab === 'FORM_BUILDER' ? <FormBuilder isMobile /> : <FormRender isMobile />}
					</Box>
				</Box>
			</Box>
		);
	}

	return (
		<Box height="100dvh" width="100dvw">
			<Box padding={40} display="flex" gap={40}>
				<Box width="50%">
					<FormBuilder />
				</Box>
				<Box width="50%">
					<FormRender />
				</Box>
			</Box>
		</Box>
	);
};

export default Layout;
