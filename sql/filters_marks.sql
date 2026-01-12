SELECT
    "d0"."id" AS "id",
    "d0"."autoru_slug" AS "autoru_slug",
    "d0"."autoru_id"::text AS "autoru_id",
    "d0"."slug" AS "slug",
    "d0"."name" AS "name",
    "d0"."cyrillic_name" AS "cyrillic_name",
    "d0"."logo" AS "logo",
    "d0"."black_logo" AS "black_logo",
    "d0"."popular" AS "popular",
    "d0"."year_from" AS "year_from",
    "d0"."year_to" AS "year_to",
    "d0"."country_id" AS "country_id",
    "d0"."crawlee_status" AS "crawlee_status",
    "models"."r" AS "models"
FROM "auto"."marks" AS "d0"
    LEFT JOIN LATERAL (
        SELECT coalesce(
                json_agg(row_to_json("t".*)), '[]'
            ) AS "r"
        FROM (
                SELECT
                    "d1"."id" AS "id", "d1"."autoru_slug" AS "autoru_slug", "d1"."slug" AS "slug", "d1"."name" AS "name", "d1"."cyrillic_name" AS "cyrillic_name", "d1"."popular" AS "popular", "d1"."section" AS "section", "d1"."year_from" AS "year_from", "d1"."year_to" AS "year_to", "d1"."mark_id" AS "mark_id", "d1"."crawlee_status" AS "crawlee_status", "generations"."r" AS "generations"
                FROM "auto"."models" AS "d1"
                    LEFT JOIN LATERAL (
                        SELECT coalesce(
                                json_agg(row_to_json("t".*)), '[]'
                            ) AS "r"
                        FROM (
                                SELECT
                                    "d2"."id" AS "id", "d2"."autoru_id"::text AS "autoru_id", "d2"."slug" AS "slug", "d2"."name" AS "name", "d2"."cyrillic_name" AS "cyrillic_name", "d2"."group" AS "group", "d2"."photo" AS "photo", "d2"."segment" AS "segment", "d2"."year_from" AS "year_from", "d2"."year_to" AS "year_to", "d2"."is_no_complect" AS "is_no_complect", "d2"."is_restyle" AS "is_restyle", "d2"."model_id" AS "model_id", "d2"."s3_status" AS "s3_status"
                                FROM "auto"."generations" AS "d2"
                                WHERE (
                                        "d2"."id" IN ($1)
                                        AND "d1"."id" = "d2"."model_id"
                                    )
                            ) AS "t"
                    ) AS "generations" ON TRUE
                WHERE (
                        EXISTS (
                            SELECT *
                            FROM "auto"."generations" AS "f0"
                            WHERE (
                                    "d1"."id" = "f0"."model_id"
                                    AND "f0"."id" IN ($2)
                                )
                            LIMIT 1
                        )
                        AND "d0"."id" = "d1"."mark_id"
                    )
            ) AS "t"
    ) AS "models" ON TRUE
WHERE (
        EXISTS (
            SELECT *
            FROM "auto"."countries" AS "f0"
            WHERE (
                    "d0"."country_id" = "f0"."id"
                    AND "f0"."id" IN ($3)
                )
            LIMIT 1
        )
        AND EXISTS (
            SELECT *
            FROM "auto"."models" AS "f0"
            WHERE (
                    "d0"."id" = "f0"."mark_id"
                    AND EXISTS (
                        SELECT *
                        FROM "auto"."generations" AS "f1"
                        WHERE (
                                "f0"."id" = "f1"."model_id"
                                AND "f1"."id" IN ($4)
                            )
                        LIMIT 1
                    )
                )
            LIMIT 1
        )
    )
LIMIT $5 -- params: ["01988396-ec68-74ac-a900-c355f195ec37", "01988396-ec68-74ac-a900-c355f195ec37", "0198842f-cdfc-722f-820a-7228f8c2482e", "01988396-ec68-74ac-a900-c355f195ec37", 5]
