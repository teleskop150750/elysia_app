// import type { DB } from "./db.d.ts"; // this is the Database interface we defined earlier
import { BunPostgresDialect } from "kysely-bun-sql";
import { Kysely } from "kysely";
import { SQL } from "bun";
import type { Kyselify } from "drizzle-orm/kysely";
import type {
  ErrorsTable,
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
} from "./schema";

export interface DB {
  "auto.bodies": Kyselify<typeof AutoBodiesTable>;
  "auto.body_groups": Kyselify<typeof AutoBodyGroupsTable>;
  "auto.complectations": Kyselify<typeof AutoComplectationsTable>;
  "auto.configuration_promos": Kyselify<typeof AutoConfigurationPromosTable>;
  "auto.configurations": Kyselify<typeof AutoConfigurationsTable>;
  "auto.countries": Kyselify<typeof AutoCountriesTable>;
  "auto.equipment_option": Kyselify<typeof AutoEquipmentOptionTable>;
  "auto.equipments": Kyselify<typeof AutoEquipmentsTable>;
  "auto.generations": Kyselify<typeof AutoGenerationsTable>;
  "auto.marks": Kyselify<typeof AutoMarksTable>;
  "auto.model_ratings": Kyselify<typeof AutoModelRatingsTable>;
  "auto.models": Kyselify<typeof AutoModelsTable>;
  "auto.nameplates": Kyselify<typeof AutoNameplatesTable>;
  "auto.option_groups": Kyselify<typeof AutoOptionGroupsTable>;
  "auto.options": Kyselify<typeof AutoOptionsTable>;
  "auto.package_option": Kyselify<typeof AutoPackageOptionTable>;
  "auto.packages": Kyselify<typeof AutoPackagesTable>;
  "auto.tech_info_groups": Kyselify<typeof AutoTechInfoGroupsTable>;
  "auto.tech_infos": Kyselify<typeof AutoTechInfosTable>;
  "auto.tech_params": Kyselify<typeof AutoTechParamsTable>;
  "avito.bodies": Kyselify<typeof AvitoBodiesTable>;
  "avito.generations": Kyselify<typeof AvitoGenerationsTable>;
  "avito.marks": Kyselify<typeof AvitoMarksTable>;
  "avito.models": Kyselify<typeof AvitoModelsTable>;
  errors: Kyselify<typeof ErrorsTable>;
  "offer.offer_counters": Kyselify<typeof OfferOfferCountersTable>;
  "offer.offer_discounts": Kyselify<typeof OfferOfferDiscountsTable>;
  "offer.offer_document": Kyselify<typeof OfferOfferDocumentTable>;
  "offer.offer_images": Kyselify<typeof OfferOfferImagesTable>;
  "offer.offer_option": Kyselify<typeof OfferOfferOptionTable>;
  "offer.offer_price_historys": Kyselify<typeof OfferOfferPriceHistorysTable>;
  "offer.offer_prices": Kyselify<typeof OfferOfferPricesTable>;
  "offer.offers": Kyselify<typeof OfferOffersTable>;
  "offer.urls": Kyselify<typeof OfferUrlsTable>;
  "offer.vendor_color_images": Kyselify<typeof OfferVendorColorImagesTable>;
  "offer.vendor_colors": Kyselify<typeof OfferVendorColorsTable>;
}

export const pg = new SQL(process.env["DATABASE_URL"]!);

const dialect = new BunPostgresDialect({
  client: pg,
  clientOptions: {
    max: 10,
  },
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
