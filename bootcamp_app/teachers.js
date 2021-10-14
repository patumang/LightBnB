const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';
// Store all potentially malicious values in an array.
const values = [cohortName];
const queryString = `
SELECT DISTINCT(teachers.name) as teacher, cohorts.name as cohort
FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;
pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(data => {
      console.log(`${data.cohort}: ${data.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));
