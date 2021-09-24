// Get today string
const now = new Date();
const strNow =
	now.getFullYear() +
	"-" +
	("0" + (now.getMonth() + 1)).slice(-2) +
	"-" +
	now.getUTCDate();

// Get airing today shows
const getTodayShows = async (setShows, targetNumber = 8) => {
	const response = await fetch(
		`https://api.tvmaze.com/schedule?date=${strNow}`
	);
	if (!response.ok) {
		throw response;
	}

	const data = await response.json();
	const shows = data.map((item) => item.show); // Get only shows data
	shows.sort((a, b) => {
		return +b.weight - +a.weight;
	}); // Sort by weight AKA popularity

	const uniqueID = new Set();
	const todayShows = shows
		.filter((show) => {
			if (!uniqueID.has(show.id)) {
				uniqueID.add(show.id);
				return true;
			}
			return false;
		}) // Only unique entries by show ID
		.slice(0, targetNumber);

	setShows(todayShows);
};

// Get random shows
const getRandomShows = async (setShows) => {
	let data;

	// Finding last page. Not the most reliable method but pretty fast
	let lastPage = false;
	let pageNum = 231; // Last known not empty page
	while (!lastPage) {
		/* Ignore error if failed to fetch.
			It is because the page is empty and now we found out the last page. */
		const response = await fetch(
			`https://api.tvmaze.com/shows?page=${pageNum}`
		);

		if (!response.ok) {
			lastPage = true;
		} else {
			data = await response.json();
			if (data.length !== 0) {
				pageNum++;
			}
		}
	}

	// Retrieving biggest show id from data on the last page
	const biggestID = data[data.length - 1].id;

	// Getting and setting random shows in range
	const randomShowsArray = [];
	const randomShowsIDSet = new Set();

	for (let i = 0; i < 4; i++) {
		const randomID = Math.floor(Math.random() * (biggestID - 1 + 1)) + 1; // max and min including

		/* Ignore error if failed to fetch.
			Some ID's are empty. If we don't want to get ALL shows and check 
			if this ID exist than it is unavoidable that there will be some empty ID's */
		const response = await fetch(
			`https://api.tvmaze.com/shows/${randomID}`
		);
		if (!response.ok) {
			i--;
			continue;
		}

		const show = await response.json();

		// Checking if unique, has image and rating. If not, try again
		if (
			randomShowsIDSet.has(show.id) ||
			!show.image ||
			!show.rating.average
		) {
			i--;
			continue;
		}

		randomShowsArray.push(show);
	}

	setShows(randomShowsArray);
};

export { getRandomShows, getTodayShows };
