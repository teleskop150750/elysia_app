// import { eq, sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { v7 } from "uuid";

const CASCADE = {
  onDelete: "cascade",
  onUpdate: "cascade",
} as const;

const crawlee = {
  crawlee_status: t.varchar().default("NEW"),
} as const;
const s3 = {
  s3_status: t.varchar().default("NEW"),
} as const;

const bigint = t.customType<{
  data: string;
}>({
  dataType: () => "bigint",
});

export const ErrorsTable = t.pgTable("errors", {
  id: t.integer().primaryKey(),
  mark: t.jsonb().$type<number[]>().default([]),
  model: t.jsonb().$type<number[]>().default([]),
  configuration: t.jsonb().$type<number[]>().default([]),
});

// ==============================
// СХЕМА AUTO
// ==============================
export const AutoSchema = t.pgSchema("auto");

// #region TechParams
export const AutoCountriesTable = AutoSchema.table("countries", {
  id: t.uuid().primaryKey().$defaultFn(v7),
  name: t.varchar().notNull().unique(),
});

export const AutoMarksTable = AutoSchema.table(
  "marks",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    autoru_slug: t.varchar().notNull().unique(),
    autoru_id: bigint().notNull().unique(),
    slug: t.varchar().notNull().unique(),
    name: t.varchar().notNull(),
    cyrillic_name: t.varchar().notNull(),
    logo: t.varchar().notNull(),
    black_logo: t.varchar().notNull(),
    popular: t.boolean().notNull().default(false),
    year_from: t.smallint().notNull(),
    year_to: t.smallint().notNull(),
    country_id: t.uuid().references(() => AutoCountriesTable.id, CASCADE),
    ...crawlee,
  },
  (table) => [t.index("idx_marks_country_id").on(table.country_id)],
);

export const model_section_enum = t.pgEnum("model_section_enum", [
  "ALL",
  "NEW",
  "USED",
]);

export const AutoModelsTable = AutoSchema.table(
  "models",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    autoru_slug: t.varchar().notNull(),
    slug: t.varchar().notNull(),
    name: t.varchar().notNull(),
    cyrillic_name: t.varchar().notNull(),
    popular: t.boolean().notNull().default(false),
    section: model_section_enum(),
    year_from: t.smallint().notNull(),
    year_to: t.smallint().notNull(),
    mark_id: t
      .uuid()
      .notNull()
      .references(() => AutoMarksTable.id, CASCADE),
    ...crawlee,
  },
  (table) => [
    t.uniqueIndex("uq_models").on(table.mark_id, table.slug),
    t.index("idx_models_mark_id").on(table.mark_id),
  ],
);

export const AutoModelRatingsTable = AutoSchema.table(
  "model_ratings",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    total: t.integer().notNull().default(0),
    appearance: t.integer().notNull().default(0),
    comfort: t.integer().notNull().default(0),
    driveability: t.integer().notNull().default(0),
    reliability: t.integer().notNull().default(0),
    safety: t.integer().notNull().default(0),
    model_id: t
      .uuid()
      .notNull()
      .references(() => AutoModelsTable.id, CASCADE)
      .unique(),
  },
  (table) => [t.index("idx_model_ratings_model_id").on(table.model_id)],
);

// export const mainNameplatesTable = autoSchema.table(
//   "main_nameplates",
//   {
//     id: t.bigserial({ mode: "number" }).primaryKey(),
//     name: t.varchar().notNull(),
//     model_id: t
//       .bigint({ mode: "number" })
//       .notNull()
//       .references(() => modelsTable.id, CASCADE),
//   },
//   (table) => [
//     t.uniqueIndex("auto_main_nameplates").on(table.name, table.model_id),
//   ],
// );

export const AutoNameplatesTable = AutoSchema.table(
  "nameplates",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    autoru_id: bigint().notNull().unique(),
    slug: t.varchar().notNull(),
    name: t.varchar().notNull(),
    no_model: t.boolean().notNull().default(false),
    model_id: t
      .uuid()
      .notNull()
      .references(() => AutoModelsTable.id, CASCADE),
  },
  (table) => [
    t.uniqueIndex("uq_nameplates").on(table.model_id, table.slug),
    t.index("idx_nameplates_model_id").on(table.model_id),
  ],
);

export const generation_group_enum = t.pgEnum("generation_group_enum", [
  "BUSINESS",
  "CITY",
  "FAMILY",
]);

