import userEvent from '@testing-library/user-event';

/**
 * User interaction simulator for thing required secure context
 */
export const user = userEvent.setup({
	writeToClipboard: true,
});
