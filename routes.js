import { facade } from "./lib/facade/Facade.js";

export const setupRoutes = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    return next();
  });

  app.get('/flights', async (req, res) => {
    try {
      const results = await facade.selectFlights();
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json(`There was an error with your request`);
    }
  });

  app.post('/jobs/flightingest', async (req, res) => {
    const result = await facade.ingestFlights();
    if (result.success) {
      res.status(200).json(`Ingest successful`);
    } else {
      res.status(result.errorCode ?? 500).send();
    }
  });

  app.get('*', (req, res) => {
    res.status(404).json('Route Not Found');
  });
};
