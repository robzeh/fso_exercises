import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(url);
  return req.then((response) => response.data);
};

const create = (newPerson) => {
  const req = axios.post(url, newPerson);
  return req.then((response) => response.data);
};

const update = (id, newPerson) => {
  const req = axios.put(`${url}/${id}`, newPerson);
  return req.then((response) => response.data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${url}/${id}`);
  return req.then((res) => res);
};

export default { getAll, create, update, deletePerson };
