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
import { Entypo } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const ItemTile = (props) => {
	let ClickComponent = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version > 21) {
		ClickComponent = TouchableNativeFeedback;
	}
	return (
		<View
			style={{
				flex: 1,
				height: Math.round(0.09 * height),
				marginTop: 7,
				marginBottom: 7,
				marginLeft: 14,
				marginRight: 14,
				borderRadius: 18,
				overflow: "hidden",
			}}
		>
			<ClickComponent
				activeOpacity={0.76}
				style={{ flex: 1 }}
				onPress={() => {
					props.navigation.navigate("ItemQR", {
						serial_name: props.itemData.item.serial_number,
					});
				}}
			>
				<View
					style={{
						flex: 1,
						...style.gridItem,
						...{ backgroundColor: `#482ff7` },
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							color: Colors.white,
							fontSize: Math.round(0.038 * width),
							fontFamily: "GEB",
							letterSpacing: 3,
						}}
					>
						{`${props.itemData.item.serial_number}`.toUpperCase()}
					</Text>
					<Text
						style={{
							color: Colors.white,
							fontSize: Math.round(0.038 * width),
							marginLeft: "auto",
							fontFamily: "GEB",
							letterSpacing: 3,
						}}
					>
						{`${props.itemData.item.assigned_quantity}`.toUpperCase()}
					</Text>
					<Entypo
						name="chevron-right"
						style={{ marginLeft: 10 }}
						size={24}
						color="white"
					/>
				</View>
			</ClickComponent>
		</View>
	);
};
const style = StyleSheet.create({
	gridItem: {
		overflow: "hidden",
		height: 70,
		borderRadius: 18,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
		elevation: 5,
		alignItems: "center",
		paddingHorizontal: 20,
	},
});

export default ItemTile;
