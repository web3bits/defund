import { NotificationType, SystemNotification, useGlobalContext } from "../../context/GlobalContext";
import { Alert, AlertColor, AlertTitle, Container } from "@mui/material";

const severityMap = new Map([
  [NotificationType.ERROR, "error"],
  [NotificationType.WARNING, "warning"],
  [NotificationType.INFO, "info"],
  [NotificationType.SUCCESS, "success"],
]);

function capitalize(s: string): string {
  return s && s[0].toUpperCase() + s.slice(1);
}

export const Notifications = () => {
  const { notifications, closeNotification } = useGlobalContext();
  if (notifications.length === 0) {
    return null;
  }
  return (
    <Container sx={{ py: 1 }}>
      {notifications.map((notification: SystemNotification) => (
        <Alert
          severity={severityMap.get(notification.type) as AlertColor}
          key={notification.id}
          onClose={() => closeNotification(notification.id)}
          sx={{ mb: 1 }}
        >
          <AlertTitle>{notification.header || capitalize(severityMap.get(notification.type)!)}</AlertTitle>
          {notification.message}
        </Alert>
      ))}
    </Container>
  );
};
