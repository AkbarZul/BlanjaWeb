import { getProductId } from "../../utility/Auth";
import actions from "./actionTypes";

export const getProductById = (id) => {
  return {
    type: actions.DETAIL_PRODUCT,
    payload: getProductId(id),
  };
};
