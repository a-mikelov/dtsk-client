import {BackendErrorsInterface} from "../../shared/types/backend-errors.interface";
import {GetProductsResponseInterface} from "./get-products-response.interface";

export interface ProductsStateInterface {
  isLoading: boolean,
  data: GetProductsResponseInterface | null,
  backendErrors: BackendErrorsInterface | null
}
