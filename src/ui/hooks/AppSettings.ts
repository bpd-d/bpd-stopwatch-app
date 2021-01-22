import { AppSettings } from "src/core/models";

export function useAppSettings(): AppSettings {
    return window.$appSettings.getSettings();
}