export const generation_segment_enum = t.pgEnum("generation_segment_enum", [
  "ECONOMY",
  "MEDIUM",
  "PREMIUM",
]);

export const AutoGenerationsTable = AutoSchema.table(
  "generations",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    autoru_id: bigint().notNull().unique(),
    slug: t.varchar().notNull().unique(),
    name: t.varchar().notNull(),
    cyrillic_name: t.varchar().notNull(),
    group: generation_group_enum().notNull(),
    photo: t.varchar().notNull(),
    segment: generation_segment_enum().notNull(),
    year_from: t.smallint().notNull(),
    year_to: t.smallint().notNull(),
    is_no_complect: t.boolean().notNull().default(false),
    is_restyle: t.boolean().notNull().default(false),
    model_id: t
      .uuid()
      .notNull()
      .references(() => AutoModelsTable.id, CASCADE),
    ...s3,
  },
  (table) => [t.index("idx_generations_model_id").on(table.model_id)],
);

export const AutoBodyGroupsTable = AutoSchema.table("body_groups", {
  id: t.uuid().primaryKey().$defaultFn(v7),
  type: t.varchar().notNull().unique(),
});

export const AutoBodiesTable = AutoSchema.table(
  "bodies",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    type: t.varchar().notNull().unique(),
    body_group_id: t
      .uuid()
      .notNull()
      .references(() => AutoBodyGroupsTable.id, CASCADE),
  },
  (table) => [t.index("idx_bodies_body_group_id").on(table.body_group_id)],
);

export const configuration_auto_class_enum = t.pgEnum(
  "configuration_auto_class_enum",
  ["A", "B", "C", "D", "E", "F", "J", "M", "S"],
);
export const configuration_steering_wheel_enum = t.pgEnum(
  "configuration_steering_wheel_enum",
  ["LEFT", "RIGHT"],
);

export const AutoConfigurationsTable = AutoSchema.table(
  "configurations",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    hash_entity: t.varchar(),
    autoru_id: bigint().notNull().unique(),
    slug: t.varchar().notNull().unique(),
    name: t.varchar(),
    human_name: t.varchar().notNull(),
    auto_class: configuration_auto_class_enum(),
    available_steering_wheel: t.jsonb().$type<string[]>().default([]).notNull(),
    /** Ширина задней колеи */
    back_wheel_base: t.smallint(),
    body_code: t.varchar(),
    /** Длина */
    body_size: t.smallint().notNull(),
    body_type: t.varchar().notNull(),
    body_type_id: t.varchar(),
    body_type_group: t.varchar().notNull(),
    /** Объем багажника max */
    boot_volume_max: t.smallint(),
    /** Объем багажника min */
    boot_volume_min: t.smallint(),
    /** Количество дверей */
    doors_count: t.smallint().notNull(),
    /** Передние тормоза */
    front_brake: t.varchar().notNull(),
    /** Тип передней подвески */
    front_suspension: t.varchar().notNull(),
    /** Ширина передней колеи */
    front_wheel_base: t.smallint(),
    /** Высота */
    height: t.smallint().notNull(),
    max_price: t.integer().default(0).notNull(),
    min_price: t.integer().default(0).notNull(),
    photo: t.varchar().notNull(),
    /** Количество мест */
    seats: t.jsonb().$type<number[]>().default([]).notNull(),
    /** Расположение руля */
    steering_wheel: configuration_steering_wheel_enum().notNull(),
    /** Объём топливного бака */
    tank_volume: t.smallint(),
    turning_circle: t.real(),
    /** Колёсная база */
    wheel_base: t.smallint().notNull(),
    /** Ширина */
    width: t.smallint().notNull(),
    width_mirrors: t.smallint(),

    new_offers_count: t.integer().default(0).notNull(),
    total_offers_count: t.integer().default(0).notNull(),
    used_offers_count: t.integer().default(0).notNull(),

    offers_max_price: t.integer().default(0).notNull(),
    offers_min_price: t.integer().default(0).notNull(),
    new_offers_max_price: t.integer().default(0).notNull(),
    new_offers_min_price: t.integer().default(0).notNull(),
    used_offers_max_price: t.integer().default(0).notNull(),
    used_offers_min_price: t.integer().default(0).notNull(),

    body_id: t
      .uuid()
      .notNull()
      .references(() => AutoBodiesTable.id, CASCADE),
    generation_id: t
      .uuid()
      .notNull()
      .references(() => AutoGenerationsTable.id, CASCADE),
    ...crawlee,
    ...s3,
  },
  (table) => [
    // t.index("idx_configurations_crawlee_status").on(table.crawlee_status),
    // t.index("idx_configurations_s3_status").on(table.s3_status),
    t.index("idx_configurations_generation_id").on(table.generation_id),
    t.index("idx_configurations_body_id").on(table.body_id),
  ],
);

