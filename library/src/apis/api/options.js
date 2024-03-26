import instance from "../utils/instance"
// utils 인스턴스
export const getAllBookTypeRequest = async() => {
  return await instance.get("/admin/book/option/types");
}

export const getAllCategoryRequest = async() => {
  return await instance.get("/admin/book/option/categories");
}