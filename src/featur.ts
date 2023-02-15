import { useDispatch,useSelector } from "react-redux";
import type {TypedUseSelectorHook} from "react-redux";
import type {AppDispatch,RootType} from './index'

export const useAppDispatch:()=>AppDispatch=useDispatch;
export const useAppSelecter: TypedUseSelectorHook<RootType> =useSelector;