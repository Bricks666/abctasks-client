import * as React from 'react';
import { CommonProps } from '@/types/common';
import { StyledWrapper } from './styles';

export interface TemplateNameProps extends CommonProps {}

export const TemplateName: React.FC<TemplateNameProps> = React.memo(
	function TemplateName(props) {
		const { className } = props;
		return <StyledWrapper className={className}>{null}</StyledWrapper>;
	}
);
