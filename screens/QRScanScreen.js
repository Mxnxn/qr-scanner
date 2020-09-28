import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	AsyncStorage,
	Platform,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import Constants from "../config";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
function QRScanScreen() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	const requestAgain = async () => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.CAMERA
		);
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			finalStatus = status;
		}
		setHasPermission(finalStatus === "granted");
	};

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = async ({ type, data }) => {
		setScanned(true);
		const parsedObject = JSON.parse(data);
		try {
			const res = await axios.get(
				`${Constants.API_URL}/serials/${parsedObject.serial_number}`,
				{
					headers: {
						Authorization: `Bearer ${await AsyncStorage.getItem(
							"session_token"
						)}`,
					},
				}
			);
			if (res.data.data.is_available === 0 && res.data.data.is_lost === 0) {
				alert(
					`${res.data.data.item_name}'s ${res.data.data.serial_number} has assigned in ${res.data.data.event_name}.`
				);
			}
			if (res.data.data.is_available === 1 && res.data.data.is_lost === 0) {
				alert(
					`${res.data.data.available_quantity} out of ${res.data.data.total_quantity} from ${res.data.data.item_name} are available and ${res.data.data.lost_quantity} has/have lost. `
				);
			}
			if (res.data.data.is_lost === 1) {
				alert(`This item might be lost somewhere.`);
			}
		} catch (error) {
			console.log(error.message);
			alert(`${error.response ? error.response.data.message : error.message}`);
		}
	};

	if (hasPermission === null) {
		return (
			<View style={{ marginTop: 20, flex: 1, alignItems: "center" }}>
				<Text style={{ fontFamily: "PR", fontSize: 20 }}>
					Requesting for camera permission
				</Text>
			</View>
		);
	}
	if (hasPermission === false) {
		return (
			<View style={{ marginTop: 20, flex: 1, alignItems: "center" }}>
				<Text style={{ fontFamily: "PR", fontSize: 20 }}>
					No access of camera
				</Text>
				{Platform.OS !== "ios" ? (
					<TouchableWithoutFeedback onPress={() => requestAgain()}>
						<Text style={{ fontFamily: "GEB", fontSize: 20, color: "#3d5af1" }}>
							Try again
						</Text>
					</TouchableWithoutFeedback>
				) : null}
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

			{scanned && (
				<Button
					style={{ alignSelf: "stretch" }}
					title={"Tap to Scan Again"}
					onPress={() => setScanned(false)}
					hardwareAccelerated
				/>
			)}
		</View>
	);
}

QRScanScreen.navigationOptions = (navigationOption) => {
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
					Scan
				</Text>
			</View>
		),
	};
};

export default QRScanScreen;
