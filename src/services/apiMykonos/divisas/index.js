import { get } from "../api.service";

export const getDolar = async () => {
  try {
    const res = await get({
      url: "dolar/now",
    });
    if (res?.status === "ERROR") throw res;
    return res.TipoDeCambio;
  } catch (error) {
    throw error;
  }
};
