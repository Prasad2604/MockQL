import { useState, useCallback } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {SQLEditor} from "../components/SQLEditor";
import { Query, QueryResult } from '../types';
import { ResultsTable } from "../components/ResultTable";
import { predefinedQueries } from '../data/predefinedQueries';


export default function QueryPage() {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [sqlInput, setSqlInput] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuerySelect = useCallback((queryId: string) => {
    const query = predefinedQueries.find(q => q.id === queryId);
    if (query) {
      setSelectedQuery(query);
      setSqlInput(query.sql);
      // executeAndUpdateHistory(query.sql);
    }
  }, []);

  const handleRunQuery = useCallback(() => {
    if (!sqlInput.trim()) return;
    // executeAndUpdateHistory(sqlInput);
  },[]);
  

  return (
    // <div>QueryPage</div>
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          SQL Query Visualizer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Write and execute SQL queries with instant visualization
        </Typography>
        
      </Box>
      {/* <Box sx={{ flex: 1, position: 'absolute' }}>
          <SQLEditor
            value={sqlInput}
            onChange={setSqlInput}
          />
      </Box> */}
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
    </>
  )
}

