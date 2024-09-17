import axios from "axios";
import { RegionResponse, TypeResponse } from "../type";

const getRegionsApi = () => axios.get<RegionResponse>("/api/regions");
const getTypesApi = () => axios.get<TypeResponse>("/api/types");
const getAllDatasource = () => axios.get<any[]>(`/api/datasources`);
const addDataSourceApi = (datasource: any) =>
  axios.post<RegionResponse>("/api/datasource/upsert", datasource);
const getDatasourceByUUID = (uuid: string | undefined) =>
  axios.get<any>(`/api/datasource/${uuid}`);

const updateDataSourceApi = (datasource: any) =>
  axios.post<RegionResponse>("/api/datasource/upd", datasource);

const delDatasourceByUUID = (uuid: string | undefined) =>
  axios.delete<any>(`/api/datasource/${uuid}`);

const getCustomer = () => axios.get<any>("/api/customer");
const addCustomer = (customer: any) =>
  axios.post<any>("/api/customer", customer);

const updCustomer = (id: string, customer: any) =>
  axios.put<any>(`/api/customer/${id}`, customer);

const delCustomer = (id: string) => axios.delete<any>(`/api/customer/${id}`);

export {
  addCustomer,
  addDataSourceApi,
  delCustomer,
  delDatasourceByUUID,
  getAllDatasource,
  getCustomer,
  getDatasourceByUUID,
  getRegionsApi,
  getTypesApi,
  updateDataSourceApi,
  updCustomer,
};
