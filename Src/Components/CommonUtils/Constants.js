import moment from "moment";

export const DiffMin = (dt1, da) => {
  //console.log(da);
  let dif = moment(dt1).add(da, "days") - moment();
  dif = Math.round(dif / 1000);
  return dif > 0 ? dif : 0;
};
