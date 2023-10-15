import { Container } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { Popups, PopupsProps } from '@/widgets/page';

import { CreateTag, OpenCreateTagForm, UpdateTag } from '@/features/tags';

import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { TagsList } from './ui';


export interface TagsPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTag]: CreateTag,
	[popupsMap.updateTag]: UpdateTag,
};

const TagsPage: React.FC<TagsPageProps> = React.memo(function TagsPage(props) {
	const { className, } = props;

	return (
		<Container className={cn(styles.container, className)}>
			<SectionHeader title='Tags' actions={<OpenCreateTagForm />} />
			<TagsList />
			<Popups popupMap={popupMap} />
		</Container>
	);
});

export default TagsPage;
