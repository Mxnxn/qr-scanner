import React from "react";

import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import Colors from "../constants/Colors";
const MealItem = (props) => {
	return (
		<View style={{ ...style.outerView }}>
			<TouchableOpacity
				onPress={() => {
					props.onSelectMeal();
				}}
			>
				<View style={{ ...style.innerView }}>
					<ImageBackground
						source={{ uri: `${props.itemData.item.imageurl}` }}
						style={style.bgImage}
					>
						<View
							style={{ ...style.mealRow, backgroundColor: "rgba(0,0,0,0.4)" }}
						>
							<Text style={{ color: Colors.white }}>
								{props.itemData.item.title}
							</Text>
						</View>
						<View
							style={{ ...style.mealRow, backgroundColor: "rgba(0,0,0,0.4)" }}
						>
							<Text style={{ color: Colors.white }}>
								{props.itemData.item.duration} m
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View style={{ ...style.bottomRow }}>
					<View style={{ ...style.mealRow }}>
						<Text>{props.itemData.item.complexity}</Text>
					</View>
					<View style={{ ...style.mealRow }}>
						<Text>{props.itemData.item.affordability}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const style = StyleSheet.create({
	outerView: {
		marginHorizontal: 20,
		marginTop: 20,
		borderRadius: 8,
		backgroundColor: Colors.danger,
	},
	mealRow: {
		height: 20,
	},

	innerView: {
		height: 200,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.26,
		elevation: 3,
		shadowRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 6,
		paddingTop: 6,
		flex: 1,
	},
	bgImage: {
		height: "100%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	bottomRow: {
		flexDirection: "row",
		paddingHorizontal: 6,
		paddingVertical: 6,
		borderRadius: 8,
		justifyContent: "space-between",
	},
});

export default MealItem;
