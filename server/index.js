const express = require('express'),
      port = 3333,
      app = express();

app.use(express.json());

app.listen(port, () => console.log(`Server running on ${port}`));