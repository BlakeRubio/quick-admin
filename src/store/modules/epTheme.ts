import { defineStore } from "pinia";
import { store, getConfig, responsiveStorageNameSpace } from "../utils";

export const useEpThemeStore = defineStore({
  id: "epTheme",
  state: () => ({
    epThemeColor:
      localStorage.getItem(`${responsiveStorageNameSpace()}layout`)
        ?.epThemeColor ?? getConfig().EpThemeColor,
    epTheme:
      localStorage.getItem(`${responsiveStorageNameSpace()}layout`)?.theme ??
      getConfig().Theme,
  }),
  getters: {
    getEpThemeColor(state) {
      return state.epThemeColor;
    },
    /** 用于mix导航模式下hamburger-svg的fill属性 */
    fill(state) {
      if (state.epTheme === "light") {
        return "#409eff";
      } else {
        return "#fff";
      }
    },
  },
  actions: {
    setEpThemeColor(newColor: string): void {
      const layout = localStorage.getItem(
        `${responsiveStorageNameSpace()}layout`
      );
      this.epTheme = layout?.theme;
      this.epThemeColor = newColor;
      if (!layout) return;
      layout.epThemeColor = newColor;
      localStorage.setItem(`${responsiveStorageNameSpace()}layout`, layout);
    },
  },
});

export function useEpThemeStoreHook() {
  return useEpThemeStore(store);
}
