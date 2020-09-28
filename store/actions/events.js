export const ADD_EVENT_TITLE = "ADD_EVENT_TITLE";

export const addEventTitleToRedux = (title) => {
	return { type: ADD_EVENT_TITLE, title: title };
};
