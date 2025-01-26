import { Pagination, PaginationItem } from '@mui/material';
import { useAtom } from '@reatom/npm-react';
import { ChangeEvent, FC } from 'react';

import { CommonProps } from '@/shared/types';

import { usePagination } from '../lib';
import { OnPageChanged } from '../model';

export interface ActivitiesPaginationProps extends CommonProps {
	readonly pageCount: number;
	readonly onPageChanged: OnPageChanged;
}

export const ActivitiesPagination: FC<ActivitiesPaginationProps> = (props) => {
	const { className, onPageChanged, pageCount, } = props;

	const model = usePagination({ name: 'activities', onPageChanged, });

	const [page, setPage] = useAtom(model.pageAtom);

	const setNewPage = (_: ChangeEvent<unknown>, page: number) => {
		setPage(page);
	};

	// @todo Add localization for aria-labels of pagination
	return (
		<Pagination
			className={className}
			count={pageCount}
			page={page}
			onChange={setNewPage}
			color='primary'
			size='large'
			renderItem={(item) => {
				return <PaginationItem {...item} role='link' />;
			}}
		/>
	);
};
