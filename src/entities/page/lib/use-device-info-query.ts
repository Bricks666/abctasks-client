import { useStoreMap } from 'effector-react';
import { deviceInfoModel, Devices } from '../model';

export const useDeviceInfoQuery = (sizes: Devices | Devices[]): boolean => {
	return useStoreMap({
		store: deviceInfoModel.$device,
		keys: [sizes],
		defaultValue: false,
		fn: (device, [devices]) => {
			if (Array.isArray(devices)) {
				return devices.includes(device);
			}

			return device === devices;
		},
	});
};
