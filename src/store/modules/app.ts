import { defineStore } from "pinia";
import {
  type appType,
  getConfig,
  detectDeviceType,
  responsiveStorageNameSpace,
} from "../utils";

export const useAppStore = defineStore({
  id: "admin-app",
  state: (): appType => ({
    sidebar: {
      opened:
        localStorage.getItem(`${responsiveStorageNameSpace()}layout`)
          ?.sidebarStatus ?? getConfig().SidebarStatus,
      withoutAnimation: false,
      isClickCollapse: false,
    },
    // 这里的layout用于监听容器拖拉后恢复对应的导航模式
    layout:
      localStorage.getItem(`${responsiveStorageNameSpace()}layout`)?.layout ??
      getConfig().Layout,
    device: detectDeviceType() ? "mobile" : "desktop",
    // 浏览器窗口的可视区域大小
    viewportSize: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
  }),
  getters: {
    getSidebarStatus(state) {
      return state.sidebar.opened;
    },
    getDevice(state) {
      return state.device;
    },
    getViewportWidth(state) {
      return state.viewportSize.width;
    },
    getViewportHeight(state) {
      return state.viewportSize.height;
    },
  },
  actions: {
    TOGGLE_SIDEBAR(opened?: boolean, resize?: string) {
      const layout = localStorage.getItem(
        `${responsiveStorageNameSpace()}layout`
      );
      if (opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = true;
        layout.sidebarStatus = true;
      } else if (!opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = false;
        layout.sidebarStatus = false;
      } else if (!opened && !resize) {
        this.sidebar.withoutAnimation = false;
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.isClickCollapse = !this.sidebar.opened;
        layout.sidebarStatus = this.sidebar.opened;
      }
      localStorage.setItem(`${responsiveStorageNameSpace()}layout`, layout);
    },
    async toggleSideBar(opened?: boolean, resize?: string) {
      await this.TOGGLE_SIDEBAR(opened, resize);
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setLayout(layout) {
      this.layout = layout;
    },
    setViewportSize(size) {
      this.viewportSize = size;
    },
    setSortSwap(val) {
      this.sortSwap = val;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore();
}
