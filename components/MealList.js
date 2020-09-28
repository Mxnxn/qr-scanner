import React from "react";

import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "../components/MealItem";
import { useSelector } from "react-redux";
const MealList = (props) => {
	const favMeals = useSelector((state) => state.meals.favMeals);

	const displayMeals = (itemData) => {
		const isFav = favMeals.some((meal) => meal.id === itemData.item.id);
		return (
			<MealItem
				itemData={itemData}
				onSelectMeal={() => {
					props.navigation.navigate({
						routeName: "MealDetail",
						params: {
							meal_id: itemData.item.id,
							mealTitle: itemData.item.title,
							bool: isFav,
						},
					});
				}}
			/>
		);
	};

	return (
		<View style={{ ...style.screen }}>
			<FlatList
				style={{ width: "100%" }}
				renderItem={displayMeals}
				data={props.listData}
			/>
		</View>
	);
};
const style = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default MealList;
