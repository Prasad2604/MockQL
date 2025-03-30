// utils/csvWorker.ts
export {}; // This makes the file a module

// The worker listens for messages with CSV text and file name
self.onmessage = (event: MessageEvent) => {
  const { fileName, csvText } = event.data;
  try {
    // Split CSV text into lines and remove empty lines
    console.log(fileName);
    const lines = csvText
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0);

    if (lines.length === 0) {
      throw new Error("CSV file is empty");
    }

    // Extract header columns from the first line
    const columns = lines[0].split(",").map((col: string) => col.trim());
    // Extract data rows and convert numeric values when possible
    const rows = lines.slice(1).map((line: string) =>
      line.split(",").map((cell: string) => {
        const trimmed = cell.trim();
        const num = Number(trimmed);
        return !isNaN(num) ? num : trimmed;
      })
    );

    // Send the parsed data back to the main thread
    self.postMessage({ columns, rows });
  } catch (error) {
    // Report any error encountered during parsing
    self.postMessage({
      error: error instanceof Error ? error.message : "Error parsing CSV",
    });
  }
};
