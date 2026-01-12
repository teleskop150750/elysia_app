SELECT
    "d0"."id" AS "id",
    "d0"."slug" AS "slug",
    "d0"."base" AS "base",
    "d0"."offers_price_from"::text AS "offers_price_from",
    "d0"."offers_price_to"::text AS "offers_price_to",
    "d0"."configuration_id" AS "configuration_id",
    "d0"."tech_param_id" AS "tech_param_id",
    "d0"."equipment_id" AS "equipment_id",
    "d0"."crawlee_status" AS "crawlee_status"
FROM "auto"."complectations" AS "d0"
WHERE
    EXISTS (
        SELECT *
        FROM "auto"."configurations" AS "f0"
        WHERE (
                "d0"."configuration_id" = "f0"."id"
                AND (
                    "f0"."auto_class" = $1
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
                                                                    AND "f4"."id" IN ($2)
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
LIMIT $3 -- params: ["D", "0198842f-cdfc-722f-820a-7228f8c2482e", 5]
