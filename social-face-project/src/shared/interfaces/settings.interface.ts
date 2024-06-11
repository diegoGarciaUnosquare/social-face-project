import { NotificationPreference } from "../enums/notification-preference.enum";

export interface Settings {
    notificationsPreference: NotificationPreference;
    phone: string;
    username: string;
    profileVisibility: boolean;
}