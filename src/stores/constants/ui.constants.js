import { generateSingleRequest } from "helpers/crudGenerator";

const getLocations = generateSingleRequest("UI", "GET_LOCATIONS");
const getTypes = generateSingleRequest("UI", "GET_TYPES");
const crud = { ...getLocations, ...getTypes };

export { crud as uiConstants };
