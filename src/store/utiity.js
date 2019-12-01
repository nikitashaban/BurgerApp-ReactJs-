export const updateObject = (oldObject, updaredProperties) => {
  return {
    ...oldObject,
    ...updaredProperties
  };
};
