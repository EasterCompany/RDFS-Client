
const fileSize = (bytes:number):string => {
  const thresh = 1024;
  if (Math.abs(bytes) < thresh) return bytes + 'B';
  const units = ['KB', 'MB', 'GB', 'TB'];
  let u = -1;
  do {bytes /= thresh; ++u;} while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + units[u];
};


export default fileSize;