export const AutoConfigurationPromosTable = AutoSchema.table(
  "configuration_promos",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    name: t.varchar().notNull(),
    url: t.varchar().notNull(),
    configuration_id: t
      .uuid()
      .notNull()
      .references(() => AutoConfigurationsTable.id, CASCADE),
    ...s3,
    s3_key: t.varchar(),
  },
  (table) => [
    t
      .uniqueIndex("uq_configuration_promos")
      .on(table.configuration_id, table.url, table.name),
    t
      .index("idx_configuration_promos_configuration_id")
      .on(table.configuration_id),
    // t.index("idx_configuration_promos_s3_status").on(table.s3_status),
  ],
);

export const tech_param_charging_port_type_enum = t.pgEnum(
  "tech_param_charging_port_type_enum",
  [
    "CCS_COMBO_1",
    "CCS_COMBO_2",
    "CHADEMO",
    "GBT_AC",
    "GBT_DC",
    "TESLA_SG",
    "TYPE_1",
    "TYPE_2",
  ],
);

export const tech_param_consumption_calc_enum = t.pgEnum(
  "tech_param_consumption_calc_enum",
  ["CLTC", "EPA", "NEDC", "WLTP"],
);
export const tech_param_cylinders_order_enum = t.pgEnum(
  "tech_param_cylinders_order_enum",
  ["IN-LINE", "OPPOSITE", "ROTARY", "V-SHAPED", "V-SHAPED-SA", "W-SHAPED"],
);
export const tech_param_engine_type_enum = t.pgEnum(
  "tech_param_engine_type_enum",
  ["DIESEL", "ELECTRO", "GASOLINE", "H2", "HYBRID", "LPG"],
);
export const tech_param_ev_battery_type_enum = t.pgEnum(
  "tech_param_ev_battery_type_enum",
  [
    "Na-ion",
    "hydrogen-fuel-cell",
    "lead-acid",
    "lfp",
    "li-ion",
    "li-nmc",
    "li-pol",
    "nicd",
    "nih2",
    "nimh",
  ],
);
export const tech_param_gear_type_enum = t.pgEnum("tech_param_gear_type_enum", [
  "ALL_WHEEL_DRIVE",
  "FORWARD_CONTROL",
  "REAR_DRIVE",
]);
export const tech_param_petrol_type_enum = t.pgEnum(
  "tech_param_petrol_type_enum",
  [
    "76 RON",
    "80 RON",
    "92 RON",
    "95 RON",
    "98 RON",
    "Diesel",
    "GAS",
    "hydrogen",
  ],
);
export const tech_param_transmission_enum = t.pgEnum(
  "tech_param_transmission_enum",
  ["AUTOMATIC", "MECHANICAL", "ROBOT", "VARIATOR"],
);
export const tech_param_valvetrain_enum = t.pgEnum(
  "tech_param_valvetrain_enum",
  ["DOHC", "OHC", "OHV", "SOHC", "SV"],
);

