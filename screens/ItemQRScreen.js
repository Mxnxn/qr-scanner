import React, { useState, useEffect, useRef } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	AsyncStorage,
	Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import Constants from "../config";
import { useSelector, useDispatch } from "react-redux";
import { removeScannedItem } from "../store/actions/items";
function ItemQRScanScreen(props) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = async ({ type, data }) => {
		try {
			const parsedObject = JSON.parse(data);
			Alert.alert(
				"Scanned Successfully!",
				"Please confirm",
				[
					{
						text: "Cancel",
						onPress: () => true,
						style: "cancel",
					},
					{
						text: "OK",
						onPress: () => {
							dispatch(removeScannedItem(parsedObject.serial_number));
						},
					},
				],
				{ cancelable: false }
			);
			setScanned(true);
		} catch (error) {
			console.log(error);
			setScanned(true);
		}
	};

	if (hasPermission === null) {
		return (
			<View style={{ marginTop: 20, flex: 1 }}>
				<Text style={{ fontFamily: "GEB", letterSpacing: 3, fontSize: 16 }}>
					Requesting for camera permission
				</Text>
			</View>
		);
	}
	if (hasPermission === false) {
		return (
			<View style={{ marginTop: 20, flex: 1 }}>
				<Text style={{ fontFamily: "GEB", letterSpacing: 3, fontSize: 16 }}>
					No access of camera
				</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				justifyContent: "flex-end",
			}}
		>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned ? (
				<Button
					style={{ alignSelf: "stretch" }}
					title={"Tap to Scan Again"}
					onPress={() => setScanned(false)}
					hardwareAccelerated
				/>
			) : null}
		</View>
	);
}

ItemQRScanScreen.navigationOptions = (navigationOption) => {
	return {
		headerTitle: () => (
			<View style={{ justifyContent: "center" }}>
				<Text
					style={{
						fontFamily: "GEB",
						color: "#3d5af1",
						fontSize: 16,
					}}
				>
					{navigationOption.navigation.getParam("serial_name")}
				</Text>
			</View>
		),
	};
};

export default ItemQRScanScreen;
