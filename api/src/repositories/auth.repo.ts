import { KeyStore, UserDataResponse, UserGoogleLoginForm, UserLoginForm, UserRegistedForm } from "shared-types";
import { TokenPair } from "../constants";
import { Types } from "mongoose";


export interface AuthRepository {
    signUp(form: UserRegistedForm): Promise<UserDataResponse>; /* ✔️ */
    signIn(form: UserLoginForm): Promise<UserDataResponse>; /* ✔️ */
    signInWithGoogle(form: UserGoogleLoginForm): Promise<UserDataResponse>; /* ⚠️ */
    logout(userId: Types.ObjectId): Promise<KeyStore | null>; /* ✔️ */
    refreshToken(userId: Types.ObjectId): Promise<TokenPair>; /* ✔️ */
}
