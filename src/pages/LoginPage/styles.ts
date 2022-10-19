import { styled } from '@mui/material';
import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginForm } from '@/components/LoginForm';
import { SaveLink } from '@/components/SaveLink';

export const StyledLayout = styled(AuthLayout)`
	display: grid;
	grid-template-rows: repeat(3, min-content);
	row-gap: 1.5rem;
`;

export const StyledForm = styled(LoginForm)`
	width: 100%;
`;

export const StyledLink = styled(SaveLink)`
	width: max-content;
	justify-self: end;
`;
