import React, { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export enum NotificationType {
  ERROR,
  WARNING,
  INFO,
  SUCCESS,
}

export interface SystemNotification {
  id: string;
  message: string;
  header?: string;
  type: NotificationType;
}

interface IGlobalContext {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  addNotification: (type: NotificationType, message: string, header?: string) => void;
  closeNotification: (id: string) => void;
}

export const defaultGlobalContext: IGlobalContext = {
  isLoading: false,
  setLoading: () => {},
  addNotification: () => {},
  closeNotification: () => {},
};

export const GlobalContext = createContext<IGlobalContext>(defaultGlobalContext);

// @ts-ignore
export const GlobalContextProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  const addNotification = (type: NotificationType, message: string, header?: string) => {
    const newNotification: SystemNotification = {
      id: uuidv4(),
      type,
      message,
      header,
    };
    setNotifications([...notifications, newNotification]);
  };

  const closeNotification = (id: string) => {
    const notificationToDelete = notifications.find((n: SystemNotification) => n.id === id);
    if (!notificationToDelete) {
      return;
    }
    const notificationIdx = notifications.indexOf(notificationToDelete);
    if (notificationIdx > -1) {
      const notificationsCopy = [...notifications];
      notificationsCopy.splice(notificationIdx, 1);
      setNotifications(notificationsCopy);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setLoading,
        addNotification,
        closeNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
