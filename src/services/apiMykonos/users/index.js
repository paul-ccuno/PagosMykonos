import { del, get, post, put } from "../api.service";

export const getUsers = async () => {
  try {
    const res = await get({
      url: "administrador",
    });
    if (res?.status === "ERROR") throw res;
    res.forEach((user, i) => (user.id = i));
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUser = async ({ dni }) => {
  try {
    const res = await get({
      url: `administrador/buscar?DNI=${dni}`,
    });
    if (res?.status === "ERROR") throw res;
    res.forEach((user, i) => (user.id = i));
    return res[0];
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({ data }) => {
  try {
    const res = await post({
      url: "administrador/create",
      data,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async ({ data }) => {
  try {
    const res = await put({
      url: "administrador/password",
      data,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async ({ dni }) => {
  try {
    const res = await del({
      url: `administrador/eliminar?DNI=${dni}`,
    });
    console.log(res);
    if (res?.status === "ERROR") throw res;
    return res;
  } catch (error) {
    throw error;
  }
};

export const getLocalities = async () => {
  try {
    const res = await get({
      url: "localidades",
    });
    if (res?.status === "ERROR") throw res;
    const customRes = new Array(res.length);
    res.forEach(
      (locality, i) =>
        (customRes[i] = {
          id: locality.idLocalidad,
          label: locality.DISTRITOS_PERU,
        })
    );
    return customRes;
  } catch (error) {
    throw error;
  }
};
