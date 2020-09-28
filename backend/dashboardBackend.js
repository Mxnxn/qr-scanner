import axios from "axios";
import Constants from "../config";
import { AsyncStorage } from "react-native";

class DashboardBackend {
	getEvents() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${Constants.API_URL}/events`, {
					headers: {
						Authorization: `Bearer ${await AsyncStorage.getItem(
							"session_token"
						)}`,
					},
				});
				if (res.data.code !== 200) throw res.data;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default dashboardBackend = new DashboardBackend();
