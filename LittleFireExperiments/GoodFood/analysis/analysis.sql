SELECT R."foodType", R."selected", COUNT(*)
FROM (
  (
    SELECT * 
    FROM "whichFoodIsGood" AS R1
    WHERE R1."prolificId" != 'X'
      AND R1."foodType" = 'Meat'
    ORDER BY R1."id"
    LIMIT 50
  ) 
  UNION ALL
  (
      SELECT * 
      FROM "whichFoodIsGood" AS R2
      WHERE R2."prolificId" != 'X'
        AND R2."foodType" = 'Vegetables'
      ORDER BY R2."id"
      LIMIT 50
  )
) AS R
GROUP BY R."foodType", R."selected"