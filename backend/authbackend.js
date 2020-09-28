import axios from "axios";
import Constants from "../config";
import { AsyncStorage } from "react-native";

class AuthBackend {
	loginWithEmailandPassword(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(
					`${Constants.API_URL}/user/login`,
					formData
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	logout(token) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(
					`${Constants.API_URL}/user/logout`,
					// {},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export let authBackend = new AuthBackend();
