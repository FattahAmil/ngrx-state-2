import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";


export const authFeaturesSelector=createFeatureSelector<AuthState>("auth")

export const isLoggedIn=createSelector(
    authFeaturesSelector,
    auth=> !!auth.user
);

export const isLoggedOut=createSelector(
    isLoggedIn,
    loggedIn=>!loggedIn
);
