const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const changeNotification = (noti) => {
  return {
    type: "SET_NOTIFICATION",
    notification: noti,
  };
};

export default notificationReducer;
