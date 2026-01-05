export type IArrayConditions<T extends any[]> = {
  eq?: T;
  arrayContains?: T;
  arrayContained?: T;
  arrayOverlaps?: T;
  isEmpty?: true;
  isNotEmpty?: true;
};

export type INullableConditions = {
  isNull?: true;
  isNotNull?: true;
};

export type IBooleanConditions = {
  eq?: boolean;
  ne?: boolean;
};

export type IStringConditions = {
  eq?: string;
  ne?: string;
  inArray?: string[];
  notInArray?: string[];
  like?: string;
  ilike?: string;
  notLike?: string;
  notIlike?: string;
};

export type INumberConditions = {
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

export type IDateConditions = {
  eq?: string;
  ne?: string;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  inArray?: string[];
  notInArray?: string[];
  between?: {
    min: string;
    max: string;
  };
  notBetween?: {
    min: string;
    max: string;
  };
};

export type IConditionKey =
  | keyof INullableConditions
  | keyof IBooleanConditions
  | keyof IStringConditions
  | keyof INumberConditions
  | keyof IDateConditions
  | keyof IArrayConditions<any>;

export type ITableFieldConditions = Partial<Record<IConditionKey, any>>;

export type ITableFilterBase = Partial<Record<string, ITableFieldConditions>>;

export type ITableFilter<T extends ITableFilterBase = ITableFilterBase> = {
  FIELDS: T;
  AND?: ITableFilter<T>[] | undefined;
  OR?: ITableFilter<T>[] | undefined;
  NOT?: ITableFilter<T> | undefined;
};

// export type IScalarFieldOperations<T> = {
//   eq?: T;
//   ne?: T;
//   lt?: T;
//   lte?: T;
//   gt?: T;
//   gte?: T;
//   inArray?: T[];
//   notInArray?: T[];
//   isNull?: true;
//   isNotNull?: true;
//   between?: {
//     min: T;
//     max: T;
//   };
//   notBetween?: {
//     min: T;
//     max: T;
//   };
//   like?: string;
//   ilike?: string;
//   notLike?: string;
//   notIlike?: string;
// };

// export type IQueryFilter<T extends Record<string, any>> = Omit<
//   {
//     [P in keyof T]?: any[] extends T[P]
//       ? IArrayFieldOperations<NonNullable<T[P]>>
//       : IScalarFieldOperations<NonNullable<T[P]>>;
//   },
//   "and" | "or" | "not"
// > & {
//   and?: IQueryFilter<T>[];
//   or?: IQueryFilter<T>[];
//   not?: IQueryFilter<T>;
// };
