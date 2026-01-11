export type IArrayOperators<T extends any[]> = {
  eq?: T;
  arrayContains?: T;
  arrayContained?: T;
  arrayOverlaps?: T;
  isEmpty?: true;
  isNotEmpty?: true;
};

export type INullableOperators = {
  isNull?: true;
  isNotNull?: true;
};

export type IBooleanOperators = {
  eq?: boolean;
  ne?: boolean;
};

export type IStringOperators = {
  eq?: string;
  ne?: string;
  inArray?: string[];
  notInArray?: string[];
  like?: string;
  ilike?: string;
  notLike?: string;
  notIlike?: string;
};

export type INumberOperators = {
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

export type IDateOperators = {
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

export type IOperatorKey =
  | keyof INullableOperators
  | keyof IBooleanOperators
  | keyof IStringOperators
  | keyof INumberOperators
  | keyof IDateOperators
  | keyof IArrayOperators<any>;

export type IFieldOperators = Partial<Record<IOperatorKey, any>>;

export type IFilterFieldsBase = Partial<Record<string, IFieldOperators>>;

export type IFilterExpression<T extends IFilterFieldsBase = IFilterFieldsBase> =
  {
    FIELDS?: T | undefined | null;
    AND?: IFilterExpression<T>[] | undefined | null;
    OR?: IFilterExpression<T>[] | undefined | null;
    NOT?: IFilterExpression<T> | undefined | null;
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
