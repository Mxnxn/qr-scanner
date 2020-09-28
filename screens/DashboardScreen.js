import React, { useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	AsyncStorage,
	BackHandler,
	Alert,
} from "react-native";
import { CATEGORY } from "../data/dummy-data";
import DashboardTile from "../components/DashboardTile";
const DashboardScreen = (props) => {
	const renderGridItems = (itemData) => {
		return <DashboardTile {...props} itemData={itemData} />;
	};

	useEffect(() => {
		if (props.navigation.state.routeName === "Dashboard")
			BackHandler.addEventListener("hardwareBackPress", () => {
				return true;
			});
	}, []);

	return (
		<View
			style={{
				backgroundColor: "#fff",
				flex: 1,
				paddingRight: 14,
				paddingTop: 7,
			}}
		>
			<FlatList numColumns={2} data={CATEGORY} renderItem={renderGridItems} />
		</View>
	);
};

DashboardScreen.navigationOptions = (navigationData) => {
	return {
		//! for background color
		// headerStyle: {
		// 	backgroundColor: "#e2f3f5",
		// },
		headerTitle: () => (
			<View style={{ justifyContent: "center" }}>
				<Text
					style={{
						fontFamily: "GEB",
						color: "#3d5af1",
						fontSize: 24,
					}}
				>
					VideoWave
				</Text>
			</View>
		),
		//! for left side button
		// headerLeft: () => (
		// 	<HeaderButtons HeaderButtonComponent={HeaderButton}>
		// 		<Item
		// 			title="Menu"
		// 			iconName="ios-menu"
		// 			onPress={() => {
		// 				navigationData.navigation.toggleDrawer();
		// 			}}
		// 		></Item>
		// 	</HeaderButtons>
		// ),
	};
};

export default DashboardScreen;
