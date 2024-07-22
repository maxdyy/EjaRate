import axios from "axios";

export const searchBuildings = async (query: string) => {
  const { data } = await axios.get(`/api/buildings?name=${query}`);
  return data.buildings;
};

export const getBuildingData = async (id: string) => {
  const { data } = await axios.get(`/api/building?id=${id}`);
  return data.buildingData;
}

export const getReviewData = async (id: string) => {
  const { data } = await axios.get(`/api/review?id=${id}`);
  return data.reviewData;
}