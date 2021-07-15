export const bufferToBolean = (boolean: any): boolean => {
  const bool = (boolean.auth as any).lastIndexOf(1) !== -1;
  return bool;
};
