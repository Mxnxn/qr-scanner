import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Dimensions,
	Platform,
	TouchableNativeFeedback,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	AsyncStorage,
	BackHandler,
	Alert,
} from "react-native";
import { Switch } from "react-native-paper";
import { authBackend } from "../backend/authbackend";
import { NavigationActions, StackActions } from "react-navigation";
const { width, height } = Dimensions.get("window");
const LoginScreen = (props) => {
	let ButtonComponent = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}

	useEffect(() => {
		if (props.navigation.state.routeName === "Login")
			BackHandler.addEventListener("hardwareBackPress", () => {
				Alert.alert("Hold on!", "Do you want to exit?", [
					{
						text: "Yes",
						onPress: () => BackHandler.exitApp(),
					},
					{
						text: "No",
						onPress: () => null,
						style: "cancel",
					},
				]);
				return true;
			});
	}, []);

	const [focusFields, setFocusFields] = useState({
		email: false,
		password: false,
	});

	const [state, setState] = useState({
		input: {
			email: "abc@xyz.com",
			password: "cleartext",
			rememberMe: true,
		},
		validations: {
			email: false,
			password: false,
		},
	});

	const onSubmitHandler = async () => {
		setState({ ...state, validations: { email: false, password: false } });
		if (!state.input.email || !state.input.email.includes("@")) {
			return setState({
				...state,
				validations: { ...state.validations, email: true },
			});
		}
		if (!state.input.password || state.input.password.length < 8) {
			return setState({
				...state,
				validations: { ...state.validations, password: true },
			});
		}
		try {
			const formData = new FormData();
			formData.append("email", state.input.email);
			formData.append("password", state.input.password);
			const res = await authBackend.loginWithEmailandPassword(formData);
			if (state.input.rememberMe) {
				AsyncStorage.setItem("session_token", res.data.session_token);
				AsyncStorage.setItem("id", `res.data.id`);
				AsyncStorage.setItem("email", res.data.email);
			}
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: "Dashboard" })],
			});
			props.navigation.dispatch(resetAction);
		} catch (error) {
			console.log("error :", error);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				paddingHorizontal: Math.round((width * 7.5) / 100),
				backgroundColor: "#f0f0f0",
			}}
		>
			<View
				style={{
					justifyContent: "flex-end",

					height: Math.round((height * 18) / 100),
				}}
			>
				<Text
					style={{
						fontFamily: "GEB",
						color: "#3b4a6b",
						fontSize: (width * 5) / 100,
					}}
				>
					Welcome to!
				</Text>
				<Text
					style={{
						fontFamily: "GEB",
						color: "#3d5af1",
						fontSize: (width * 12) / 100,
					}}
				>
					VideoWaves
				</Text>
			</View>
			<View
				style={{
					height: Math.round(height * 40) / 100,
				}}
			>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<TextInput
						autoFocus={false}
						onFocus={(e) => {
							setFocusFields({ ...focusFields, email: true });
							setState({
								...state,
								validations: { ...state.validations, email: false },
							});
						}}
						onBlur={(e) => {
							setFocusFields({ ...focusFields, email: false });
							setState({
								...state,
								validations: { ...state.validations, email: false },
							});
						}}
						style={{
							paddingLeft: 15,
							height: 75,
							fontFamily: "JSB",
							fontSize: 20,
							borderBottomWidth: 3,
							borderBottomColor: !state.validations.email
								? focusFields.email
									? "#3d5af1"
									: "#3b4a6b"
								: "#ff5959",
							backgroundColor: "#fff",
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
						}}
						icon="mail"
						placeholder="Email"
						value={state.input.email}
						onChangeText={(text) =>
							setState({ ...state, input: { ...state.input, email: text } })
						}
					/>
					<TextInput
						autoFocus={false}
						onFocus={(e) => {
							setFocusFields({ ...focusFields, password: true });
							setState({
								...state,
								validations: { ...state.validations, password: false },
							});
						}}
						onBlur={(e) => {
							setFocusFields({ ...focusFields, password: false });
							setState({
								...state,
								validations: { ...state.validations, password: false },
							});
						}}
						validations={focusFields.password}
						style={{
							paddingLeft: 15,
							height: 75,
							marginTop: 12,
							fontFamily: "JSB",
							fontSize: 20,
							borderBottomWidth: 3,
							borderBottomColor: !state.validations.password
								? focusFields.password
									? "#3d5af1"
									: "#3b4a6b"
								: "#ff5959",
							backgroundColor: "#fff",
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
						}}
						secureTextEntry={true}
						value={state.input.password}
						onChangeText={(text) =>
							setState({ ...state, input: { ...state.input, password: text } })
						}
						placeholder="Password"
					/>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							marginTop: 12,
						}}
					>
						<Switch
							trackColor={{ false: "#3b4a6b", true: "#3d5af1" }}
							thumbColor={state.input.rememberMe ? "#fff" : "#f4f3f4"}
							borderBottomColor={state.input.rememberMe ? "#3d5af1" : ""}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(e) =>
								setState({
									...state,
									input: {
										...state.input,
										rememberMe: !state.input.rememberMe,
									},
								})
							}
							value={state.input.rememberMe}
						/>
						<Text
							style={{
								fontFamily: "GEB",
								color: "#3b4a6b",
								fontSize: 18,
								marginLeft: 12,
							}}
						>
							{" "}
							Remember Me
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
				}}
			>
				<View
					style={{
						height: 70,
						borderRadius: 50,
						overflow: "hidden",
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 4,
						},
						shadowOpacity: 0.32,
						shadowRadius: 5.46,
						elevation: 9,
					}}
				>
					<ButtonComponent onPress={onSubmitHandler} activeOpacity={0.85}>
						<View
							style={{
								height: 70,
								borderRadius: 50,
								overflow: "hidden",
								backgroundColor: "#3d5af1",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text
								style={{
									fontFamily: "GEB",
									fontSize: 24,
									color: "#fff",
									letterSpacing: 3,
								}}
							>
								LOGIN
							</Text>
						</View>
					</ButtonComponent>
				</View>
				<View
					style={{
						marginTop: 12,
						width: "100%",
						alignItems: "center",
					}}
				>
					<TouchableWithoutFeedback onPress={(e) => console.log("Forgot it?")}>
						<Text style={{ fontFamily: "GEB", fontSize: 22, color: "#3b4a6b" }}>
							Forget Password?
						</Text>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
};

export default LoginScreen;
