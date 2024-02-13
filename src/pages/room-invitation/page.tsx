import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { InvitationCard } from '@/widgets/invitations';
import { MainHeader } from '@/widgets/page';

import {
	SkeletonInvitationCard,
	invitationViaTokenModel
} from '@/entities/invitations';

import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Center, Layout } from '@/shared/ui';

import styles from './styles.module.css';

const RoomsPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-invitation');
	const title = t('title');
	usePageTitle(title);

	return (
		<Layout
			className={cn(styles.layout, className)}
			slots={{
				header: <MainHeader />,
			}}>
			<Center>
				<Loading />
				<Result />
			</Center>
		</Layout>
	);
};

const Loading: React.FC = () => {
	const loaded = useUnit(invitationViaTokenModel.$loaded);

	if (loaded) {
		return null;
	}

	return <SkeletonInvitationCard />;
};

const Result: React.FC = () => {
	const invitation = useUnit(invitationViaTokenModel.query.$data);

	if (!invitation) {
		return null;
	}

	return <InvitationCard {...invitation} />;
};

export default RoomsPage;
