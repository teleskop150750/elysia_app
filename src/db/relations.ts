import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  // #region Complectations
  AutoComplectationsTable: {
    configuration: r.one.AutoConfigurationsTable({
      from: r.AutoComplectationsTable.configuration_id,
      to: r.AutoConfigurationsTable.id,
      optional: false,
    }),
    tech_param: r.one.AutoTechParamsTable({
      from: r.AutoComplectationsTable.tech_param_id,
      to: r.AutoTechParamsTable.id,
      optional: false,
    }),
    equipment: r.one.AutoEquipmentsTable({
      from: r.AutoComplectationsTable.equipment_id,
      to: r.AutoEquipmentsTable.id,
    }),
  },
  // #endregion Complectations
  // #region Equipments
  AutoPackagesTable: {
    equipment: r.one.AutoEquipmentsTable({
      from: r.AutoPackagesTable.equipment_id,
      to: r.AutoEquipmentsTable.id,
      optional: false,
    }),
    options: r.many.AutoOptionsTable({
      from: r.AutoPackagesTable.id.through(r.AutoPackageOptionTable.package_id),
      to: r.AutoOptionsTable.id.through(r.AutoPackageOptionTable.option_id),
    }),
  },
  AutoEquipmentsTable: {
    options: r.many.AutoOptionsTable({
      from: r.AutoEquipmentsTable.id.through(
        r.AutoEquipmentOptionTable.equipment_id,
      ),
      to: r.AutoOptionsTable.id.through(r.AutoEquipmentOptionTable.option_id),
    }),
    packages: r.many.AutoPackagesTable(),
    complectations: r.many.AutoComplectationsTable(),
  },
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
  // // #endregion Equipments
  // // #region TechParams
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
    // complectations: r.many.AutoComplectationsTable(),
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
    complectations: r.many.AutoComplectationsTable(),
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
  // #endregion TechParams
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
