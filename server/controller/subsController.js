import dataSubs from "../data/dataSubs";

export const getSubs = async (req, res) => {
  const data = dataSubs;
  console.log(data);
  res.json(dataSubs);
};