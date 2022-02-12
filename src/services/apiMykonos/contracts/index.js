import { del, get, post, put } from "../api.service";

export const getContracts = async () => {
  try {
    const res = await get({
      url: "contratos",
    });
    if (res?.status === "ERROR") throw res;
    res.forEach((contract) => (contract.id = contract.idContrato));
    return res;
  } catch (error) {
    throw error;
  }
};

export const getContract = async ({ id }) => {
  try {
    const res = await get({
      url: `contratos/buscar?DNI=${id}`,
    });
    if (res?.status === "ERROR") throw res;
    res.forEach((contract, i) => (contract.id = contract.idContrato));
    return res[0];
  } catch (error) {
    throw error;
  }
};

export const createContract = async ({ data }) => {
  try {
    const res = await post({
      url: "contratos/create",
      data,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateContract = async ({ data }) => {
  try {
    const res = await put({
      url: "contratos/actualizar",
      data,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteContract = async ({ id }) => {
  try {
    const res = await del({
      url: `contratos/eliminar?DNI=${id}`,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};
