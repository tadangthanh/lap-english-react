import { TypeGrammar } from "./../../modal/TypeGrammar";
import { apiUrl, del, get, post, put } from "../ApiUtils";

export const getTypeGrammarPage = async (
  page = 0,
  size = 10,
  sortBy?: String,
  direction?: String,
  typeGrammars?: String
) => {
  return await get(
    `${apiUrl}/type-grammar?page=${page}&size=${size}&sort=${sortBy},${direction}&typeGrammars=${typeGrammars}`
  );
};
export const createTypeGrammar = async (typeGrammar: TypeGrammar) => {
  return await post(`${apiUrl}/type-grammar`, 0, typeGrammar);
};
export const deleteTypeGrammar = async (id: number) => {
  return await del(`${apiUrl}/type-grammar/${id}`);
};
export const updateTypeGrammar = async (
  id: number,
  typeGrammar: TypeGrammar
) => {
  return await put(`${apiUrl}/type-grammar/${id}`, 0, typeGrammar);
};
