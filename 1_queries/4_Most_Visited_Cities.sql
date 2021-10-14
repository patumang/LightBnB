SELECT p.city, COUNT(r.*) as total_reservations
FROM properties p
  JOIN reservations r ON property_id = p.id
GROUP BY p.city
ORDER BY total_reservations DESC;