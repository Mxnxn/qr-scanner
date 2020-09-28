import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import EventItemsReducer from "./store/reducers/items";

const rootReducer = combineReducers({
	items: EventItemsReducer,
	event: EventReducer,
});
const store = createStore(rootReducer);

enableScreens();
const fetchFonts = () => {
	return Font.loadAsync({
		GEB: require("./assets/fonts/GEB.otf"),
		GL: require("./assets/fonts/GL.otf"),
		AB: require("./assets/fonts/AB.ttf"),
		PR: require("./assets/fonts/PR.ttf"),
		JSB: require("./assets/fonts/JSB.ttf"),
		JSR: require("./assets/fonts/JSR.ttf"),
		NB: require("./assets/fonts/NB.ttf"),
		FB: require("./assets/fonts/FB.ttf"),
	});
};
import AppNavigations from "./navigations/AppNavigations";
import { Provider } from "react-redux";
import EventReducer from "./store/reducers/events";
export default function App() {
	const [fontLoaded, setFont] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading startAsync={fetchFonts} onFinish={() => setFont(true)} />
		);
	}

	return (
		<Provider store={store}>
			<AppNavigations />
		</Provider>
	);
}
