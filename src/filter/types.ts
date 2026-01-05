export type IArrayFieldOperations<T extends any[]> = {
  eq?: T;
  arrayContains?: T;
  arrayContained?: T;
  arrayOverlaps?: T;
  isEmpty?: true;
  isNotEmpty?: true;
};

export type IBooleanFieldSchema = {
  eq?: boolean;
  ne?: boolean;
};

export type IStringFieldSchema = {
  eq?: string;
  ne?: string;
  inArray?: string[];
  notInArray?: string[];
  like?: string;
  ilike?: string;
  notLike?: string;
  notIlike?: string;
};

export type INumberFieldSchema = {
  eq?: number;
  ne?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  inArray?: number[];
  notInArray?: number[];
  between?: {
    min: number;
    max: number;
  };
  notBetween?: {
    min: number;
    max: number;
  };
};

export type IDateFieldSchema = {
  eq?: Date;
  ne?: Date;
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  inArray?: Date[];
  notInArray?: Date[];
  between?: {
    min: Date;
    max: Date;
  };
  notBetween?: {
    min: Date;
    max: Date;
  };
};

export type IScalarFieldOperations<T> = {
  eq?: T;
  ne?: T;
  lt?: T;
  lte?: T;
  gt?: T;
  gte?: T;
  inArray?: T[];
  notInArray?: T[];
  isNull?: true;
  isNotNull?: true;
  between?: {
    min: T;
    max: T;
  };
  notBetween?: {
    min: T;
    max: T;
  };
  like?: string;
  ilike?: string;
  notLike?: string;
  notIlike?: string;
};

export type IQueryFilter<T extends Record<string, any>> = Omit<
  {
    [P in keyof T]?: any[] extends T[P]
      ? IArrayFieldOperations<NonNullable<T[P]>>
      : IScalarFieldOperations<NonNullable<T[P]>>;
  },
  "$and" | "$or" | "$not"
> & {
  $and?: IQueryFilter<T>[];
  $or?: IQueryFilter<T>[];
  $not?: IQueryFilter<T>;
};
