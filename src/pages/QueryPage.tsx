import { useState, useCallback } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import {SQLEditor} from "../components/SQLEditor";
import { Query, QueryResult,QueryHistory as QueryHistoryType } from '../types';
import { ResultsTable } from "../components/ResultTable";
import { predefinedQueries } from '../data/predefinedQueries';
import { executeQuery } from '../utils/csvParser';
import { v4 as uuidv4 } from 'uuid';
import { QueryHistory } from "../components/QueryHistory";


export default function QueryPage() {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [sqlInput, setSqlInput] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [history, setHistory] = useState<QueryHistoryType[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeAndUpdateHistory = async (sql: string) => {
    setIsLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const data = await executeQuery(sql);
      const executionTime = performance.now() - startTime;

      const result: QueryResult = {
        columns: data.columns,
        rows: data.rows,
        executionTime
      };

      setQueryResult(result);
      
      const historyItem: QueryHistoryType = {
        id: uuidv4(),
        query: sql,
        timestamp: new Date(),
        result
      };
      
      setHistory(prev => [historyItem, ...prev].slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute query');
      setQueryResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuerySelect = useCallback((queryId: string) => {
    const query = predefinedQueries.find(q => q.id === queryId);
    if (query) {
      setSelectedQuery(query);
      setSqlInput(query.sql);
      executeAndUpdateHistory(query.sql);
    }
  }, []);

  const handleRunQuery = useCallback(() => {
    if (!sqlInput.trim()) return;
    executeAndUpdateHistory(sqlInput);
  }, [sqlInput]);

  const handleHistorySelect = useCallback((query: string) => {
    setSqlInput(query);
  }, []);

  const handleHistoryDelete = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      height: '100vh',
      bgcolor: '#f1f5f9',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* History Panel */}
      <Box
        sx={{
          width: isHistoryOpen ? 300 : 40,
          height: '100vh',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: '#1e293b',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <IconButton
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          sx={{
            position: 'absolute',
            right: isHistoryOpen ? 8 : '50%',
            top: isHistoryOpen ? 8 : 8,
            transform: isHistoryOpen ? 'none' : 'translateX(50%)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            },
            transition: 'all 0.3s ease',
            zIndex: 2
          }}
        >
          {isHistoryOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {isHistoryOpen && (
          <Box sx={{ 
            width: '100%', 
            height: '100%',
            pt: 6
          }}>
            <QueryHistory
              history={history}
              onSelectQuery={handleHistorySelect}
              onDeleteQuery={handleHistoryDelete}
            />
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1,
        height: '100vh',
        overflow: 'hidden',
        p: 4
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
            SQL Query Visualizer
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Write and execute SQL queries with instant visualization
          </Typography>
        </Box>
        
        <Box sx={{ 
          height: 'calc(100vh - 140px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: '#ffffff',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              flex: '0 0 35%'
            }}
          >
            <Box sx={{ 
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: '#f8fafc',
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <FormControl size="small" sx={{ minWidth: "70%" }}>
                <InputLabel>Predefined Queries</InputLabel>
                <Select
                  value={selectedQuery?.id || ''}
                  label="Predefined Queries"
                  onChange={(e) => handleQuerySelect(e.target.value)}
                >
                  {predefinedQueries.map((query) => (
                    <MenuItem key={query.id} value={query.id}>
                      {query.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                size="medium"
                startIcon={<PlayArrowIcon />}
                onClick={handleRunQuery}
                disabled={!sqlInput.trim() || isLoading}
                sx={{
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none'
                  }
                }}
              >
                {isLoading ? 'Running...' : 'Run Query'}
              </Button>
            </Box>
            <Box sx={{ flex: 1, position: 'relative' }}>
              <SQLEditor
                value={sqlInput}
                onChange={setSqlInput}
              />
            </Box>
          </Paper>
          
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
            {error ? (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #fecdd3',
                  bgcolor: '#fff1f2',
                  color: '#be123c'
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {error}
                </Typography>
              </Paper>
            ) : queryResult && (
              <ResultsTable result={queryResult} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

