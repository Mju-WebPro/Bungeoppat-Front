import request from "./axios/axios";

export const createCampaignPlan = async (data) => {
  return await request.post(`campaign`, data);
};
export const retrievePlanCampaign = async () => {
  return await request.get("campaign/planCampaign");
};
export const doCampaignRun = async (data) => {
  return await request.post("campaign/stateRun?campaignID=" + data);
};
export const retrieveRunCampaign = async () => {
  return await request.get("campaign/runCampaign");
};
export const doCampaignEnd = async (data) => {
  return await request.post("campaign/stateEnd?campaignID=" + data);
};
export const retrieveEndCampaign = async () => {
  return await request.get("campaign/endCampaign");
};
export const createCampaignResult = async (data) => {
  return await request.post("campaign/result?campaignID=" + data);
};
