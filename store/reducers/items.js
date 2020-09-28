import {
	ADD_ALL_ITEMS,
	REMOVE_SCANNED_ITEM,
	RESET_ITEMS,
} from "../actions/items";

const initialState = {
	all: [],
	unscanned: [],
	scanned: [],
};

const EventItemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ALL_ITEMS:
			return { ...state, unscanned: [...action.items], all: [...action.items] };
		case REMOVE_SCANNED_ITEM:
			const newUnscanned = [...state.unscanned];
			const newScanned = [...state.scanned];
			console.log(typeof action.serial_number);
			const index = newUnscanned.findIndex(
				(el) => el.serial_number.toString() === action.serial_number.toString()
			);
			if (index !== -1) {
				const temp = { ...newUnscanned[index] };
				newUnscanned.splice(index, 1);
				newScanned.push(temp);
			}
			return { ...state, scanned: newScanned, unscanned: newUnscanned };
		case RESET_ITEMS:
			return { ...initialState };
		default:
			return state;
	}
};

export default EventItemsReducer;