export const AutoTechParamsTable = AutoSchema.table(
  "tech_params",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    hash_entity: t.varchar(),
    autoru_id: bigint().notNull().unique(),
    slug: t.varchar().notNull().unique(),
    name: t.varchar(),
    human_name: t.varchar().notNull(),
    /** Разгон */
    acceleration: t.real(),
    /** Задние тормоза */
    back_brake: t.varchar(),
    /** Тип задней подвески */
    back_suspension: t.varchar(),
    /** Емкость батареи */
    battery_capacity: t.real(),
    /** Ёмкость батареи (доступная) */
    battery_capacity_useful: t.real(),
    /** Количество циклов зарядки */
    battery_charge_cycles: t.numeric({ mode: "number" }),
    /** Температурный режим батареи */
    battery_temp: t.jsonb().$type<number[]>().default([]),
    /** Время зарядки */
    charge_time: t.real(),
    charging_port_type: tech_param_charging_port_type_enum(),
    /** Тип разъема для зарядки */
    charging_port_types: t.jsonb().$type<string[]>().default([]),
    /** Клиренс */
    clearance: t.jsonb().$type<number[]>().default([]),
    /** Степень сжатия */
    compression: t.real(),
    consump_kwt: t.real(),
    /** Методика расчета расхода */
    consumption_calc: tech_param_consumption_calc_enum(),
    /** Расход топлива город */
    consumption_city: t.real(),
    /** Расход топлива трасса */
    consumption_hiway: t.real(),
    /** Расход топлива смешанный */
    consumption_mixed: t.real(),
    /** Расположение цилиндров */
    cylinders_order: tech_param_cylinders_order_enum(),
    /** Количество цилиндров */
    cylinders_value: t.smallint().notNull(),
    /** Диаметр цилиндра и ход поршня */
    diameter: t.varchar(),
    /** Размеры дисков */
    disk_size: t.varchar(),
    /** Объем */
    displacement: t.smallint().notNull(),
    /** Запас хода на электричестве */
    electric_range: t.smallint(),
    /** Экологический класс */
    emission_euro_class: t.varchar(),
    engine_alias: t.varchar(),
    engine_aliases: t.jsonb().$type<string[]>().default([]),
    /** Система питания двигателя */
    engine_feeding: t.varchar(),
    engine_id: t.jsonb().$type<string[]>().default([]),
    engine_model: t.varchar(),
    /** Расположение двигателя */
    engine_order: t.varchar(),
    /** Тип двигателя */
    engine_type: tech_param_engine_type_enum().notNull(),
    /** Тип батареи */
    ev_battery_type: tech_param_ev_battery_type_enum(),
    /** Тип наддува */
    feeding: t.varchar(),
    /** Выбросы CO2 */
    fuel_emission: t.smallint(),
    fuel_tank_volume: t.smallint(),
    full_charge_time: t.smallint(),
    /** Полная масса */
    full_weight: t.smallint(),
    /** Тип привода */
    gear_type: tech_param_gear_type_enum().notNull(),
    gear_type_autoru: t.varchar(),
    /** Количество передач */
    gear_value: t.smallint(),
    /** Сверловка */
    landing_wheels_size: t.jsonb().$type<string[]>().default([]),
    /** Максимальная мощность зарядки */
    max_power_in: t.jsonb().$type<number[]>().default([]),
    /** Максимальная скорость */
    max_speed: t.smallint(),
    /** Максимальный крутящий момент */
    moment: t.smallint(),
    moment_rpm: t.jsonb().$type<number[]>().default([]),
    nameplate_engine: t.varchar(),
    nut_bolt_size: t.varchar(),
    optional_tires_size: t.jsonb().$type<string[]>().default([]),
    /** Размер колёс */
    origin_tires_size: t.jsonb().$type<string[]>().default([]),
    origin_wheels_size: t.jsonb().$type<string[]>().default([]),
    /** Марка топлива */
    petrol_type: tech_param_petrol_type_enum(),
    /** Мощность */
    power: t.smallint().notNull(),
    power_docs: t.smallint().notNull(),
    // parseInt(power_kvt) as number
    power_kvt: t.real().notNull(),
    power_rpm: t.jsonb().$type<number[]>().default([]),
    quick_charge_description: t.varchar(),
    quick_charge_time: t.smallint(),
    tightening_torque: t.varchar(),
    tire_pressure: t.varchar(),
    /** Запас хода в гибридном режиме */
    total_range: t.smallint(),
    /** Коробка */
    transmission: tech_param_transmission_enum().notNull(),
    transmission_autoru: t.varchar(),
    trunk_volume_max: t.smallint(),
    trunk_volume_min: t.smallint(),
    /** Число клапанов на цилиндр */
    valves: t.smallint(),
    /** ГРМ */
    valvetrain: tech_param_valvetrain_enum(),
    /** Снаряженная масса */
    weight: t.numeric({ mode: "number" }),
    wheel_size: t.varchar(),
    year_start: t.smallint().notNull(),
    year_stop: t.smallint().notNull(),

    nameplate_id: t.uuid().references(() => AutoNameplatesTable.id, CASCADE),
    // main_nameplate_id: t
    //   .bigint({ mode: "number" })
    //   .references(() => mainNameplatesTable.id),
    configuration_id: t
      .uuid()
      .notNull()
      .references(() => AutoConfigurationsTable.id, CASCADE),
  },
  (table) => [
    t.index("idx_tech_params_nameplate_id").on(table.nameplate_id),
    t.index("idx_tech_params_configuration_id").on(table.configuration_id),
  ],
);
// #regionend TechParams

