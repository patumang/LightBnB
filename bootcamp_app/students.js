const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const userInput = process.argv.splice(2);
const cohortName = userInput[0];
const rowsLimit = userInput[1];
pool.query(`
SELECT students.id, students.name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name like '%${cohortName}%'
LIMIT ${rowsLimit} || 5;
`)
  .then(res => {
    //console.log(res.rows);
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));