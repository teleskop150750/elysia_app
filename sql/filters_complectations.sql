SELECT
    "d0"."id" AS "id",
    "d0"."slug" AS "slug",
    "d0"."configuration_id" AS "configuration_id",
    "d0"."tech_param_id" AS "tech_param_id",
    "d0"."equipment_id" AS "equipment_id",
    "configuration"."r" AS "configuration",
    "tech_param"."r" AS "tech_param",
    "equipment"."r" AS "equipment"
FROM
    "auto"."complectations" AS "d0"
    LEFT JOIN LATERAL (
        SELECT row_to_json("t".*) "r"
        FROM (
                SELECT
                    "d1"."id" AS "id", "d1"."human_name" AS "human_name", "d1"."auto_class" AS "auto_class", "d1"."boot_volume_max" AS "boot_volume_max", "d1"."boot_volume_min" AS "boot_volume_min", "d1"."doors_count" AS "doors_count", "generation"."r" AS "generation", "promos"."r" AS "promos"
                FROM
                    "auto"."configurations" AS "d1"
                    LEFT JOIN LATERAL (
                        SELECT row_to_json("t".*) "r"
                        FROM (
                                SELECT
                                    "d2"."id" AS "id", "d2"."slug" AS "slug", "d2"."name" AS "name", "d2"."cyrillic_name" AS "cyrillic_name", "model"."r" AS "model"
                                FROM "auto"."generations" AS "d2"
                                    LEFT JOIN LATERAL (
                                        SELECT row_to_json("t".*) "r"
                                        FROM (
                                                SELECT
                                                    "d3"."id" AS "id", "d3"."slug" AS "slug", "d3"."name" AS "name", "d3"."cyrillic_name" AS "cyrillic_name", "mark"."r" AS "mark"
                                                FROM "auto"."models" AS "d3"
                                                    LEFT JOIN LATERAL (
                                                        SELECT row_to_json("t".*) "r"
                                                        FROM (
                                                                SELECT
                                                                    "d4"."id" AS "id", "d4"."slug" AS "slug", "d4"."name" AS "name", "d4"."cyrillic_name" AS "cyrillic_name", "country"."r" AS "country"
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
                                WHERE
                                    "d1"."generation_id" = "d2"."id"
                                LIMIT $4
                            ) AS "t"
                    ) AS "generation" ON TRUE
                    LEFT JOIN LATERAL (
                        SELECT coalesce(
                                json_agg(row_to_json("t".*)), '[]'
                            ) AS "r"
                        FROM (
                                SELECT "d2"."id" AS "id", "d2"."name" AS "name", "d2"."url" AS "url"
                                FROM "auto"."configuration_promos" AS "d2"
                                WHERE
                                    "d1"."id" = "d2"."configuration_id"
                                LIMIT $5
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
                    "d1"."id" AS "id", "d1"."slug" AS "slug", "d1"."name" AS "name", "d1"."human_name" AS "human_name", "d1"."engine_order" AS "engine_order", "d1"."engine_type" AS "engine_type"
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
                    "d1"."id" AS "id", "d1"."slug" AS "slug", "d1"."name" AS "name", "options"."r" AS "options", "packages"."r" AS "packages"
                FROM
                    "auto"."equipments" AS "d1"
                    LEFT JOIN LATERAL (
                        SELECT coalesce(
                                json_agg(row_to_json("t".*)), '[]'
                            ) AS "r"
                        FROM (
                                SELECT "d2"."id" AS "id", "d2"."name" AS "name", "group"."r" AS "group"
                                FROM
                                    "auto"."options" AS "d2"
                                    INNER JOIN "auto"."equipment_option" AS "tr1" ON "tr1"."option_id" = "d2"."id"
                                    LEFT JOIN LATERAL (
                                        SELECT row_to_json("t".*) "r"
                                        FROM (
                                                SELECT "d3"."id" AS "id", "d3"."name" AS "name"
                                                FROM "auto"."option_groups" AS "d3"
                                                WHERE
                                                    "d2"."group_id" = "d3"."id"
                                                LIMIT $8
                                            ) AS "t"
                                    ) AS "group" ON TRUE
                                WHERE
                                    "d1"."id" = "tr1"."equipment_id"
                                LIMIT $9
                            ) AS "t"
                    ) AS "options" ON TRUE
                    LEFT JOIN LATERAL (
                        SELECT coalesce(
                                json_agg(row_to_json("t".*)), '[]'
                            ) AS "r"
                        FROM (
                                SELECT "d2"."id" AS "id", "d2"."name" AS "name", "options"."r" AS "options"
                                FROM "auto"."packages" AS "d2"
                                    LEFT JOIN LATERAL (
                                        SELECT coalesce(
                                                json_agg(row_to_json("t".*)), '[]'
                                            ) AS "r"
                                        FROM (
                                                SELECT "d3"."id" AS "id", "d3"."name" AS "name", "group"."r" AS "group"
                                                FROM
                                                    "auto"."options" AS "d3"
                                                    INNER JOIN "auto"."package_option" AS "tr2" ON "tr2"."option_id" = "d3"."id"
                                                    LEFT JOIN LATERAL (
                                                        SELECT row_to_json("t".*) "r"
                                                        FROM (
                                                                SELECT "d4"."id" AS "id", "d4"."name" AS "name"
                                                                FROM "auto"."option_groups" AS "d4"
                                                                WHERE
                                                                    "d3"."group_id" = "d4"."id"
                                                                LIMIT $10
                                                            ) AS "t"
                                                    ) AS "group" ON TRUE
                                                WHERE
                                                    "d2"."id" = "tr2"."package_id"
                                                LIMIT $11
                                            ) AS "t"
                                    ) AS "options" ON TRUE
                                WHERE
                                    "d1"."id" = "d2"."equipment_id"
                                LIMIT $12
                            ) AS "t"
                    ) AS "packages" ON TRUE
                WHERE
                    "d0"."equipment_id" = "d1"."id"
                LIMIT $13
            ) AS "t"
    ) AS "equipment" ON TRUE
WHERE (
        EXISTS (
            SELECT *
            FROM "auto"."configurations" AS "f0"
            WHERE (
                    "d0"."configuration_id" = "f0"."id"
                    AND (
                        "f0"."auto_class" = $14
                        AND EXISTS (
                            SELECT *
                            FROM "auto"."generations" AS "f1"
                            WHERE (
                                    "f0"."generation_id" = "f1"."id"
                                    AND EXISTS (
                                        SELECT *
                                        FROM "auto"."models" AS "f2"
                                        WHERE (
                                                "f1"."model_id" = "f2"."id"
                                                AND EXISTS (
                                                    SELECT *
                                                    FROM "auto"."marks" AS "f3"
                                                    WHERE (
                                                            "f2"."mark_id" = "f3"."id"
                                                            AND EXISTS (
                                                                SELECT *
                                                                FROM "auto"."countries" AS "f4"
                                                                WHERE (
                                                                        "f3"."country_id" = "f4"."id"
                                                                        AND "f4"."id" IN ($15)
                                                                    )
                                                                LIMIT 1
                                                            )
                                                        )
                                                    LIMIT 1
                                                )
                                            )
                                        LIMIT 1
                                    )
                                )
                            LIMIT 1
                        )
                    )
                )
            LIMIT 1
        )
        AND EXISTS (
            SELECT *
            FROM "auto"."equipments" AS "f0"
            WHERE (
                    "d0"."equipment_id" = "f0"."id"
                    AND EXISTS (
                        SELECT *
                        FROM "auto"."packages" AS "f1"
                        WHERE
                            "f0"."id" = "f1"."equipment_id"
                        LIMIT 1
                    )
                )
            LIMIT 1
        )
    )
LIMIT $16 -- params: [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1, "D", "0198842f-d1c2-77ab-97f5-7d1dc40eabe8", 1]
