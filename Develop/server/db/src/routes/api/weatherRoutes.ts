import { Router, type Request, type Response } from 'express';
const router = Router();

// Import the services
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // TODO: GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(city);
    
    // TODO: save city to search history
    await HistoryService.addCity(city);

    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json(cities);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await HistoryService.removeCity(id);
    return res.status(200).json({ message: 'City removed from search history' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});

export default router;

