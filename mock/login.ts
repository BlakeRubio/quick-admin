// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: () => {
      return {
        success: true,
        data: {
          avatar: "https://avatars.githubusercontent.com/u/157472085?v=4",
          username: "admin",
          nickname: "admin",
          roles: ["admin"],
          permissions: ["*:*:*"],
          accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
          refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
          expires: "2030/10/30 00:00:00",
        },
      };
    },
  },
]);
