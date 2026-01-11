SELECT
    "d0"."id" AS "id",
    "d0"."slug" AS "slug",
    "d0"."base" AS "base",
    "d0"."offers_price_from"::text AS "offers_price_from",
    "d0"."offers_price_to"::text AS "offers_price_to",
    "d0"."configuration_id" AS "configuration_id",
    "d0"."tech_param_id" AS "tech_param_id",
    "d0"."equipment_id" AS "equipment_id",
    "d0"."crawlee_status" AS "crawlee_status",
    "configuration"."r" AS "configuration",
    "tech_param"."r" AS "tech_param",
    "equipment"."r" AS "equipment"
FROM
    "auto"."complectations" AS "d0"
    LEFT JOIN LATERAL (
        SELECT row_to_json("t".*) "r"
        FROM (
                SELECT
                    "d1"."id" AS "id", "d1"."hash_entity" AS "hash_entity", "d1"."autoru_id"::text AS "autoru_id", "d1"."slug" AS "slug", "d1"."name" AS "name", "d1"."human_name" AS "human_name", "d1"."auto_class" AS "auto_class", "d1"."available_steering_wheel" AS "available_steering_wheel", "d1"."back_wheel_base" AS "back_wheel_base", "d1"."body_code" AS "body_code", "d1"."body_size" AS "body_size", "d1"."body_type" AS "body_type", "d1"."body_type_id" AS "body_type_id", "d1"."body_type_group" AS "body_type_group", "d1"."boot_volume_max" AS "boot_volume_max", "d1"."boot_volume_min" AS "boot_volume_min", "d1"."doors_count" AS "doors_count", "d1"."front_brake" AS "front_brake", "d1"."front_suspension" AS "front_suspension", "d1"."front_wheel_base" AS "front_wheel_base", "d1"."height" AS "height", "d1"."max_price" AS "max_price", "d1"."min_price" AS "min_price", "d1"."photo" AS "photo", "d1"."seats" AS "seats", "d1"."steering_wheel" AS "steering_wheel", "d1"."tank_volume" AS "tank_volume", "d1"."turning_circle" AS "turning_circle", "d1"."wheel_base" AS "wheel_base", "d1"."width" AS "width", "d1"."width_mirrors" AS "width_mirrors", "d1"."new_offers_count" AS "new_offers_count", "d1"."total_offers_count" AS "total_offers_count", "d1"."used_offers_count" AS "used_offers_count", "d1"."offers_max_price" AS "offers_max_price", "d1"."offers_min_price" AS "offers_min_price", "d1"."new_offers_max_price" AS "new_offers_max_price", "d1"."new_offers_min_price" AS "new_offers_min_price", "d1"."used_offers_max_price" AS "used_offers_max_price", "d1"."used_offers_min_price" AS "used_offers_min_price", "d1"."body_id" AS "body_id", "d1"."generation_id" AS "generation_id", "d1"."crawlee_status" AS "crawlee_status", "d1"."s3_status" AS "s3_status", "generation"."r" AS "generation", "promos"."r" AS "promos"
                FROM
                    "auto"."configurations" AS "d1"
                    LEFT JOIN LATERAL (
                        SELECT row_to_json("t".*) "r"
                        FROM (
                                SELECT
                                    "d2"."id" AS "id", "d2"."autoru_id"::text AS "autoru_id", "d2"."slug" AS "slug", "d2"."name" AS "name", "d2"."cyrillic_name" AS "cyrillic_name", "d2"."group" AS "group", "d2"."photo" AS "photo", "d2"."segment" AS "segment", "d2"."year_from" AS "year_from", "d2"."year_to" AS "year_to", "d2"."is_no_complect" AS "is_no_complect", "d2"."is_restyle" AS "is_restyle", "d2"."model_id" AS "model_id", "d2"."s3_status" AS "s3_status", "model"."r" AS "model"
                                FROM "auto"."generations" AS "d2"
                                    LEFT JOIN LATERAL (
                                        SELECT row_to_json("t".*) "r"
                                        FROM (
                                                SELECT
                                                    "d3"."id" AS "id", "d3"."autoru_slug" AS "autoru_slug", "d3"."slug" AS "slug", "d3"."name" AS "name", "d3"."cyrillic_name" AS "cyrillic_name", "d3"."popular" AS "popular", "d3"."section" AS "section", "d3"."year_from" AS "year_from", "d3"."year_to" AS "year_to", "d3"."mark_id" AS "mark_id", "d3"."crawlee_status" AS "crawlee_status", "mark"."r" AS "mark"
                                                FROM "auto"."models" AS "d3"
                                                    LEFT JOIN LATERAL (
                                                        SELECT row_to_json("t".*) "r"
                                                        FROM (
                                                                SELECT
                                                                    "d4"."id" AS "id", "d4"."autoru_slug" AS "autoru_slug", "d4"."autoru_id"::text AS "autoru_id", "d4"."slug" AS "slug", "d4"."name" AS "name", "d4"."cyrillic_name" AS "cyrillic_name", "d4"."logo" AS "logo", "d4"."black_logo" AS "black_logo", "d4"."popular" AS "popular", "d4"."year_from" AS "year_from", "d4"."year_to" AS "year_to", "d4"."country_id" AS "country_id", "d4"."crawlee_status" AS "crawlee_status", "country"."r" AS "country"
                                                                FROM "auto"."marks" AS "d4"
                                                                    LEFT JOIN LATERAL (
                                                                        SELECT row_to_json("t".*) "r"
                                                                        FROM (
                                                                                SELECT "d5"."id" AS "id", "d5"."name" AS "name"
                                                                                FROM "auto"."countries" AS "d5"
                                                                                WHERE
                                                                                    "d4"."country_id" = "d5"."id"
                                                                                LIMIT $1
                                                                            ) AS "t"
                                                                    ) AS "country" ON TRUE
                                                                WHERE
                                                                    "d3"."mark_id" = "d4"."id"
                                                                LIMIT $2
                                                            ) AS "t"
                                                    ) AS "mark" ON TRUE
                                                WHERE
                                                    "d2"."model_id" = "d3"."id"
                                                LIMIT $3
                                            ) AS "t"
                                    ) AS "model" ON TRUE
                                WHERE (
                                        "d2"."id" = $4
                                        AND "d1"."generation_id" = "d2"."id"
                                    )
                                LIMIT $5
                            ) AS "t"
                    ) AS "generation" ON TRUE
                    LEFT JOIN LATERAL (
                        SELECT coalesce(
                                json_agg(row_to_json("t".*)), '[]'
                            ) AS "r"
                        FROM (
                                SELECT
                                    "d2"."id" AS "id", "d2"."name" AS "name", "d2"."url" AS "url", "d2"."configuration_id" AS "configuration_id", "d2"."s3_status" AS "s3_status", "d2"."s3_key" AS "s3_key"
                                FROM "auto"."configuration_promos" AS "d2"
                                WHERE
                                    "d1"."id" = "d2"."configuration_id"
                            ) AS "t"
                    ) AS "promos" ON TRUE
                WHERE
                    "d0"."configuration_id" = "d1"."id"
                LIMIT $6
            ) AS "t"
    ) AS "configuration" ON TRUE
    LEFT JOIN LATERAL (
        SELECT row_to_json("t".*) "r"
        FROM (
                SELECT
                    "d1"."id" AS "id", "d1"."hash_entity" AS "hash_entity", "d1"."autoru_id"::text AS "autoru_id", "d1"."slug" AS "slug", "d1"."name" AS "name", "d1"."human_name" AS "human_name", "d1"."acceleration" AS "acceleration", "d1"."back_brake" AS "back_brake", "d1"."back_suspension" AS "back_suspension", "d1"."battery_capacity" AS "battery_capacity", "d1"."battery_capacity_useful" AS "battery_capacity_useful", "d1"."battery_charge_cycles"::text AS "battery_charge_cycles", "d1"."battery_temp" AS "battery_temp", "d1"."charge_time" AS "charge_time", "d1"."charging_port_type" AS "charging_port_type", "d1"."charging_port_types" AS "charging_port_types", "d1"."clearance" AS "clearance", "d1"."compression" AS "compression", "d1"."consump_kwt" AS "consump_kwt", "d1"."consumption_calc" AS "consumption_calc", "d1"."consumption_city" AS "consumption_city", "d1"."consumption_hiway" AS "consumption_hiway", "d1"."consumption_mixed" AS "consumption_mixed", "d1"."cylinders_order" AS "cylinders_order", "d1"."cylinders_value" AS "cylinders_value", "d1"."diameter" AS "diameter", "d1"."disk_size" AS "disk_size", "d1"."displacement" AS "displacement", "d1"."electric_range" AS "electric_range", "d1"."emission_euro_class" AS "emission_euro_class", "d1"."engine_alias" AS "engine_alias", "d1"."engine_aliases" AS "engine_aliases", "d1"."engine_feeding" AS "engine_feeding", "d1"."engine_id" AS "engine_id", "d1"."engine_model" AS "engine_model", "d1"."engine_order" AS "engine_order", "d1"."engine_type" AS "engine_type", "d1"."ev_battery_type" AS "ev_battery_type", "d1"."feeding" AS "feeding", "d1"."fuel_emission" AS "fuel_emission", "d1"."fuel_tank_volume" AS "fuel_tank_volume", "d1"."full_charge_time" AS "full_charge_time", "d1"."full_weight" AS "full_weight", "d1"."gear_type" AS "gear_type", "d1"."gear_type_autoru" AS "gear_type_autoru", "d1"."gear_value" AS "gear_value", "d1"."landing_wheels_size" AS "landing_wheels_size", "d1"."max_power_in" AS "max_power_in", "d1"."max_speed" AS "max_speed", "d1"."moment" AS "moment", "d1"."moment_rpm" AS "moment_rpm", "d1"."nameplate_engine" AS "nameplate_engine", "d1"."nut_bolt_size" AS "nut_bolt_size", "d1"."optional_tires_size" AS "optional_tires_size", "d1"."origin_tires_size" AS "origin_tires_size", "d1"."origin_wheels_size" AS "origin_wheels_size", "d1"."petrol_type" AS "petrol_type", "d1"."power" AS "power", "d1"."power_docs" AS "power_docs", "d1"."power_kvt" AS "power_kvt", "d1"."power_rpm" AS "power_rpm", "d1"."quick_charge_description" AS "quick_charge_description", "d1"."quick_charge_time" AS "quick_charge_time", "d1"."tightening_torque" AS "tightening_torque", "d1"."tire_pressure" AS "tire_pressure", "d1"."total_range" AS "total_range", "d1"."transmission" AS "transmission", "d1"."transmission_autoru" AS "transmission_autoru", "d1"."trunk_volume_max" AS "trunk_volume_max", "d1"."trunk_volume_min" AS "trunk_volume_min", "d1"."valves" AS "valves", "d1"."valvetrain" AS "valvetrain", "d1"."weight"::text AS "weight", "d1"."wheel_size" AS "wheel_size", "d1"."year_start" AS "year_start", "d1"."year_stop" AS "year_stop", "d1"."nameplate_id" AS "nameplate_id", "d1"."configuration_id" AS "configuration_id"
                FROM "auto"."tech_params" AS "d1"
                WHERE
                    "d0"."tech_param_id" = "d1"."id"
                LIMIT $7
            ) AS "t"
    ) AS "tech_param" ON TRUE
    LEFT JOIN LATERAL (
        SELECT row_to_json("t".*) "r"
        FROM (
                SELECT
                    "d1"."id" AS "id", "d1"."slug" AS "slug", "d1"."name" AS "name", "d1"."new_offers_count" AS "new_offers_count", "d1"."total_offers_count" AS "total_offers_count", "d1"."used_offers_count" AS "used_offers_count", "d1"."offers_max_price" AS "offers_max_price", "d1"."offers_min_price" AS "offers_min_price", "d1"."new_offers_max_price" AS "new_offers_max_price", "d1"."new_offers_min_price" AS "new_offers_min_price", "d1"."used_offers_max_price" AS "used_offers_max_price", "d1"."used_offers_min_price" AS "used_offers_min_price", "d1"."crawlee_status" AS "crawlee_status"
                FROM "auto"."equipments" AS "d1"
                WHERE
                    "d0"."equipment_id" = "d1"."id"
                LIMIT $8
            ) AS "t"
    ) AS "equipment" ON TRUE
LIMIT $9
