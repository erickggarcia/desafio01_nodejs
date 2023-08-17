import { parse } from 'csv-parse';
import fs from 'node:fs';
import { DataBase } from '../database/database.js';
const database = new DataBase();

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  columns: true,
  delimiter: ','
});

async function run() {
  const linesParse = stream.pipe(csvParse)

  for await (const line of linesParse) {
    const { title, description } = line;
    

    const dataToInsert = {
      title,
      description, 
      completed_at: '',
      created_at: new Date().toISOString().slice(0, 19),
      updated_at: '',
    };

    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: database.insert('task', dataToInsert)
    });

    await wait(100);
  }
}

run();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
