import React from "react";

import { HeaderButton } from "react-navigation-header-buttons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const MaterialButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={MaterialCommunityIcons}
			iconSize={23}
			color={Colors.primary}
		/>
	);
};

export default MaterialButton;
