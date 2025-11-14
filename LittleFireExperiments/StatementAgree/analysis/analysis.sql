SELECT R.question, AVG(CAST(R.value AS INTEGER))
FROM "agreeOrDisagree" AS R
WHERE R."prolificId" IN (
  SELECT S."prolificId"
  FROM "agreeOrDisagree" AS S 
  GROUP BY S."prolificId"
  HAVING COUNT(S.id) = 12
)
GROUP BY R.question