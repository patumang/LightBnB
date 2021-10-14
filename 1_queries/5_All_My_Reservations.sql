SELECT p.id, p.title, p.cost_per_night, p.owner_id, r.start_date, AVG(pr.rating) as average_rating
FROM properties p
  JOIN reservations r ON p.id = r.property_id
  JOIN property_reviews pr ON p.id = pr.property_id
WHERE r.guest_id = 1 AND r.end_date < now()::date
GROUP BY p.id, r.start_date
ORDER BY r.start_date
LIMIT 10;