import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
	AsyncStorage,
	Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { authBackend } from "../backend/authbackend";
const { height, width } = Dimensions.get("window");
const GridTile = (props) => {
	let ClickComponent = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version > 21) {
		ClickComponent = TouchableNativeFeedback;
	}
	return (
		<View
			style={{
				flex: 1,
				height: Math.round(0.185 * height),
				marginTop: 7,
				marginBottom: 7,
				marginLeft: 14,
				borderRadius: 18,
				overflow: "hidden",
			}}
		>
			<ClickComponent
				activeOpacity={0.76}
				style={{ flex: 1 }}
				onPress={async () => {
					//! detail method
					//? props.navigation.navigate({
					//?		routeName: "CategoryMeal",
					//? 	params: {
					//? 		title: itemData.item.title,
					//? 	},
					//? });
					//! short syntax
					if (props.itemData.item.id === "t1") {
						props.navigation.navigate("Scan", {
							id: "t1",
						});
					} else if (props.itemData.item.id === "t2") {
						try {
							const res = await authBackend.logout(
								await AsyncStorage.getItem("session_token")
							);
							if (res) {
								await AsyncStorage.clear();
								props.navigation.navigate("Login");
							}
						} catch (error) {
							console.log(
								"here::",
								error.response ? error.response.data : error
							);
							await AsyncStorage.clear();
							props.navigation.navigate("Login");
						}
					} else if (props.itemData.item.id === "t3") {
						props.navigation.navigate("Events");
					}
				}}
			>
				<View
					style={{
						flex: 1,
						...style.gridItem,
						...{ backgroundColor: props.itemData.item.color },
					}}
				>
					<View style={{ marginBottom: 8 }}>
						<MaterialIcons
							name={props.itemData.item.iconName}
							size={36}
							color="white"
						/>
					</View>
					<Text
						style={{
							color: Colors.white,
							fontSize: Math.round(0.048 * width),
							fontFamily: "GEB",
							letterSpacing: 3,
						}}
					>
						{`${props.itemData.item.title}`.toUpperCase()}
					</Text>
				</View>
			</ClickComponent>
		</View>
	);
};
const style = StyleSheet.create({
	gridItem: {
		overflow: "hidden",
		height: Math.round(0.185 * height),
		borderRadius: 18,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
		elevation: 5,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default GridTile;
