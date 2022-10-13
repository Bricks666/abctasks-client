import { useParams } from 'react-router-dom';
import { useImminentlyQuery } from '@/hooks';
import { getActivitiesQuery } from '@/models/activities';

export const useActivities = () => {
	const { id: roomId } = useParams();

	return useImminentlyQuery(getActivitiesQuery, Number(roomId), roomId);
};
