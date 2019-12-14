import generateCrudConstants, {
  generateSingleRequest
} from "helpers/crudGenerator";
const basicCrud = generateCrudConstants("EVENT");
const attendConst = generateSingleRequest("EVENT", "ATTEND");
const crud = { ...basicCrud, ...attendConst };
export { crud as eventConstants };
