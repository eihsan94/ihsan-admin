import { PermissionType } from "./enums";
type TPermissionType = typeof PermissionType

export interface Menu {
    label: string;
    href: string;
    children?: {
        label: string;
        href: string;
    }[];
}
export interface AppState {
    menus: Menu[];
    roles: Role[];
}
export interface UserDashboard {
    status?: number;
    error?: any;
    json: {
        menus: Menu[];
        admin?: {
            roles: Role[];
            users: User[];
        }
    }
}
export interface User {
    pk?: string;
    id?: string;
    sk?: string;
    GSI1PK?: string;
    role_pk: string;
    shop_pks?: string[];
    name?: string; // this cannot be changed by user
    nickname?: string; // this can be changed by user
    type?: string;
    image?: string;
    password?: string; // currently we only enabled login with provider so this is null
    birthday?: string;
    userPoint?: number;
    email: string;
}

export interface Role {
    pk?: string;
    role_permissions: PermissionType[];
    role_name: string;
}

export interface ReservationTicket {
    pk?: string;
    shop_pk: string;
    group_event_pk: string;
    user_id: string;
    purchase_date: string;
    reservation_no: string; // reservation_no
    isWaiting: {
        priority: number;
    }
}

export interface GroupEventSetting {
    online: {
        link: string;
        ihsanPostToken: string;
    };
    offline: {
        address: string;
        notes: string;
    }
    seat_limits: number;
}
export interface MemberNotificationSetting {
   role_pk: string;
   notification_period: 'ONE_MONTH_BEFORE' | 'TWO_WEEKS_BEFORE' | 'ONE_WEEK_BEFORE';
}
export interface Group {
    pk?: string;
    name: string;
    description: string; // コースの全体的な
    group_event_setting: GroupEventSetting;
    member_notification_settings: MemberNotificationSetting[];
}

export interface GroupEvent {
    pk?: string;
    group_pk: string;
    description: string; //クラスの内容
    date: string;
    start_time: string;
    end_time: string;
    vip_seats_customers: {
        user_id: string;
        price: number;
    }[];
    custom_group_event_setting: GroupEventSetting;
}
export interface Shop {
    pk?: string;
    group_pks?: string[];
    membership_pks: string[]
    name: string;
    image?: string;
    analytics: {
        weeklySale: number;
        topSubscriber: User[];
        customerBirthdays: {user:User}[];
        topGrossingGroups: {group: Group; sales: number}[];
    };
}
export interface Membership {
    pk?: string;
    shop_pk: string;
    price: number;
    name: string;
    description: string;
}

