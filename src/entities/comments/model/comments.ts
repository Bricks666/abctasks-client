import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Array } from 'runtypes';

import { Comment, comment, commentsApi } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { getStandardResponse } from '@/shared/types';

const commentsDomain = createDomain();

const handlerFx = commentsDomain.effect(commentsApi.getAll);

export const query = createQuery({
	initialData: [] as Comment[],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(comment))),
	mapData: dataExtractor,
});

cache(query);
