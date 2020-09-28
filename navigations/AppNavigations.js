import React, { useEffect, useState } from "react";
import {
	createAppContainer,
	StackActions,
	NavigationActions,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import DashboardScreen from "../screens/DashboardScreen";
import QRScanScreen from "../screens/QRScanScreen";
import LoginScreen from "../screens/LoginScreen";
import { AsyncStorage, ActivityIndicator, View, Text } from "react-native";
import EventScreen from "../screens/EventScreen";
import ItemsScreen from "../screens/ItemsScreen";
import { AppLoading } from "expo";
import ItemQRScanScreen from "../screens/ItemQRScreen";

const DashboardNavigator = createStackNavigator(
	{
		Selection: DashboardScreen,
		Scan: QRScanScreen,
		Events: EventScreen,
		Items: ItemsScreen,
		ItemQR: ItemQRScanScreen,
	},
	{
		initialRouteName: "Selection",
	}
);

class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem("session_token");
		// console.log("\ntoken:", (userToken + "").length, "\n");
		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		// this.props.navigation.navigate(userToken ? "Dashboard" : "Login");
		const resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: userToken ? "Dashboard" : "Login",
				}),
			],
		});
		this.props.navigation.dispatch(resetAction);
	};

	// Render any loading content that you like here
	render() {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}

const FlowNavigator = createStackNavigator(
	{
		Dashboard: DashboardNavigator,
		AuthLoading: AuthLoadingScreen,
		Login: {
			screen: LoginScreen,
			navigationOptions: {
				headerShown: false,
			},
		},
	},
	{
		initialRouteName: "AuthLoading",
		headerMode: "none",
	}
);

export default createAppContainer(FlowNavigator);
