import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import EventTile from "../components/EventTile";
import dashboardBackend from "../backend/dashboardBackend";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";
import Colors from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const EventScreen = (props) => {
	const [events, setEvents] = useState({
		upcoming_events: [],
		ongoing_events: [],
	});

	const [loading, setloading] = useState(false);
	const getEvents = useCallback(async () => {
		try {
			const res = await dashboardBackend.getEvents();
			const upcoming_events = res.data.filter(
				(el) => new Date().getDate() < new Date(moment(el.start_date)).getDate()
			);
			const ongoing_events = res.data.filter(
				(el) =>
					new Date().getDate() >= new Date(moment(el.start_date)).getDate()
			);
			setEvents({
				upcoming_events: upcoming_events,
				ongoing_events: ongoing_events,
			});
			setloading(true);
		} catch (error) {
			if (error.response) return console.log(error.response.data);
			console.log(error);
			alert("Error fetching events");
		}
	}, []);

	useEffect(() => {
		getEvents();
	}, [getEvents]);

	const renderGridItems = (itemData) => {
		return <EventTile {...props} itemData={itemData} />;
	};

	return loading ? (
		<View
			style={{
				backgroundColor: "#fff",
				flex: 1,
				paddingTop: 7,
			}}
		>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				numColumns={1}
				data={events.ongoing_events}
				renderItem={renderGridItems}
				ListFooterComponent={() => (
					<FlatList
						keyExtractor={(item) => item.id.toString()}
						numColumns={1}
						data={events.upcoming_events}
						renderItem={renderGridItems}
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
									Upcoming
								</Text>
							</View>
						)}
					/>
				)}
			/>
		</View>
	) : (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" />
		</View>
	);
};

EventScreen.navigationOptions = (navigationOption) => {
	return {
		headerTitle: () => (
			<View style={{ justifyContent: "center" }}>
				<Text
					style={{
						fontFamily: "GEB",
						color: Colors.primary,
						fontSize: 24,
					}}
				>
					Events
				</Text>
			</View>
		),
	};
};

export default EventScreen;
