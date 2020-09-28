import { ADD_EVENT_TITLE } from "../actions/events";

const initialState = {
	title: "",
};

const EventReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_EVENT_TITLE:
			return { ...state, title: action.title };
		default:
			return state;
	}
};

export default EventReducer;
