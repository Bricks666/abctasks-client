/* eslint-disable import/no-extraneous-dependencies */
import { CtxOptions } from '@reatom/framework';
import { TestCtx, createTestCtx as originCreateTestCtx } from '@reatom/testing';

const createTestCtx = (options?: CtxOptions): TestCtx => {
	return originCreateTestCtx({ restrictMultipleContexts: false, ...options, });
};

export * from '@reatom/testing';
export { Scope, allSettled, fork, scopeBind } from 'effector';
export { createTestCtx };
