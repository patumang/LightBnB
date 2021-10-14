const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT(teachers.name) as teacher, cohorts.name as cohort
FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(data => {
      console.log(`${data.cohort}: ${data.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));
