export interface Query {
    id: string;
    name: string;
    sql: string;
    description: string;
  }
  
  export interface QueryResult {
    columns: string[];
    rows: any[];
    rowCount: number;
    executionTime: number;
  }
  
  export interface QueryHistory {
    id: string;
    query: string;
    timestamp: Date;
    result: QueryResult;
  }
  
  export interface TableColumn {
    name: string;
    type: string;
    nullable: boolean;
  }
  
  export interface TableSchema {
    name: string;
    columns: TableColumn[];
    rowCount: number;
  } 