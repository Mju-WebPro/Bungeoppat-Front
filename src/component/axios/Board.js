import request from "./axios";

export const createBoard = async (data) => {
  return await request.post("board", data);
};

export const retrieveAllBoard = async () => {
  return await request.get("board/all");
};

export const retrieveBoardById = async (data) => {
  return await request.get("board/{data}");
};
