import set from "lodash/set";

const getUpdatedValues = (object: any, id: string, appendObject: any) => {
  const updatedObject = structuredClone(object);
  set(updatedObject, id, appendObject);
  return updatedObject;
};

export default getUpdatedValues;
