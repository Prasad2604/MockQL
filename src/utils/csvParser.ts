export interface CSVData {
    columns: string[];
    rows: any[][];
  }
  
  // List of available CSV files in the public/data directory
  const AVAILABLE_TABLES = ['order_details.csv', 'orders.csv', 'products.csv', 'shippers.csv', 'suppliers.csv'];
  
  export const parseCSV = async (fileName: string): Promise<CSVData> => {
    try {
      const response = await fetch(`/${fileName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
  
      if (lines.length === 0) {
        throw new Error('CSV file is empty');
      }
  
      const columns = lines[0].split(',').map(col => col.trim());
      const rows = lines.slice(1).map(line => 
        line.split(',').map(cell => {
          const trimmed = cell.trim();
          // Try to convert to number if possible
          const num = Number(trimmed);
          return !isNaN(num) ? num : trimmed;
        })
      );
  
      return { columns, rows };
    } catch (error) {
      console.error('Error parsing CSV:', error);
      throw new Error(`Failed to parse CSV file: ${fileName}`);
    }
  };
  
  export const getTableNameFromQuery = (query: string): string | null => {
    const match = query.match(/from\s+([^\s;]+)/i);
    return match ? match[1].toLowerCase() : null;
  };
  
  export const executeQuery = async (query: string, isPredefined: boolean = false): Promise<CSVData> => {
    try {
      if (isPredefined) {
        const tableName = getTableNameFromQuery(query);
        if (!tableName) {
          throw new Error('No table name found in query');
        }
        return await parseCSV(`${tableName}.csv`);
      } else {
        // For custom queries, randomly select one of the available CSV files
        const randomFile = AVAILABLE_TABLES[Math.floor(Math.random() * AVAILABLE_TABLES.length)];
        return await parseCSV(randomFile);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Query execution failed: ${error.message}`);
      }
      throw error;
    }
  }; 