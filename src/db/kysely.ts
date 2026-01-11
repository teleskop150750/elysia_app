import { Kysely } from 'kysely'
import type {
  AutoBodiesTable,
  AutoBodyGroupsTable,
  AutoComplectationsTable,
  AutoConfigurationPromosTable,
  AutoConfigurationsTable,
  AutoCountriesTable,
  AutoEquipmentOptionTable,
  AutoEquipmentsTable,
  AutoGenerationsTable,
  AutoMarksTable,
  AutoModelRatingsTable,
  AutoModelsTable,
  AutoNameplatesTable,
  AutoOptionGroupsTable,
  AutoOptionsTable,
  AutoPackageOptionTable,
  AutoPackagesTable,
  AutoTechInfoGroupsTable,
  AutoTechInfosTable,
  AutoTechParamsTable,
  AvitoBodiesTable,
  AvitoGenerationsTable,
  AvitoMarksTable,
  AvitoModelsTable,
  ErrorsTable,
  OfferOfferCountersTable,
  OfferOfferDiscountsTable,
  OfferOfferDocumentTable,
  OfferOfferImagesTable,
  OfferOfferOptionTable,
  OfferOfferPriceHistorysTable,
  OfferOfferPricesTable,
  OfferOffersTable,
  OfferUrlsTable,
  OfferVendorColorImagesTable,
  OfferVendorColorsTable,
} from './schema'
import { sql as client } from './bun'
import { BunPostgresDialect } from 'kysely-bun-sql'
import type { Kyselify } from 'drizzle-orm/kysely'

// export type Kyselify<T extends Table> = Simplify<{
//     [Key in keyof T['_']['columns']]: [Key, T['_']['columns'][Key]]
//     // [Key in keyof T['_']['columns'] & string]: MapColumnName<Key, T['_']['columns'][Key], true>
//     // [Key in keyof T['_']['columns'] & string ]: MapColumnName<Key, T['_']['columns'][Key], true>

//     // [Key in keyof T['_']['columns'] & string as MapColumnName<Key, T['_']['columns'][Key], true>]: ColumnType<InferSelectModel<T>[MapColumnName<Key, T['_']['columns'][Key], true>], MapColumnName<Key, T['_']['columns'][Key], true> extends keyof InferInsertModel<T> ? InferInsertModel<T>[MapColumnName<Key, T['_']['columns'][Key], true>] : never, MapColumnName<Key, T['_']['columns'][Key], true> extends keyof InferInsertModel<T> ? InferInsertModel<T>[MapColumnName<Key, T['_']['columns'][Key], true>] : never>;

//     // [Key in keyof T['_']['columns'] & string as MapColumnName<Key, T['_']['columns'][Key], true>]: ColumnType<InferSelectModel<T>[MapColumnName<Key, T['_']['columns'][Key], true>], MapColumnName<Key, T['_']['columns'][Key], true> extends keyof InferInsertModel<T> ? InferInsertModel<T>[MapColumnName<Key, T['_']['columns'][Key], true>] : never, MapColumnName<Key, T['_']['columns'][Key], true> extends keyof InferInsertModel<T> ? InferInsertModel<T>[MapColumnName<Key, T['_']['columns'][Key], true>] : never>;
// }>;

// type FF = Kyselify<typeof AutoBodiesTable>;

export interface DB {
  'auto.bodies': Kyselify<typeof AutoBodiesTable>
  'auto.body_groups': Kyselify<typeof AutoBodyGroupsTable>
  'auto.complectations': Kyselify<typeof AutoComplectationsTable>
  'auto.configuration_promos': Kyselify<typeof AutoConfigurationPromosTable>
  'auto.configurations': Kyselify<typeof AutoConfigurationsTable>
  'auto.countries': Kyselify<typeof AutoCountriesTable>
  'auto.equipment_option': Kyselify<typeof AutoEquipmentOptionTable>
  'auto.equipments': Kyselify<typeof AutoEquipmentsTable>
  'auto.generations': Kyselify<typeof AutoGenerationsTable>
  'auto.marks': Kyselify<typeof AutoMarksTable>
  'auto.model_ratings': Kyselify<typeof AutoModelRatingsTable>
  'auto.models': Kyselify<typeof AutoModelsTable>
  'auto.nameplates': Kyselify<typeof AutoNameplatesTable>
  'auto.option_groups': Kyselify<typeof AutoOptionGroupsTable>
  'auto.options': Kyselify<typeof AutoOptionsTable>
  'auto.package_option': Kyselify<typeof AutoPackageOptionTable>
  'auto.packages': Kyselify<typeof AutoPackagesTable>
  'auto.tech_info_groups': Kyselify<typeof AutoTechInfoGroupsTable>
  'auto.tech_infos': Kyselify<typeof AutoTechInfosTable>
  'auto.tech_params': Kyselify<typeof AutoTechParamsTable>
  'avito.bodies': Kyselify<typeof AvitoBodiesTable>
  'avito.generations': Kyselify<typeof AvitoGenerationsTable>
  'avito.marks': Kyselify<typeof AvitoMarksTable>
  'avito.models': Kyselify<typeof AvitoModelsTable>
  errors: Kyselify<typeof ErrorsTable>
  'offer.offer_counters': Kyselify<typeof OfferOfferCountersTable>
  'offer.offer_discounts': Kyselify<typeof OfferOfferDiscountsTable>
  'offer.offer_document': Kyselify<typeof OfferOfferDocumentTable>
  'offer.offer_images': Kyselify<typeof OfferOfferImagesTable>
  'offer.offer_option': Kyselify<typeof OfferOfferOptionTable>
  'offer.offer_price_historys': Kyselify<typeof OfferOfferPriceHistorysTable>
  'offer.offer_prices': Kyselify<typeof OfferOfferPricesTable>
  'offer.offers': Kyselify<typeof OfferOffersTable>
  'offer.urls': Kyselify<typeof OfferUrlsTable>
  'offer.vendor_color_images': Kyselify<typeof OfferVendorColorImagesTable>
  'offer.vendor_colors': Kyselify<typeof OfferVendorColorsTable>
}

const dialect = new BunPostgresDialect({
  client,
  clientOptions: {
    max: 10,
  },
})

export const db = new Kysely<DB>({
  dialect,
})