// #region Equipments
export const AutoOptionGroupsTable = AutoSchema.table("option_groups", {
  id: t.varchar().primaryKey(),
  name: t.varchar().notNull().unique(),
});

export const AutoOptionsTable = AutoSchema.table(
  "options",
  {
    id: t.varchar().primaryKey(),
    name: t.varchar().notNull(),
    group_id: t.varchar().references(() => AutoOptionGroupsTable.id, CASCADE),
  },
  (table) => [t.index("idx_options_group_id").on(table.group_id)],
);

export const AutoEquipmentsTable = AutoSchema.table("equipments", {
  id: t.uuid().primaryKey().$defaultFn(v7),
  slug: t.varchar().notNull().unique(),
  name: t.varchar().notNull(),

  new_offers_count: t.integer().default(0).notNull(),
  total_offers_count: t.integer().default(0).notNull(),
  used_offers_count: t.integer().default(0).notNull(),

  offers_max_price: t.integer().default(0).notNull(),
  offers_min_price: t.integer().default(0).notNull(),
  new_offers_max_price: t.integer().default(0).notNull(),
  new_offers_min_price: t.integer().default(0).notNull(),
  used_offers_max_price: t.integer().default(0).notNull(),
  used_offers_min_price: t.integer().default(0).notNull(),
  ...crawlee,
});

export const AutoEquipmentOptionTable = AutoSchema.table(
  "equipment_option",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    price: t.integer(),
    equipment_id: t
      .uuid()
      .notNull()
      .references(() => AutoEquipmentsTable.id, CASCADE),
    option_id: t
      .varchar()
      .notNull()
      .references(() => AutoOptionsTable.id, CASCADE),
  },
  (table) => [
    t
      .uniqueIndex("uq_equipment_option")
      .on(table.equipment_id, table.option_id),
    t.index("idx_equipment_option_equipment_id").on(table.equipment_id),
    t.index("idx_equipment_option_option_id").on(table.option_id),
  ],
);

export const AutoPackagesTable = AutoSchema.table(
  "packages",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    autoru_id: bigint().notNull().unique(),
    name: t.varchar().notNull(),
    price: t.numeric({ mode: "number" }),
    equipment_id: t
      .uuid()
      .notNull()
      .references(() => AutoEquipmentsTable.id, CASCADE),
  },
  (table) => [t.index("idx_packages_equipment_id").on(table.equipment_id)],
);

export const AutoPackageOptionTable = AutoSchema.table(
  "package_option",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    package_id: t
      .uuid()
      .notNull()
      .references(() => AutoPackagesTable.id, CASCADE),
    option_id: t
      .varchar()
      .notNull()
      .references(() => AutoOptionsTable.id, CASCADE),
  },
  (table) => [
    t.uniqueIndex("uq_package_option").on(table.package_id, table.option_id),
    t.index("idx_package_option_package_id").on(table.package_id),
    t.index("idx_package_option_option_id").on(table.option_id),
  ],
);
// #regionend Equipments

// #region Complectations
export const AutoComplectationsTable = AutoSchema.table(
  "complectations",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    slug: t.varchar().notNull().unique(),
    base: t.boolean().notNull().default(false),
    offers_price_from: t.numeric({ mode: "number" }).default(0),
    offers_price_to: t.numeric({ mode: "number" }).default(0),
    configuration_id: t
      .uuid()
      .notNull()
      .references(() => AutoConfigurationsTable.id, CASCADE),
    tech_param_id: t
      .uuid()
      .notNull()
      .references(() => AutoTechParamsTable.id, CASCADE),
    equipment_id: t.uuid().references(() => AutoEquipmentsTable.id, CASCADE),
    ...crawlee,
  },
  (table) => [
    t.index("idx_complectations_configuration_id").on(table.configuration_id),
    t.index("idx_complectations_tech_param_id").on(table.tech_param_id),
    t.index("idx_complectations_equipment_id").on(table.equipment_id),
  ],
);
// #regionend Complectations

export const AutoTechInfoGroupsTable = AutoSchema.table("tech_info_groups", {
  id: t.uuid().primaryKey().$defaultFn(v7),
  type: t.varchar().notNull().unique(),
  name: t.varchar(),
});

