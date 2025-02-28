import React, { ChangeEvent } from 'react';
import { ArrowUpToLine } from 'lucide-react';

import Box from 'components/atoms/Box';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/TextField';
import Toasty from 'components/atoms/Toasty';
import Typography from 'components/atoms/Typography';
import SelectField from 'components/molecules/SelectField';
import { BOOLEAN, STORAGE, TYPE } from 'Enum';
import { IQuestion } from 'features/FormBuilder/types';
import { useStorage } from 'hooks/useStorage';
import { ILayoutProps } from 'layout';
import theme from 'theme';

const FormRender: React.FC<ILayoutProps> = ({ isMobile }) => {
	const builderForm = useStorage<IQuestion[]>(STORAGE.FORM, []);

	const [values, setValues] = React.useState<Record<number, string>>({});

	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) =>
		setValues((val) => ({ ...val, [+e.target.name]: e.target.value }));
	const handleSelectChange = (index: number) => (v: string) => setValues((val) => ({ ...val, [index]: v }));

	const handleSubmit = () => {
		if (!builderForm?.length) return;
		const hasError = builderForm?.some((q, index) => q.required === BOOLEAN.YES && !values[index + 1]?.trim());
		if (hasError) return Toasty.error('Please fill all required fields!');

		Toasty.success('Form submitted successfully!');
	};

	return (
		<Box width="100%" display="flex" flexDirection="column" gap={20}>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				{...(isMobile && { ...(theme.footer as React.CSSProperties) })}>
				{!isMobile && (
					<Typography fontSize={24} fontWeight={600}>
						Form Render
					</Typography>
				)}
				{builderForm?.length > 0 && (
					<Button
						startIcon={<ArrowUpToLine size={16} />}
						width={isMobile ? '100%' : 'fit-content'}
						variant="contained"
						onClick={handleSubmit}>
						Submit
					</Button>
				)}
			</Box>
			{builderForm?.map((q, index) => {
				const key = index + 1;
				const val = values[key] || '';
				const finalType = q.type?.toLowerCase();
				const isRequired = q.required === BOOLEAN.YES;
				return React.Children.toArray(
					<Box display="flex" flexDirection="column" gap={20}>
						<Typography fontWeight={600}>
							{`Q${key}: `}
							{q.title}
							{` `}
							{isRequired && <span style={{ color: 'red' }}>*</span>}
						</Typography>
						{finalType === TYPE.SELECT.toLowerCase() ? (
							<SelectField
								value={val}
								onChange={handleSelectChange(key)}
								placeholder={q.helperText}
								sx={{ width: '99%' }}
								list={q.options}
							/>
						) : (
							<TextField
								value={val}
								name={key.toString()}
								onChange={handleValueChange}
								placeholder={q.helperText}
								required={isRequired}
								sx={{ width: '99%' }}
								type={q.type}
								{...(finalType === TYPE.NUMBER.toLowerCase() && {
									inputMode: 'numeric',
									min: q.min,
									max: q.max,
									unit: q.unit,
								})}
							/>
						)}
					</Box>,
				);
			})}
		</Box>
	);
};

export default React.memo(FormRender);
