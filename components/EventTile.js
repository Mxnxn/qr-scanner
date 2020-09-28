import React, { useEffect } from "react";
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
import moment from "moment";
import { useDispatch } from "react-redux";
import { addItemsToRedux, resetItems } from "../store/actions/items";
import { addEventTitleToRedux } from "../store/actions/events";
const { height, width } = Dimensions.get("window");
const getDateInDDMMYYYY = (arg) => {
	const date = new Date(moment(arg));
	let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	let mm = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
	let yyyy = date.getFullYear();
	return `${dd}-${mm}-${yyyy}`;
};
const EventTile = (props) => {
	let ClickComponent = TouchableOpacity;
	const dispatch = useDispatch();

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
				marginRight: 14,
				borderRadius: 18,
				overflow: "hidden",
			}}
		>
			<ClickComponent
				activeOpacity={0.76}
				style={{ flex: 1 }}
				onPress={() => {
					dispatch(resetItems());
					dispatch(addItemsToRedux(props.itemData.item.items));
					dispatch(addEventTitleToRedux(props.itemData.item.name));
					props.navigation.navigate("Items");
				}}
			>
				<View
					style={{
						flex: 1,
						...style.gridItem,
						...{ backgroundColor: `#${props.itemData.item.priority}` },
						flexDirection: "column",
					}}
				>
					<Text
						style={{
							color: Colors.white,
							fontSize: Math.round(0.048 * width),
							fontFamily: "GEB",
							letterSpacing: 3,
						}}
					>
						{`${props.itemData.item.name}`.toUpperCase()}
					</Text>
					<Text
						style={{
							color: Colors.white,
							fontSize: Math.round(0.038 * width),
							fontFamily: "FB",
							letterSpacing: 3,
						}}
					>
						{`Start: ${getDateInDDMMYYYY(
							props.itemData.item.start_date
						)}\nEnd: ${getDateInDDMMYYYY(props.itemData.item.end_date)}`}
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

export default EventTile;
