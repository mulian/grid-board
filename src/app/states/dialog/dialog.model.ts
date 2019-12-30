/**
 * The Setting tab option with direct number
 */
export enum SettingsTab {
    GENERAL=0, 
    SLIDE=1,
    HISTORY=2, 
    KEYBOARD=3, 
    JSINJECTION=4
}

/**
 * The DialogModdelSettings interface
 */
export interface DialogModelSettings {
    isShow: boolean
    currentTab: SettingsTab
}

/**
 * The Main Dialog Model
 */
export interface DialogModel {
    settings: DialogModelSettings
    isHelpShow: boolean
}