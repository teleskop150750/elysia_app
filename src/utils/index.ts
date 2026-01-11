export const objKeys = <T extends Record<string, any>>(
  obj: T,
): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>;
};

export const objEntries = <T extends Record<string, any>>(
  obj: T,
): Array<[keyof T, T[keyof T]]> => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

export const objValues = <T extends Record<string, any>>(
  obj: T,
): Array<T[keyof T]> => {
  return Object.values(obj) as Array<T[keyof T]>;
};