export const AutoTechInfosTable = AutoSchema.table(
  "tech_infos",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    type: t.varchar().notNull(),
    name: t.varchar(),
    units: t.varchar(),
    group_id: t
      .uuid()
      .notNull()
      .references(() => AutoTechInfoGroupsTable.id, CASCADE),
  },
  (table) => [
    t.uniqueIndex("uq_tech_infos").on(table.group_id, table.type),
    t.index("idx_tech_infos_group_id").on(table.group_id),
  ],
);

// ==============================
// СХЕМА AUTO.RU
// ==============================
// export const autoruSchema = t.pgSchema("autoru");

// export const marksAutoRuTable = autoruSchema.table("marks", {
//   id: t.bigserial({ mode: "number" }).primaryKey(),
//   mark_id: t
//     .bigint({ mode: "number" })
//     .notNull()
//     .references(() => marksTable.id, CASCADE)
//     .unique(),
// });

// export const modelsAutoRuTable = autoruSchema.table("models", {
//   id: t.bigserial({ mode: "number" }).primaryKey(),
//   model_id: t
//     .bigint({ mode: "number" })
//     .notNull()
//     .references(() => modelsTable.id, CASCADE)
//     .unique(),
// });

// export const nameplatesAutoRuTable = autoruSchema.table("nameplates", {
//   id: t.bigserial({ mode: "number" }).primaryKey(),
//   nameplate_id: t
//     .bigint({ mode: "number" })
//     .notNull()
//     .references(() => nameplatesTable.id, CASCADE)
//     .unique(),
// });

// export const generationsAutoRuTable = autoruSchema.table("generations", {
//   id: t.bigserial({ mode: "number" }).primaryKey(),
//   autoru_default_configuration_id: t.integer().unique(),
//   generation_id: t
//     .bigint({ mode: "number" })
//     .notNull()
//     .references(() => generationsTable.id, CASCADE)
//     .unique(),
// });

// export const configurationsAutoRuTable = autoruSchema.table("configurations", {
//   id: t.bigserial({ mode: "number" }).primaryKey(),
//   configuration_id: t
//     .bigint({ mode: "number" })
//     .notNull()
//     .references(() => configurationsTable.id, CASCADE)
//     .unique(),
// });

// export const techParamsAutoRuTable = autoruSchema.table("tech_params", {
//   id: t.bigserial({ mode: "number" }).primaryKey(),
//   tech_param_id: t
//     .bigint({ mode: "number" })
//     .notNull()
//     .references(() => techParamsTable.id, CASCADE)
//     .unique(),
// });

// ==============================
// СХЕМА OFFER
// ==============================
export const OfferSchema = t.pgSchema("offer");

export const OfferUrlsTable = OfferSchema.table(
  "urls",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    title: t.varchar(),
    section: t.varchar(),
    url: t.varchar().notNull().unique(),
    created_at: t.timestamp().notNull().defaultNow(),
    ...crawlee,
  },
  (table) => [
    t
      .index("idx_urls_crawlee_status_section_id")
      .on(table.crawlee_status, table.section, table.id),
  ],
);

export const OfferOffersTable = OfferSchema.table(
  "offers",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    autoru_id: bigint().notNull().unique(),
    autoru_sale_id: t.varchar(),
    hash: t.varchar().notNull(),

    title: t.varchar(),
    url: t.varchar().notNull().unique(),
    section: t.varchar(),
    seller_type: t.varchar(),
    status: t.varchar(),
    availability: t.varchar(),
    color_hex: t.varchar(),

    condition: t.varchar(),
    predicted_car_condition: t.varchar(),
    mileage: t.integer().notNull().default(0),

    is_favorite: t.boolean().notNull().default(false),
    complectation_id: t
      .uuid()
      .notNull()
      .references(() => AutoComplectationsTable.id, CASCADE),
  },
  (table) => [
    t.index("idx_offers_complectation_id").on(table.complectation_id),
  ],
);

export const OfferOfferDiscountsTable = OfferSchema.table(
  "offer_discounts",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    type: t.varchar(),
    price: t.integer(),
    offer_id: t
      .uuid()
      .notNull()
      .references(() => OfferOffersTable.id, CASCADE),
  },
  (table) => [t.index("idx_offer_discounts_offer_id").on(table.offer_id)],
);

