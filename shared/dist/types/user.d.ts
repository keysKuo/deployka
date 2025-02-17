import { Types } from "mongoose";
export declare enum Level {
    REGULAR = "regular",
    PREMIUM = "premium",
    BUSINESS = "business"
}
export declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export type User = {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    gender: Gender;
    level: Level;
    upgradable?: () => boolean;
};
export type UserWithoutPassword = Omit<User, "password">;
//# sourceMappingURL=user.d.ts.map