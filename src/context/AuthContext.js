import React, { useContext, useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
} from "@firebase/auth";
import { dbFirestore, auth, storage } from "../config/fbConfig";
import {
	doc,
	getDoc,
	onSnapshot,
	setDoc,
	updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

// const test = async () => {
// 	// Solution 1
// 	const querySnapshot = await getDocs(collection(dbFirestore, "test"));
// 	querySnapshot.forEach((doc) => {
// 		// doc.data() is never undefined for query doc snapshots
// 		console.log(doc.id, " => ", doc.data());
// 	});

// 	// Solution 2
// 	const citiesCol = collection(dbFirestore, "test");
// 	const citySnapshot = await getDocs(citiesCol);
// 	const cityList = citySnapshot.docs.map((doc) => doc.data());
// 	cityList.forEach((doc) => {
// 		// doc.data() is never undefined for query doc snapshots
// 		console.log(doc);
// 	});
// };

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [userInfo, setUserInfo] = useState();
	const [userPhoto, setUserPhoto] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password, firstname, lastname) {
		return createUserWithEmailAndPassword(auth, email, password).then(
			(resp) => {
				return setDoc(doc(dbFirestore, "users", resp.user.uid), {
					email,
					firstname,
					lastname,
					about: "",
					favGenres: [],
					photo: "",
					friends: [],
					favourite: [],
					recommendedToUser: [],
				});
			}
		);
	}

	const signin = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signout = () => {
		return signOut(auth);
	};

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	};

	const getUserInfo = async (user) => {
		if (user) {
			const docRef = doc(dbFirestore, "users", user.uid);
			return (await getDoc(docRef)).data();
		}
		return null;
	};

	const updateUserEmail = async (email, pass, newEmail) => {
		const credentials = EmailAuthProvider.credential(email, pass);
		const user = auth.currentUser;
		return reauthenticateWithCredential(user, credentials)
			.then(() => {
				return updateEmail(user, newEmail);
			})
			.then(() => {
				return updateDoc(doc(dbFirestore, "users", user.uid), {
					email: newEmail,
				});
			});
	};

	const updateUserPassword = async (email, oldPass, newPass) => {
		const credentials = EmailAuthProvider.credential(email, oldPass);
		console.log(email, oldPass, newPass, credentials);
		const user = auth.currentUser;
		return reauthenticateWithCredential(user, credentials)
			.then(() => {
				return updatePassword(user, newPass);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const updateProfilePhoto = async (photo) => {
		if (!currentUser) {
			return null;
		}

		const refStr = `${currentUser.uid}/${photo.name}`;

		return uploadBytes(ref(storage, refStr), photo).then(() => {
			return updateDoc(doc(dbFirestore, "users", currentUser.uid), {
				photo: refStr,
			});
		});
	};

	const updateInfo = async (data) => {
		return updateDoc(doc(dbFirestore, "users", currentUser.uid), {
			firstname: data.firstname,
			lastname: data.lastname,
			about: data.about,
			favGenres: data.favGenres,
		});

		// .then(() => {
		// 	const credential = promptForCredentials();
		// 	return reauthenticateWithCredential(currentUser, credential);
		// })
		// .then(() => {
		// 	return updateUserEmail(data.email);
		// });
	};

	const getProfilePhoto = (user) => {
		if (!user) {
			return null;
		}

		return getDownloadURL(ref(storage, user.photo)).then((url) => {
			return url;
		});
	};

	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribeAuth;
	}, []);

	useEffect(() => {
		if (!currentUser) {
			return;
		}

		const unsubscribeInfo = onSnapshot(
			doc(dbFirestore, "users", currentUser.uid),
			(doc) => {
				const user = doc.data();
				setUserInfo(user);
				getDownloadURL(ref(storage, user.photo)).then((url) => {
					setUserPhoto(url);
					setLoading(false);
				});
			}
		);

		return unsubscribeInfo;
	}, [currentUser]);

	const userAPI = {
		currentUser,
		userInfo,
		userPhoto,
		signin,
		signup,
		signout,
		updateUserPassword,
		updateUserEmail,
		updateProfilePhoto,
		updateInfo,
		getUserInfo,
		getProfilePhoto,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={userAPI}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
