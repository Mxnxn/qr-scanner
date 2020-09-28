import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import ItemTile from "../components/ItemTile";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import MaterialButton from "../components/MaterialButton";
import Colors from "../constants/Colors";
const { width } = Dimensions.get("screen");
const ItemsScreen = (props) => {
	const unscannedSerials = useSelector((state) => state.items.unscanned);
	const serialItems = useSelector((state) => state.items.all);
	console.log("len :", serialItems.length);
	const scannedSerials = useSelector((state) => state.items.scanned);
	const [items, setItems] = useState([]);
	const [scannedItems, setScanned] = useState([]);

	const setParams = useRef(props.navigation.setParams);

	useEffect(() => {
		setItems([...unscannedSerials]);
		if (unscannedSerials.length === 0) {
			setParams.current({ unscanned: true });
		}
	}, [unscannedSerials]);

	useEffect(() => {
		console.log(scannedSerials);
		setScanned(scannedSerials);
	}, [scannedSerials]);

	const renderGridItems = (itemData) => {
		return <ItemTile {...props} itemData={itemData} />;
	};

	const evtName = useSelector((state) => state.event.title);

	useEffect(() => {
		setParams.current({
			event_name: evtName,
		});
	}, [setParams]);

	return serialItems.length > 0 ? (
		<View
			style={{
				backgroundColor: "#fff",
				flex: 1,
			}}
		>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				numColumns={1}
				data={items}
				renderItem={renderGridItems}
				ListFooterComponent={() =>
					scannedSerials.length > 0 && (
						<FlatList
							keyExtractor={(item) => item.id.toString()}
							numColumns={1}
							data={scannedItems}
							ListHeaderComponent={() => (
								<View
									style={{
										height: 50,
										overflow: "hidden",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text
										style={{
											color: Colors.primary,
											fontSize: Math.round(0.068 * width),
											fontFamily: "GEB",
											letterSpacing: 0,
											lineHeight: 40,
										}}
									>
										Scanned
									</Text>
								</View>
							)}
							renderItem={renderGridItems}
						/>
					)
				}
			/>
		</View>
	) : (
		<View
			style={{
				flex: 1,
				height: 70,
				paddingTop: 14,
				paddingBottom: 7,
				paddingLeft: 14,
				paddingRight: 14,
				borderRadius: 18,
				backgroundColor: "#fff",
				overflow: "hidden",
			}}
		>
			<View
				activeOpacity={0.76}
				style={{ height: 70 }}
				onPress={() => {
					props.navigation.navigate("Items");
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: `#482ff7`,
						overflow: "hidden",
						height: 70,
						borderRadius: 18,
						shadowOffset: { width: 0, height: 0 },
						shadowRadius: 5,
						shadowOpacity: 0.26,
						elevation: 5,
						alignItems: "center",
						paddingHorizontal: 20,
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							color: "white",
							fontSize: 20,
							fontFamily: "GEB",
							letterSpacing: 3,
						}}
					>
						No items have added!
					</Text>
				</View>
			</View>
		</View>
	);
};

ItemsScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: () => (
			<View style={{ justifyContent: "center" }}>
				<Text
					style={{
						fontFamily: "GEB",
						color: "#3d5af1",
						fontSize: 24,
					}}
				>
					{navigation.getParam("event_name")}
				</Text>
			</View>
		),
		headerRight: () => (
			<HeaderButtons
				style={{ marginRight: 5 }}
				HeaderButtonComponent={MaterialButton}
			>
				<Item
					title="qr_scan"
					iconName="qrcode-scan"
					size={24}
					onPress={(e) => navigation.navigate("ItemQR")}
				/>
				{navigation.getParam("unscanned") && (
					<Item
						title="done"
						iconName="check"
						size={24}
						onPress={(e) => alert("done")}
					/>
				)}
			</HeaderButtons>
		),
	};
};

export default ItemsScreen;
