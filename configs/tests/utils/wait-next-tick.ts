export const waitNextTick = () => {
	return new Promise(process.nextTick);
};
