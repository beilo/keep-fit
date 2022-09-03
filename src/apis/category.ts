import { Http } from ".";

export const categoryFind = async (data: ICategoryFindParams) => {
  return Http.post<IApiModal<ICategoryFind[]>>("/category/find", data);
};
