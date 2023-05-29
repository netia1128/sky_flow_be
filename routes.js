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

  app.get('/', async (req, res) => {
    console.log(`hello world`);
    res.status(200).json('HELLO WORLD!');
  });

  app.get('/flights', async (req, res) => {
    const results = await facade.selectFlights();
    res.status(200).json(results);
  });

  app.post('/jobs/flightingest', async (req, res) => {
    const result = await facade.ingestFlights();
    res.status(200).json(result);
  });

  app.get('*', (req, res) => {
    res.status(404).json('Route Not Found');
  });
};
