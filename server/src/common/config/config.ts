import type { AxiosRequestConfig } from 'axios';

export const config = () => {
  const multiloginOptions: AxiosRequestConfig = {
    baseURL: process.env.MULTILOGIN_BASE_URL,
    timeout: Number(process.env.MULTILOGIN_TIMEOUT),
    headers: {
      Authorization: `Bearer ${process.env.MULTILOGIN_API_TOKEN}`,
    },
  };

  return {
    port: process.env.PORT,
    multilogin: multiloginOptions,
  };
};
