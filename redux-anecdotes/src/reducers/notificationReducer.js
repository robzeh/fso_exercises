const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const changeNotification = (notification, seconds) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, seconds * 1000);
  };
};

export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION",
});

export default notificationReducer;
