const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const dataApp = require('./routers/DataApp');
const { createUsersTable } = require('./DataBaseFunctions');

const app = express();
app.use(bodyParser.json());
app.use(cors())
const PORT = 4000;

app.use(dataApp);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await createUsersTable(); // Ensure table is created on server startup
});
