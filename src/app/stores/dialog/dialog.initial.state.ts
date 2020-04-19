import { DialogModel, DialogModelSettings, SettingsTab } from "./dialog.model";

/**
 * The initial set for Settings dialog
 */
export const dialogInitialStateSettings: DialogModelSettings = {
    currentTab: SettingsTab.GENERAL,
    isShow: false
}

/**
 * The Main Dialog initial set
 */
export const dialogInitialState: DialogModel = {
    settings: dialogInitialStateSettings,
    isHelpShow: false,
}