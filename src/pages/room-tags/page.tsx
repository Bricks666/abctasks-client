import { Container } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Popups, PopupsProps } from '@/widgets/page';

import {
	ConfirmRemoveTag,
	CreateTag,
	OpenCreateTagForm,
	UpdateTag
} from '@/features/tags';

import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { TagsList } from './ui';

export interface TagsPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTag]: CreateTag,
	[popupsMap.updateTag]: UpdateTag,
	[popupsMap.removeTag]: ConfirmRemoveTag,
};

const TagsPage: React.FC<TagsPageProps> = React.memo(function TagsPage(props) {
	const { className, } = props;
	const { t, } = useTranslation('room-tags');

	const title = t('title');

	return (
		<Container className={cn(styles.container, className)}>
			<SectionHeader title={title} actions={<OpenCreateTagForm />} />
			<TagsList />
			<Popups popupMap={popupMap} />
		</Container>
	);
});

export default TagsPage;
