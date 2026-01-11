import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  // Equipments ->
  AutoOptionsTable: {
    group: r.one.AutoOptionGroupsTable({
      from: r.AutoOptionsTable.group_id,
      to: r.AutoOptionGroupsTable.id,
      optional: false,
    }),
  },
  AutoOptionGroupsTable: {
    options: r.many.AutoOptionsTable(),
  },
  // TechParams ->
  AutoTechParamsTable: {
    configuration: r.one.AutoConfigurationsTable({
      from: r.AutoTechParamsTable.configuration_id,
      to: r.AutoConfigurationsTable.id,
      optional: false,
    }),
    nameplate: r.one.AutoNameplatesTable({
      from: r.AutoTechParamsTable.nameplate_id,
      to: r.AutoNameplatesTable.id,
    }),
  },
  AutoConfigurationPromosTable: {
    configuration: r.one.AutoConfigurationsTable({
      from: r.AutoConfigurationPromosTable.configuration_id,
      to: r.AutoConfigurationsTable.id,
      optional: false,
    }),
  },
  AutoConfigurationsTable: {
    generation: r.one.AutoGenerationsTable({
      from: r.AutoConfigurationsTable.generation_id,
      to: r.AutoGenerationsTable.id,
      optional: false,
    }),
    promos: r.many.AutoConfigurationPromosTable(),
  },
  AutoGenerationsTable: {
    model: r.one.AutoModelsTable({
      from: r.AutoGenerationsTable.model_id,
      to: r.AutoModelsTable.id,
      optional: false,
    }),
    configurations: r.many.AutoConfigurationsTable(),
  },
  AutoNameplatesTable: {
    model: r.one.AutoModelsTable({
      from: r.AutoNameplatesTable.model_id,
      to: r.AutoModelsTable.id,
      optional: false,
    }),
    tech_params: r.many.AutoTechParamsTable(),
  },
  AutoModelRatingsTable: {
    model: r.one.AutoModelsTable({
      from: r.AutoModelRatingsTable.model_id,
      to: r.AutoModelsTable.id,
      optional: false,
    }),
  },
  AutoModelsTable: {
    mark: r.one.AutoMarksTable({
      from: r.AutoModelsTable.mark_id,
      to: r.AutoMarksTable.id,
      optional: false,
    }),
    rating: r.one.AutoModelRatingsTable({
      from: r.AutoModelsTable.id,
      to: r.AutoModelRatingsTable.model_id,
    }),
    nameplates: r.many.AutoNameplatesTable(),
    generations: r.many.AutoGenerationsTable(),
  },
  AutoMarksTable: {
    country: r.one.AutoCountriesTable({
      from: r.AutoMarksTable.country_id,
      to: r.AutoCountriesTable.id,
    }),
    models: r.many.AutoModelsTable(),
  },
  AutoCountriesTable: {
    marks: r.many.AutoMarksTable(),
  },
  //
  //
  //   AutoCountriesTable: {
  //     marks: r.many.AutoMarksTable({
  //       from: r.AutoCountriesTable.id,
  //       to: r.AutoMarksTable.country_id,
  //     }),
  //   },
  //   AutoMarksTable: {
  //     country: r.one.AutoCountriesTable({
  //       from: r.AutoMarksTable.country_id,
  //       to: r.AutoCountriesTable.id,
  //       optional: false,
  //     }),
  //     models: r.many.AutoModelsTable({
  //       from: r.AutoMarksTable.id,
  //       to: r.AutoModelsTable.mark_id,
  //     }),
  //   },
  //   AutoModelsTable: {
  //     mark: r.one.AutoMarksTable({
  //       from: r.AutoModelsTable.mark_id,
  //       to: r.AutoMarksTable.id,
  //     }),
  //     rating: r.one.AutoModelRatingsTable({
  //       from: r.AutoModelsTable.id,
  //       to: r.AutoModelRatingsTable.model_id,
  //     }),
  //     nameplates: r.many.AutoNameplatesTable({
  //       from: r.AutoModelsTable.id,
  //       to: r.AutoNameplatesTable.model_id,
  //     }),
  //     generations: r.many.AutoGenerationsTable({
  //       from: r.AutoModelsTable.id,
  //       to: r.AutoGenerationsTable.model_id,
  //     }),
  //   },
  //   AutoModelRatingsTable: {
  //     model: r.one.AutoModelsTable({
  //       from: r.AutoModelRatingsTable.model_id,
  //       to: r.AutoModelsTable.id,
  //     }),
  //   },
  //   AutoNameplatesTable: {
  //     model: r.one.AutoModelsTable({
  //       from: r.AutoNameplatesTable.model_id,
  //       to: r.AutoModelsTable.id,
  //     }),
  //     tech_params: r.many.AutoTechParamsTable({
  //       from: r.AutoNameplatesTable.id,
  //       to: r.AutoTechParamsTable.nameplate_id,
  //     }),
  //   },
  //   AutoGenerationsTable: {
  //     model: r.one.AutoModelsTable({
  //       from: r.AutoGenerationsTable.model_id,
  //       to: r.AutoModelsTable.id,
  //     }),
  //     configurations: r.many.AutoConfigurationsTable({
  //       from: r.AutoGenerationsTable.id,
  //       to: r.AutoConfigurationsTable.generation_id,
  //     }),
  //   },
  //   AutoConfigurationsTable: {
  //     generation: r.one.AutoGenerationsTable({
  //       from: r.AutoConfigurationsTable.generation_id,
  //       to: r.AutoGenerationsTable.id,
  //     }),
  //     tech_params: r.many.AutoTechParamsTable({
  //       from: r.AutoConfigurationsTable.id,
  //       to: r.AutoTechParamsTable.configuration_id,
  //     }),
  //     complectations: r.many.AutoComplectationsTable({
  //       from: r.AutoConfigurationsTable.id,
  //       to: r.AutoComplectationsTable.configuration_id,
  //     }),
  //     promos: r.many.AutoConfigurationPromosTable({
  //       from: r.AutoConfigurationsTable.id,
  //       to: r.AutoConfigurationPromosTable.configuration_id,
  //     }),
  //   },
  //   AutoConfigurationPromosTable: {
  //     configuration: r.one.AutoConfigurationsTable({
  //       from: r.AutoConfigurationPromosTable.configuration_id,
  //       to: r.AutoConfigurationsTable.id,
  //     }),
  //   },
  //   AutoTechParamsTable: {
  //     nameplate: r.one.AutoNameplatesTable({
  //       from: r.AutoTechParamsTable.nameplate_id,
  //       to: r.AutoNameplatesTable.id,
  //     }),
  //     configuration: r.one.AutoConfigurationsTable({
  //       from: r.AutoTechParamsTable.configuration_id,
  //       to: r.AutoConfigurationsTable.id,
  //     }),
  //     complectations: r.many.AutoComplectationsTable({
  //       from: r.AutoTechParamsTable.id,
  //       to: r.AutoComplectationsTable.tech_param_id,
  //     }),
  //   },
  //   AutoEquipmentsTable: {
  //     equipment_options: r.many.AutoEquipmentOptionTable({
  //       from: r.AutoEquipmentsTable.id,
  //       to: r.AutoEquipmentOptionTable.equipment_id,
  //     }),
  //     packages: r.many.AutoPackagesTable({
  //       from: r.AutoEquipmentsTable.id,
  //       to: r.AutoPackagesTable.equipment_id,
  //     }),
  //     complectations: r.many.AutoComplectationsTable({
  //       from: r.AutoEquipmentsTable.id,
  //       to: r.AutoComplectationsTable.equipment_id,
  //     }),
  //   },
  //   AutoOptionGroupsTable: {
  //     options: r.many.AutoOptionsTable({
  //       from: r.AutoOptionGroupsTable.id,
  //       to: r.AutoOptionsTable.group_id,
  //     }),
  //   },
  //   AutoOptionsTable: {
  //     group: r.one.AutoOptionGroupsTable({
  //       from: r.AutoOptionsTable.group_id,
  //       to: r.AutoOptionGroupsTable.id,
  //     }),
  //     equipment_options: r.many.AutoEquipmentOptionTable({
  //       from: r.AutoOptionsTable.id,
  //       to: r.AutoEquipmentOptionTable.option_id,
  //     }),
  //     package_options: r.many.AutoPackageOptionTable({
  //       from: r.AutoOptionsTable.id,
  //       to: r.AutoPackageOptionTable.option_id,
  //     }),
  //   },
  //   AutoEquipmentOptionTable: {
  //     equipment: r.one.AutoEquipmentsTable({
  //       from: r.AutoEquipmentOptionTable.equipment_id,
  //       to: r.AutoEquipmentsTable.id,
  //     }),
  //     option: r.one.AutoOptionsTable({
  //       from: r.AutoEquipmentOptionTable.option_id,
  //       to: r.AutoOptionsTable.id,
  //     }),
  //   },
  //   AutoPackagesTable: {
  //     equipment: r.one.AutoEquipmentsTable({
  //       from: r.AutoPackagesTable.equipment_id,
  //       to: r.AutoEquipmentsTable.id,
  //     }),
  //     package_options: r.many.AutoPackageOptionTable({
  //       from: r.AutoPackagesTable.id,
  //       to: r.AutoPackageOptionTable.package_id,
  //     }),
  //   },
  //   AutoPackageOptionTable: {
  //     package: r.one.AutoPackagesTable({
  //       from: r.AutoPackageOptionTable.package_id,
  //       to: r.AutoPackagesTable.id,
  //     }),
  //     option: r.one.AutoOptionsTable({
  //       from: r.AutoPackageOptionTable.option_id,
  //       to: r.AutoOptionsTable.id,
  //     }),
  //   },
  //   AutoComplectationsTable: {
  //     configuration: r.one.AutoConfigurationsTable({
  //       from: r.AutoComplectationsTable.configuration_id,
  //       to: r.AutoConfigurationsTable.id,
  //     }),
  //     tech_param: r.one.AutoTechParamsTable({
  //       from: r.AutoComplectationsTable.tech_param_id,
  //       to: r.AutoTechParamsTable.id,
  //     }),
  //     equipment: r.one.AutoEquipmentsTable({
  //       from: r.AutoComplectationsTable.equipment_id,
  //       to: r.AutoEquipmentsTable.id,
  //     }),
  //     offers: r.many.OfferOffersTable({
  //       from: r.AutoComplectationsTable.id,
  //       to: r.OfferOffersTable.complectation_id,
  //     }),
  //   },
  //   AutoTechInfoGroupsTable: {
  //     tech_infos: r.many.AutoTechInfosTable({
  //       from: r.AutoTechInfoGroupsTable.id,
  //       to: r.AutoTechInfosTable.group_id,
  //     }),
  //   },
  //   AutoTechInfosTable: {
  //     group: r.one.AutoTechInfoGroupsTable({
  //       from: r.AutoTechInfosTable.group_id,
  //       to: r.AutoTechInfoGroupsTable.id,
  //     }),
  //   },
  //    //
  //    //
  //    //
  //    //
  //    //
  //   OfferOffersTable: {
  //     complectation: r.one.AutoComplectationsTable({
  //       from: r.OfferOffersTable.complectation_id,
  //       to: r.AutoComplectationsTable.id,
  //     }),
  //     discounts: r.many.OfferOfferDiscountsTable({
  //       from: r.OfferOffersTable.id,
  //       to: r.OfferOfferDiscountsTable.offer_id,
  //     }),
  //     images: r.many.OfferOfferImagesTable({
  //       from: r.OfferOffersTable.id,
  //       to: r.OfferOfferImagesTable.offer_id,
  //     }),
  //   },
  //   OfferOfferDiscountsTable: {
  //     offer: r.one.OfferOffersTable({
  //       from: r.OfferOfferDiscountsTable.offer_id,
  //       to: r.OfferOffersTable.id,
  //     }),
  //   },
  //   OfferOfferImagesTable: {
  //     offer: r.one.OfferOffersTable({
  //       from: r.OfferOfferImagesTable.offer_id,
  //       to: r.OfferOffersTable.id,
  //     }),
  //   },
}));