export const OfferOfferImagesTable = OfferSchema.table(
  "offer_images",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    name: t.varchar().notNull(),
    photo_class: t.varchar(),
    url: t.varchar().notNull(),
    type: t.varchar(),
    size: t.integer(),
    compressed_size: t.integer(),
    orientation: t.varchar(),
    width: t.integer(),
    height: t.integer(),
    exterior: t.real(),
    interior: t.real(),

    offer_id: t
      .uuid()
      .notNull()
      .references(() => OfferOffersTable.id, CASCADE),

    ...s3,
    s3_key: t.varchar(),
    ai_status: t.varchar().default("NEW"),
  },
  (table) => [
    t
      .uniqueIndex("offer_offer_images")
      .on(table.offer_id, table.photo_class, table.url, table.name),
    t.index("idx_offer_images_offer_id").on(table.offer_id),
    // t.index("idx_offer_images_s3_status").on(table.s3_status),
    // t.index("idx_offer_images_ai_status").on(table.ai_status),
  ],
);

export const OfferOfferCountersTable = OfferSchema.table(
  "offer_counters",
  {
    id: t.uuid().primaryKey(),
    all: t.integer().notNull().default(0),
    avito_all: t.integer().notNull().default(0),
    avito_card_view_phone_show_conversion_all: t.integer().notNull().default(0),
    avito_card_view_phone_show_conversion_daily: t
      .integer()
      .notNull()
      .default(0),
    avito_daily: t.integer().notNull().default(0),
    card_view_call_conversion_daily: t.integer().notNull().default(0),
    card_view_chat_conversion_all: t.integer().notNull().default(0),
    chats_all: t.integer().notNull().default(0),
    daily: t.integer().notNull().default(0),
    drom_all: t.integer().notNull().default(0),
    drom_card_view_phone_show_conversion_all: t.integer().notNull().default(0),
    drom_card_view_phone_show_conversion_daily: t
      .integer()
      .notNull()
      .default(0),
    drom_daily: t.integer().notNull().default(0),
    favorite_all: t.integer().notNull().default(0),
    favorite_daily: t.integer().notNull().default(0),
    favorite_remove_all: t.integer().notNull().default(0),
    favorite_remove_daily: t.integer().notNull().default(0),
    favorite_total_all: t.integer().notNull().default(0),
    favorite_total_daily: t.integer().notNull().default(0),
    offer_id: t
      .uuid()
      .notNull()
      .references(() => OfferOffersTable.id, CASCADE)
      .unique(),
  },
  (table) => [t.index("idx_offer_counters_offer_id").on(table.offer_id)],
);

export const OfferOfferDocumentTable = OfferSchema.table(
  "offer_document",
  {
    id: t.uuid().primaryKey(),
    accidents_resolution: t.varchar(),
    custom_cleared: t.boolean(),
    legal_resolution: t.varchar(),
    owners_number: t.integer(),
    owners_resolution: t.varchar(),
    pts: t.varchar(),
    pts_original: t.boolean(),
    pts_resolution_ok: t.boolean(),
    vin: t.varchar(),
    vin_resolution: t.varchar(),
    year: t.integer(),
    offer_id: t
      .uuid()
      .notNull()
      .references(() => OfferOffersTable.id, CASCADE)
      .unique(),
  },
  (table) => [t.index("idx_offer_document_offer_id").on(table.offer_id)],
);

export const OfferOfferPricesTable = OfferSchema.table(
  "offer_prices",
  {
    id: t.uuid().primaryKey(),
    currency: t.varchar(),
    eur: t.integer().default(0),
    price: t.integer().default(0),
    rur: t.integer().default(0),
    usd: t.integer().default(0),
    with_nds: t.boolean().default(false),
    offer_id: t
      .uuid()
      .notNull()
      .references(() => OfferOffersTable.id, CASCADE)
      .unique(),
  },
  (table) => [t.index("idx_offer_prices_offer_id").on(table.offer_id)],
);

export const OfferOfferPriceHistorysTable = OfferSchema.table(
  "offer_price_historys",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    rur: bigint(),
    usd: bigint(),
    eur: bigint(),
    create_timestamp: bigint(),
    offer_id: t
      .uuid()
      .notNull()
      .references(() => OfferOffersTable.id, CASCADE),
  },
  (table) => [
    t
      .uniqueIndex("uq_offer_price_historys")
      .on(table.offer_id, table.rur, table.create_timestamp),
    t.index("idx_offer_price_historys_offer_id").on(table.offer_id),
  ],
);

