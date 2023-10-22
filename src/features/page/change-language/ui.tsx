import {
	SelectProps as MUISelectProps,
	MenuItem,
	TextField
} from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { deviceInfoModel, i18nModel } from '@/shared/models';

const languages = ['ru', 'en'];

export const ChangeLanguage: React.FC = () => {
	const [language, changeLanguage] = useUnit([
		i18nModel.$language,
		i18nModel.changeLanguage
	]);
	const isMobile = useUnit(deviceInfoModel.$isMobile);
	const [t] = useTranslation('common');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		changeLanguage(event.target.value as any);
	};

	const context = isMobile ? 'short' : '';

	return (
		<TextField
			onChange={onChange}
			value={language}
			variant='standard'
			size='small'
			SelectProps={SelectProps}
			select>
			{languages.map((language) => (
				<MenuItem value={language} key={language}>
					{t(`languages.${language}`, { context, })}
				</MenuItem>
			))}
		</TextField>
	);
};

const SelectProps: MUISelectProps = {
	MenuProps: {
		MenuListProps: {
			disablePadding: true,
		},
		anchorOrigin: {
			horizontal: 'right',
			vertical: 'bottom',
		},
		transformOrigin: {
			horizontal: 'right',
			vertical: 'top',
		},
	},
};
