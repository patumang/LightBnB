SELECT p.id, p.title, p.cost_per_night, AVG(pr.rating) as average_rating
FROM properties p
  JOIN property_reviews pr ON property_id = p.id
WHERE p.city like '%Vancouver'
GROUP BY p.id
HAVING AVG(pr.rating) >= 4
ORDER BY p.cost_per_night
LIMIT 10;