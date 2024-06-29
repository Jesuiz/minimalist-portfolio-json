import { Middleware } from 'astro';
import fs from 'fs';
import path from 'path';

export function i18nMiddleware(req, res, next) {
  const lang = req.headers['accept-language']?.split(',')[0] || 'es';
  const jsonFile = `cv_${lang}.json`;

  try {
    const jsonData = fs.readFileSync(path.join(__dirname, `../data/${jsonFile}`), 'utf8');
    res.locals.cvData = JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error loading ${jsonFile}: ${error}`);
    res.locals.cvData = {};
  }

  next();
}