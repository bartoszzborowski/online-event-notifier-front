const generateCrudConstants = (SCOPE = "default") => {
  const create = generateSingleRequest(SCOPE, "CREATE");
  const update = generateSingleRequest(SCOPE, "UPDATE");
  const get = generateSingleRequest(SCOPE, "GET");
  const del = generateSingleRequest(SCOPE, "DELETE");

  return {
    ...create,
    ...update,
    ...get,
    ...del
  };
};

export const generateSingleRequest = (SCOPE, TYPE) => {
  return {
    [SCOPE + "_" + TYPE + "_REQUEST"]: `${SCOPE}_${TYPE}_REQUEST`,
    [SCOPE + "_" + TYPE + "_SUCCESS"]: `${SCOPE}_${TYPE}_SUCCESS`,
    [SCOPE + "_" + TYPE + "_FAILURE"]: `${SCOPE}_${TYPE}_FAILURE`
  };
};

export default generateCrudConstants;
