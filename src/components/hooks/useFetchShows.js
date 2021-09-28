import { useEffect, useRef } from "react";

export const useFetchShows = (fetcher, setter) => {
	const mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;
		fetcher().then((result) => {
			if (mounted.current) {
				setter(result);
			}
		});

		return () => {
			mounted.current = false;
		};
	}, []);
};
