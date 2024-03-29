import React from "react";

import { HeaderButton } from "react-navigation-header-buttons";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustHeaderButton = (props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Ionicons}
			iconSize={23}
			color={Colors.purple}
		/>
	);
};

export default CustHeaderButton;
