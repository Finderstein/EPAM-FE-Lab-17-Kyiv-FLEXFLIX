import React, { useContext, useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "@firebase/auth";
import { dbFirestore, auth } from "../config/fbConfig";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password, firstname, lastname) {
		return createUserWithEmailAndPassword(auth, email, password).then(
			(resp) => {
				return setDoc(doc(dbFirestore, "users", resp.user.uid), {
					email,
					firstname,
					lastname,
					about: "",
					photo: "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png",
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

	const updateEmail = (email) => {
		return currentUser.updateEmail(email);
	};

	const updatePassword = (password) => {
		return currentUser.updatePassword(password);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const userAPI = {
		currentUser,
		signin,
		signup,
		signout,
		getUserInfo,
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
