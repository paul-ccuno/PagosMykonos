import { del, get, patch, post } from "../api.service";

export const getContracts = async () => {
  try {
    const res = await get({
      url: "contratos",
    });
    if (res?.status === "ERROR") throw res;
    res.forEach((contract) => (contract.id = contract.idContrato));
    console.log("retornando", res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getContract = async ({ id }) => {
  try {
    const res = await get({
      url: `contratos/especifico`,
      data: {
        idContrato: id,
      },
      body: true,
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
      url: "contratos/prueba",
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
      url: `contratos/delete`,
      data: { idContrato: id },
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCuotas = async ({ id }) => {
  try {
    const res = await get({
      url: "pagos/cliente",
      data: { idContrato: id },
      body: true,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCuota = async ({ data }) => {
  try {
    const res = await patch({
      url: "pagos/update",
      data,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};
