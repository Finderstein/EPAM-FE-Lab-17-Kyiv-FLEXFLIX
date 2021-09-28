import { useEffect, useRef } from "react";

export const useGetUserInfo = (user, getter, setter) => {
	const mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;
		getter(user).then((result) => {
			if (mounted.current) {
				setter(result);
			}
		});

		return () => {
			mounted.current = false;
		};
	}, []);
};
