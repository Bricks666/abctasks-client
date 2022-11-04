import { styled, SxProps } from '@mui/material';

export const StyledWrapper = styled('form')`
	display: grid;
	grid-template-columns: var(--login-form-template-columns);
	gap: 10px;

	@media (min-width: 600px) {
		--login-form-template-columns: max-content 1fr;
		--login-form-field-column: span 2;
	}

	@media (max-width: 600px) {
		--login-form-template-columns: 1fr;
		--login-form-field-column: 1;
	}
`;

export const fieldSx: SxProps = {
	gridColumn: 'var(--login-form-field-column)',
};