export const OfferOfferOptionTable = OfferSchema.table(
  "offer_option",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    offer_id: t
      .uuid()
      .notNull()
      .references(() => OfferOffersTable.id, CASCADE),
    option_id: t
      .varchar()
      .notNull()
      .references(() => AutoOptionsTable.id, CASCADE),
  },
  (table) => [
    t.uniqueIndex("uq_offer_option").on(table.offer_id, table.option_id),
    t.index("idx_offer_option_offer_id").on(table.offer_id),
    t.index("idx_offer_option_option_id").on(table.option_id),
  ],
);

// COLORS
export const OfferVendorColorsTable = OfferSchema.table(
  "vendor_colors",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    autoru_body_color_id: bigint(),
    autoru_configuration_id: bigint(),
    autoru_mark_color_id: bigint(),

    color_type: t.varchar(),
    hex_codes: t.jsonb().$type<string[]>().notNull().default([]),
    main_color: t.boolean().notNull().default(false),
    name_ru: t.varchar().notNull(),

    stock_color_hex_code: t.varchar(),
    stock_color_name_ru: t.varchar(),

    configuration_id: t
      .uuid()
      .notNull()
      .references(() => AutoConfigurationsTable.id, CASCADE),
  },
  (table) => [
    t
      .uniqueIndex("uq_vendor_colors")
      .on(
        table.autoru_body_color_id,
        table.autoru_configuration_id,
        table.autoru_mark_color_id,
      ),
    t.index("idx_vendor_colors_configuration_id").on(table.configuration_id),
  ],
);

export const OfferVendorColorImagesTable = OfferSchema.table(
  "vendor_color_images",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    name: t.varchar().notNull(),
    url: t.varchar().notNull(),

    color_id: t
      .uuid()
      .notNull()
      .references(() => OfferVendorColorsTable.id, CASCADE),
  },
  (table) => [
    t
      .uniqueIndex("uq_vendor_color_images")
      .on(table.color_id, table.url, table.name),
    t.index("idx_vendor_color_images_color_id").on(table.color_id),
  ],
);

// ==============================
// СХЕМА AVITO
// ==============================
export const AvitoSchema = t.pgSchema("avito");

export const AvitoMarksTable = AvitoSchema.table("marks", {
  id: t.uuid().primaryKey().$defaultFn(v7),
  slug: t.varchar().notNull().unique(),
  name: t.varchar().notNull(),
  avito_id: bigint().notNull().unique(),
  avito_url: t.varchar().notNull().unique(),
  ...crawlee,
});

export const AvitoModelsTable = AvitoSchema.table(
  "models",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    slug: t.varchar().notNull(),
    name: t.varchar().notNull(),
    avito_id: bigint().notNull(),
    avito_url: t.varchar().notNull().unique(),
    mark_id: t
      .uuid()
      .notNull()
      .references(() => AvitoMarksTable.id, CASCADE),
    ...crawlee,
  },
  (table) => [
    t.uniqueIndex("uq_models").on(table.mark_id, table.avito_id),
    t.index("idx_models_mark_id").on(table.mark_id),
  ],
);

export const AvitoGenerationsTable = AvitoSchema.table(
  "generations",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    slug: t.varchar().notNull(),
    title: t.varchar().notNull(),
    subtitle: t.varchar().notNull(),
    model_id: t
      .uuid()
      .notNull()
      .references(() => AvitoModelsTable.id, CASCADE),
    ...crawlee,
  },
  (table) => [
    t.uniqueIndex("uq_generations").on(table.model_id, table.slug),
    t.index("idx_generations_model_id").on(table.model_id),
  ],
);

export const AvitoBodiesTable = AvitoSchema.table(
  "bodies",
  {
    id: t.uuid().primaryKey().$defaultFn(v7),
    slug: t.varchar().notNull(),
    title: t.varchar().notNull(),
    img: t.varchar(),
    avito_url: t.varchar().notNull().unique(),
    generation_id: t
      .uuid()
      .notNull()
      .references(() => AvitoGenerationsTable.id, CASCADE),
    ...crawlee,
  },
  (table) => [
    t.uniqueIndex("uq_bodies").on(table.generation_id, table.slug),
    t.index("idx_bodies_generation_id").on(table.generation_id),
  ],
);
