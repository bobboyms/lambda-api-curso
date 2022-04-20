import {Empty, Optional} from "../../utils/Optional";

export interface FindById<T> {
    findById(id:string):Promise<Optional<T | Empty>>
}