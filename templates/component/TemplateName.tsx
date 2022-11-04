import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types';

import styles from './TemplateName.module.css';

export interface TemplateNameProps extends CommonProps {}

export const TemplateName: React.FC<TemplateNameProps> = React.memo(
	function TemplateName(props) {
		const { className } = props;
		return null;
	}
);
