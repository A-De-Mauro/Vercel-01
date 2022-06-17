export const getParams = <T>(valuesArray: T[], paramKey: string, objectKey: keyof T) =>
  valuesArray.map((object) => ({
    params: { [paramKey]: object[objectKey] },
  })); 
