export const config = () => ({
  port: process.env.PORT,
  multilogin: {
    profiles: {
      folderId: process.env.MULTILOGIN_FOLDER_ID,
      wokrspaceId: process.env.MULTILOGIN_WORKSPACE_ID,
    },
    localApi: {
      baseURL: process.env.MULTILOGIN_LOCAL_BASE_URL,
      timeout: Number(process.env.MULTILOGIN_LOCAL_TIMEOUT),
      headers: {
        Authorization: `Bearer ${process.env.MULTILOGIN_API_TOKEN}`,
      },
    },
    webApi: {
      baseURL: process.env.MULTILOGIN_WEB_BASE_URL,
      timeout: Number(process.env.MULTILOGIN_WEB_TIMEOUT),
      headers: {
        Authorization: `Bearer ${process.env.MULTILOGIN_API_TOKEN}`,
      },
    },
  },
  gologin: {
    localApi: {
      baseURL: process.env.GOLOGIN_LOCAL_BASE_URL,
      timeout: Number(process.env.GOLOGIN_LOCAL_TIMEOUT),
    },
    webApi: {
      baseURL: process.env.GOLOGIN_WEB_BASE_URL,
      timeout: Number(process.env.GOLOGIN_WEB_TIMEOUT),
      headers: {
        Authorization: `Bearer ${process.env.GOLOGIN_API_TOKEN}`,
      },
    },
  },
});
