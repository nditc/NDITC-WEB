const fileValidator = (
  fileList: FileList | never[],
  accessType: string[],
  sizeLimit: number,
  fileLimit: number,
  accessTypeWarning: string
) =>
  new Promise((rs, rj) => {
    const ret = [];
    let size = 0;
    if (fileList && !(fileList.length <= 0)) {
      for (let i = 0; i < fileList.length; i++) {
        const arr = fileList[i];

        if (accessType.includes(arr.type)) {
          ret.push(arr);
          size += arr.size;
        } else if (!arr.type) {
          rj(accessTypeWarning);
        } else {
          rj(accessTypeWarning);
          break;
        }
      }
      if (ret.length <= fileLimit) {
        if (size > sizeLimit * 1024) {
          rj(`File must be less than ${sizeLimit}KB`);
        } else {
          rs(ret);
        }
      } else {
        rj(`Maximum ${fileLimit} files are allowed.`);
      }
    } else {
      rj('Unexpected Error!');
    }
  });

export default fileValidator;
