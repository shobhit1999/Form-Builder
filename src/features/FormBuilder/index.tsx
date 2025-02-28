/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { CircleMinus, ListRestart, Plus } from 'lucide-react';

import Box from 'components/atoms/Box';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/TextField';
import Typography from 'components/atoms/Typography';
import Accordion from 'components/molecules/Accordion';
import InputField from 'components/molecules/InputField';
import { STORAGE, TYPE } from 'Enum';
import { useDebounce } from 'hooks/useDebounce';
import { ILayoutProps } from 'layout';
import theme from 'theme';
import { loadState, removeState, saveState } from 'utils/LocalStorage';

import { FIELDS, INIT_QUESTION } from './CONSTANTS';
import { IQuestion } from './types';

const FormBuilder: React.FC<ILayoutProps> = ({ isMobile }) => {
	const [builder, setBuilder] = useState<IQuestion[]>(() => {
		const saved = loadState<IQuestion[]>(STORAGE.FORM);
		return saved ? saved : [INIT_QUESTION];
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [expand, setExpand] = useState<number>(1);
	const [error, setError] = useState<Record<number, Record<keyof IQuestion, string>>>({});

	const handleReset = () => {
		setBuilder([INIT_QUESTION]);
		removeState(STORAGE.FORM);
	};

	const handleValueChange = (index: number) => (key: string, value: string) => {
		const newBuilder = [...builder];
		newBuilder[index] = {
			...newBuilder[index],
			[key]: value,
			...(key === 'type' && {
				unit: '',
				min: 0,
				max: 0,
				options: [''],
			}),
		};
		setBuilder(newBuilder);
	};

	const handleAddOption = (index: number) => () => {
		const newBuilder = [...builder];
		const existingOptions = newBuilder[index].options || [];
		newBuilder[index] = {
			...newBuilder[index],
			options: [...existingOptions, ''],
		};
		setBuilder(newBuilder);
	};

	const handleRemoveOption = (index: number, oIndex: number) => () => {
		const newBuilder = [...builder];
		const existingOptions = newBuilder[index].options || [];
		newBuilder[index] = {
			...newBuilder[index],
			options: existingOptions.filter((_, i) => i !== oIndex),
		};
		setBuilder(newBuilder);
	};

	const handleOptionChange = (index: number, oIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const newBuilder = [...builder];
		const existingOptions = newBuilder[index].options || [];
		existingOptions[oIndex] = e.target.value;
		newBuilder[index] = {
			...newBuilder[index],
			options: existingOptions,
		};
		setBuilder(newBuilder);
	};

	const handleAddQuestion = () => {
		setBuilder([...builder, INIT_QUESTION]);
		setExpand(builder.length + 1);
	};

	const handleExpand = (index: number) => (val: boolean) => {
		if (!val) return setExpand(-1);
		setExpand(index);
	};

	const validateForm = (): boolean => {
		let hasError = false;
		const fullErrorObj: Record<number, Record<string, string>> = {};
		builder.forEach((q, index) => {
			const errorObj: Record<string, string> = {};
			let errorInThisQuestion = false;
			FIELDS(q).forEach((field) => {
				if (field.required && !q[field.id]) {
					errorObj[field.id] = 'This field is required';
					hasError = true;
					errorInThisQuestion = true;
				}
			});
			if (errorInThisQuestion) {
				fullErrorObj[index] = errorObj;
			}
		});
		setError({ ...fullErrorObj });
		return !hasError;
	};

	const saveToLocalStorage = useCallback(() => {
		const hasAnyBuilderWithEmptyTitle = builder.some((q) => !q.title);
		if (hasAnyBuilderWithEmptyTitle) return;
		const isValid = validateForm();
		if (!isValid) return;
		setLoading(true);
		saveState(STORAGE.FORM, builder);
		setTimeout(() => setLoading(false), 1000);
	}, [builder]);

	const debouncedSave = useDebounce(saveToLocalStorage, 1000);

	useEffect(() => {
		debouncedSave();
	}, [builder, debouncedSave]);

	return (
		<Box width="100%" display="flex" flexDirection="column" gap={20}>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				{...(isMobile && { ...(theme.footer as React.CSSProperties) })}>
				{!isMobile && (
					<Typography fontSize={24} fontWeight={600}>
						Form Builder
					</Typography>
				)}
				<Box
					display="flex"
					alignItems="center"
					gap={16}
					flexWrap="nowrap"
					width={isMobile ? '100%' : 'fit-content'}>
					<Button
						startIcon={<ListRestart size={16} />}
						width={isMobile ? '50%' : 'fit-content'}
						variant="outlined"
						onClick={handleReset}>
						Rest
					</Button>
					<Button
						startIcon={<Plus size={16} />}
						width={isMobile ? '50%' : 'fit-content'}
						variant="outlined"
						onClick={handleAddQuestion}>
						Add Question
					</Button>
				</Box>
			</Box>
			<>
				{builder.map((q, index) => {
					const isExpanded = expand === index + 1;
					return React.Children.toArray(
						<Accordion
							title={(!isExpanded ? q.title : '') || `Question ${index + 1}`}
							expanded={isExpanded}
							loading={loading && isExpanded}
							onChange={handleExpand(index + 1)}>
							<Box display="flex" justifyContent="space-between" width="100%" flexWrap="wrap" gap={16}>
								<InputField
									onChange={handleValueChange(index)}
									fields={FIELDS(q)}
									values={q}
									errors={error[index] || undefined}
								/>
								{q.type === TYPE.SELECT && (
									<>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="space-between"
											width="100%">
											<Typography fontWeight={600}>Options</Typography>
											<Button
												startIcon={<Plus size={12} />}
												width="fit-content"
												sx={{ fontSize: 12 }}
												variant="outlined"
												onClick={handleAddOption(index)}>
												Add Option
											</Button>
										</Box>
										{q.options?.map((o, oIndex) =>
											React.Children.toArray(
												<Box
													display="flex"
													gap={16}
													alignItems="center"
													width="100%"
													flexWrap="nowrap">
													<TextField
														value={o}
														label={`Option ${oIndex + 1}`}
														sx={{ width: '100%' }}
														onChange={handleOptionChange(index, oIndex)}
													/>
													<CircleMinus
														stroke={theme.color.error}
														size={16}
														cursor="pointer"
														onClick={handleRemoveOption(index, oIndex)}
													/>
												</Box>,
											),
										)}
									</>
								)}
							</Box>
						</Accordion>,
					);
				})}
			</>
		</Box>
	);
};

export default FormBuilder;
