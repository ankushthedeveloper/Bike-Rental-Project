import { AxiosError } from "axios";

import { ServiceResponse } from "@/types/response";
import instance from "@/config";
import store from "@/store";
import { clearUser } from "@/lib/states/auth.slice";

export const getService = async (
  url: string,
  params?: Record<string, unknown>,
  headers?: Record<string, unknown>,
  signal?: AbortSignal
) => {
  try {
    const response = await instance.get(url, {
      params,
      headers: { Accept: "application/json", ...headers },
      signal,
    });

    return {
      statusCode: response?.data?.status || 200,
      data: response?.data,
      message: response?.data?.message,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        statusCode: e.response?.data.statusCode || 400,
        data: null,
        message: e?.response?.data?.message || "Network Error",
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

export const getServiceData = async (
  url: string,
  params?: Record<string, unknown>,
  headers?: Record<string, unknown>,
  signal?: AbortSignal
) => {
  try {
    const response = await instance.get(url, {
      params,
      headers: { Accept: "application/json", ...headers },
      signal,
    });
    console.log("getService response final:", response);
    return {
      status: true,
      data: response.data,
      message: "",
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        status: false,
        data: null,
        message: e?.response?.data?.message || "Network Error",
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

// TODO:remove temp url
export const postService = async (
  url: string,
  data: Record<string, unknown> | FormData,
  params?: Record<string, unknown>,
  headers?: Record<string, unknown>
) => {
  try {
    const response = await instance.post(url, data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/formdata" : "application/json",
        ...headers,
      },
      params,
    });

    return {
      statusCode: response?.data?.statusCode || 201,
      data: response?.data?.data,
      message: response?.data?.message,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        statusCode: e.response?.data.statusCode || 400,
        data: null,
        message: e?.response?.data?.message || "Network Error",
      };
    }
    return {
      statusCode: 500,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

export const deleteService = async (
  url: string,
  params?: Record<string, unknown>,
  data?: Record<string, unknown>
) => {
  try {
    const response = await instance.delete(url, {
      data,
      params,
    });

    return {
      status: response?.data?.success,
      data: response?.data?.data,
      message: response?.data?.message,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        status: false,
        data: null,
        message: e?.response?.data?.message || "Network Error",
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

export const putService = async (
  url: string,
  data: Record<string, unknown> | FormData,
  params?: Record<string, unknown>
) => {
  try {
    const response = await instance.put(url, data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/formdata" : "application/json",
      },
      params,
    });

    return {
      status: response?.data?.success,
      data: response?.data?.data,
      message: response?.data?.message,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        statusCode: e.response?.data.statusCode || 400,
        data: null,
        message: e?.response?.data?.message || "Network Error",
      };
    }
    return {
      status: false,
      data: null,
      message: "Something went wrong, please try again later",
    };
  }
};

// export const downloadService = async (
//   url: string,
//   data: Record<string, unknown>,
//   params?: Record<string, unknown>,
//   headers?: Record<string, unknown>,
//   filename: string = "annotation.json"
// ): Promise<ServiceResponse<null>> => {
//   try {
//     const response = await instance.post(url, data, {
//       headers: { ...headers, "Content-Type": "application/json" },
//       responseType: "blob",
//       params,
//     });

//     const blob = new Blob([response.data]);
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.setAttribute("download", filename);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     return {
//       status: true,
//       data: null,
//       message: "File downloaded successfully",
//     };
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       return {
//         status: false,
//         data: null,
//         message: error?.response?.data?.message || "Network Error",
//       };
//     }
//     return {
//       status: false,
//       data: null,
//       message: "An error occurred during the file download",
//     };
//   }
// };
