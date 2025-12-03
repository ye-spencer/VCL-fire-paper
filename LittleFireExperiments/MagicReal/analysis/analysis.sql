SELECT R."selected", COUNT(*)
FROM "whatMakesMagicReal" AS R 
WHERE R."prolificId" !='X'
GROUP BY R."selected"