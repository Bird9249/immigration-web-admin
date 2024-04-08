export default (num: number): string => {
  const byteUnits = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (num === 0) return "0 bytes";
  const i = Math.floor(Math.log(num) / Math.log(1024));
  return parseFloat((num / Math.pow(1024, i)).toFixed(2)) + " " + byteUnits[i];
};
