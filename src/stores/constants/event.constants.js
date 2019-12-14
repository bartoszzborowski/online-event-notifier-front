import generateCrudConstants, {
  generateSingleRequest
} from "helpers/crudGenerator";
const basicCrud = generateCrudConstants("EVENT");
const attendConst = generateSingleRequest("EVENT", "ATTEND");
const searchConst = generateSingleRequest("EVENT", "SEARCH");
const crud = { ...basicCrud, ...attendConst, ...searchConst };
export { crud as eventConstants };
