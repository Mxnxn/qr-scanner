export const ADD_ALL_ITEMS = "ADD_ALL_ITEMS";
export const REMOVE_SCANNED_ITEM = "REMOVE_SCANNED_ITEM";
export const RESET_ITEMS = "RESET_ITEMS";

export const addItemsToRedux = (items) => {
	return { type: ADD_ALL_ITEMS, items: items };
};

export const removeScannedItem = (serial_number) => {
	return { type: REMOVE_SCANNED_ITEM, serial_number: serial_number };
};

export const resetItems = () => {
	return { type: RESET_ITEMS };
};
