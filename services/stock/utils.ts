// const regexStock = /\/stock\s(\[(\w+)\])(\[(\d+)\])(\[(\d+\/\d+\/\d+)\])\[([+-]?((\d+(\.\d*)?)|(\.\d+)))\]/gim;
// const regexStock = /stock\s(\[\w+\])(\[(\w+)\])(\[(\w+\/\w+\/\w+)\])\[([+-]?((\d+(\.\d*)?)|(\.\d+)))\]/gim;
const regexStock = /\[(\w+)\]\[(\w+)\]\[(\w+)\]\[(\w+\/\w+\/\w+)\]\[([+-]?((\d+(\.\d*)?)|(\.\d+)))\]/gim;
// Alternative syntax using RegExp constructor
// const regex = new RegExp('\\/stock\\s(\\[(\\w+)\\])(\\[(\\d+)\\])(\\[(\\d+\\/\\d+\\/\\d+)\\])\\[([+-]?((\\d+(\\.\\d*)?)|(\\.\\d+)))\\]', 'gmi')

// const str = `/stock [BUY][GIL][15][6/1/2023][19.80]`;

export const getDataFromTextByRegex = (
  text: string,
  regex: RegExp = regexStock,
  objectModel: any = {
    0: 'action',
    1: 'code',
    2: 'quantity',
    4: 'created_day',
    5: 'price',
  }
) => {
  let mxs: any;
  text = text.trim();
  let objectExtractedData: any = {
    init_item_date: new Date().getTime(),
  };

  while ((mxs = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (mxs.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    mxs.forEach((match: any, groupIndex: any) => {
      // console.log(`Found match, group ${groupIndex}: ${match}`);
      if (groupIndex >= 1) {
        objectExtractedData[objectModel[--groupIndex]] = match;
      }
    });
  }

  // console.log(JSON.stringify(objectExtractedData));
  let cleanObject = {
    id: objectExtractedData.code,
    ...objectExtractedData,
  };
  delete cleanObject.undefined;
  return cleanObject;
};