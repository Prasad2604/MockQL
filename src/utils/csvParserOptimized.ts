// utils/csvParserOptimized.ts
import type { CSVData } from "../types";

// In-memory cache for parsed CSV data
const csvCache: Record<string, CSVData> = {};

// List of available CSV files in the public folder
const AVAILABLE_TABLES = [
  "order_details.csv",
  "orders.csv",
  "products.csv",
  "shippers.csv",
  "suppliers.csv",
];

/**
 * Fetches and parses a CSV file using a Web Worker.
 */
export const parseCSV = async (fileName: string): Promise<CSVData> => {
  // Return cached result if available
  if (csvCache[fileName]) {
    return csvCache[fileName];
  }

  try {
    const response = await fetch(`/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
    }

    const csvText = await response.text();
    console.log("filename: ",fileName, " data : ",csvText);
    // Offload parsing to the worker
    const data = await parseCSVInWorker(fileName, csvText);
    console.log("data : ---------------------------------- ",data);
    // Cache the parsed data for future use
    csvCache[fileName] = data;
    return data;
  } catch (error) {
    console.error("Error parsing CSV:", error);
    throw new Error(`Failed to parse CSV file: ${fileName}`);
  }
};

/**
 * Uses a Web Worker to parse CSV text.
 */
function parseCSVInWorker(fileName: string, csvText: string): Promise<CSVData> {
    return new Promise((resolve, reject) => {
      // Specify type: 'module' so the worker loads as an ES module
      const worker = new Worker(new URL("./csvWorker.ts", import.meta.url), {
        type: "module",
      });
  
      worker.onmessage = (event) => {
        const { columns, rows, error } = event.data;
        if (error) {
          reject(new Error(error));
        } else {
          resolve({ columns, rows });
        }
        worker.terminate();
      };
  
      worker.onerror = (err) => {
        reject(err);
        worker.terminate();
      };
  
      // Send the CSV text and file name to the worker
      worker.postMessage({ fileName, csvText });
    });
  }
  

/**
 * Executes a query by randomly selecting one of the available CSV files.
 *
 * For any query provided, a random CSV file from the available tables is used.
 */
export const executeQuery = async (
    query: string,
    tableName?: string
  ): Promise<CSVData> => {
    try {
        console.log("table name : ",query);
      if (tableName) {
        // Use the provided CSV file.
        return await parseCSV(tableName);
      } else {
        // No table provided—choose a random file.
        const randomFile =
        AVAILABLE_TABLES[Math.floor(Math.random() * AVAILABLE_TABLES.length)];
        console.log("random file : ", randomFile);
        return await parseCSV(randomFile);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Query execution failed: ${error.message}`);
      }
      throw error;
    }
  };
