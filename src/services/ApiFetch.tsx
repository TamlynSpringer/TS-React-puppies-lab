import http from '../http-common';
import { IPuppy } from '../types/types';

const getAll = () => {
  return http.get<Array<IPuppy>>('/puppies');
};

const get = (id: any) => {
  return http.get<IPuppy>(`/puppies/${id}`);
};

const create = (data: IPuppy) => {
  return http.post<IPuppy>("/puppies", data);
};

const update = (id: any, data: IPuppy) => {
  return http.put<any>(`/puppies/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/puppies/${id}`);
};

const ApiFetch = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ApiFetch;
