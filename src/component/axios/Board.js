import request from "./axios";

export const createBoard = async (data) => {
  return await request.post("board", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createBoardNotImage = async (data) => {
  return await request.post("board/notImage", data);
};

export const retrieveAllBoard = async () => {
  return await request.get("board/all");
};

export const retrieveBoardById = async () => {
  return await request.get("board/{id}");
};
