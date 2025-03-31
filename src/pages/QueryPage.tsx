// QueryPage.tsx
import React, { useState, useCallback, lazy, Suspense } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { Query, QueryResult, QueryHistory as QueryHistoryType } from "../types";
import { predefinedQueries } from "../data/predefinedQueries";
import { executeQuery } from "../utils/csvParserOptimized"; // optimized CSV parser
import { v4 as uuidv4 } from "uuid";

// Lazy-load heavy components
const SQLEditor = lazy(() => import("../components/SQLEditor").then(module => ({ default: module.SQLEditor })));
const ResultsTable = lazy(() => import("../components/ResultTable").then(module => ({default: module.ResultsTable})));
const QueryHistory = lazy(() => import("../components/QueryHistory").then(module => ({default: module.QueryHistory})));

export default function QueryPage() {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [sqlInput, setSqlInput] = useState("");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [history, setHistory] = useState<QueryHistoryType[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const executeAndUpdateHistory = async (sql: string,tableName?: string) => {
    setIsLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const data = await executeQuery(sql,tableName);
      const executionTime = performance.now() - startTime;

      const result: QueryResult = {
        columns: data.columns,
        rows: data.rows,
        executionTime,
      };

      setQueryResult(result);

      const historyItem: QueryHistoryType = {
        id: uuidv4(),
        query: sql,
        timestamp: new Date(),
        result,
      };

      // Keep only the 10 most recent queries
      setHistory((prev) => [historyItem, ...prev].slice(0, 10));

      setToastOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute query");
      setQueryResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuerySelect = useCallback((queryId: string) => {
    const query = predefinedQueries.find((q) => q.id === queryId);
    console.log("inside query page: ",query?.id);
    if (query) {
      console.log("hi");
      setSelectedQuery(query);
      setSqlInput(query.sql);
      executeAndUpdateHistory(query.sql,query.table);
      console.log(query.sql,query.table);
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
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleToastClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setToastOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100vh",
        bgcolor: "#f1f5f9",
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* History Panel - Mobile Overlay */}
      <Box
        sx={{
          width: { xs: "100%", md: isHistoryOpen ? 300 : 40 },
          height: { xs: "100%", md: "100vh" },
          borderRight: { xs: "none", md: "1px solid" },
          borderColor: "divider",
          bgcolor: "#1e293b",
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: { xs: "absolute", md: "relative" },
          zIndex: { xs: isHistoryOpen ? 1200 : -1, md: 1 },
          transform: { xs: isHistoryOpen ? "translateX(0)" : "translateX(-100%)", md: "none" },
        }}
      >
        <IconButton
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          aria-label={isHistoryOpen ? "Close history panel" : "Open history panel"}
          title={isHistoryOpen ? "Close history panel" : "Open history panel"}
          sx={{
            position: "absolute",
            right: { xs: 8, md: isHistoryOpen ? 8 : "50%" },
            top: 8,
            transform: { xs: "none", md: isHistoryOpen ? "none" : "translateX(50%)" },
            color: "white",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
            transition: "all 0.3s ease",
            zIndex: 2,
          }}
        >
          {isHistoryOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {isHistoryOpen && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              pt: 6,
              overflowY: "auto",
            }}
          >
            <Suspense fallback={<div>Loading History...</div>}>
              <QueryHistory
                history={history}
                onSelectQuery={handleHistorySelect}
                onDeleteQuery={handleHistoryDelete}
              />
            </Suspense>
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          overflow: "hidden",
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ 
          mb: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          {/* Mobile Menu Button */}
          <IconButton
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            aria-label={isHistoryOpen ? "Close history panel" : "Open history panel"}
            title={isHistoryOpen ? "Close history panel" : "Open history panel"}
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: '#1e293b',
              '&:hover': {
                bgcolor: 'rgba(30, 41, 59, 0.04)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              color: "#1e293b", 
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}>
              MockQL
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
              Write and execute SQL queries with instant visualization
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            height: "calc(100vh - 140px)",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 3 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "#ffffff",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              flex: "0 0 35%",
            }}
          >
            <Box
              sx={{
                p: { xs: 1.5, md: 2 },
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "#f8fafc",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                alignItems: { xs: "stretch", md: "center" },
                justifyContent: "space-between",
              }}
            >
              <FormControl size="small" sx={{ minWidth: { xs: "100%", md: "70%" } }}>
                <InputLabel id="predefined-queries-label">Predefined Queries</InputLabel>
                <Select
                  labelId="predefined-queries-label"
                  id="predefined-queries"
                  value={selectedQuery?.id || ""}
                  label="Predefined Queries"
                  onChange={(e) => handleQuerySelect(e.target.value)}
                  aria-label="Select a predefined SQL query"
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
                aria-label="Execute SQL query"
                title="Execute SQL query"
                sx={{
                  textTransform: "none",
                  boxShadow: "none",
                  width: { xs: "100%", md: "auto" },
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                {isLoading ? "Running..." : "Run Query"}
              </Button>
            </Box>
            <Box sx={{ flex: 1, position: "relative" }}>
              <Suspense fallback={<div>Loading Editor...</div>}>
                <SQLEditor value={sqlInput} onChange={setSqlInput} />
              </Suspense>
            </Box>
          </Paper>

          <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
            {error ? (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 3,
                  border: "1px solid #fecdd3",
                  bgcolor: "#fff1f2",
                  color: "#be123c",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {error}
                </Typography>
              </Paper>
            ) : queryResult ? (
              <Suspense fallback={<div>Loading Results...</div>}>
                <ResultsTable result={queryResult} />
              </Suspense>
            ) : null}
          </Box>
        </Box>
      </Box>

      {/* Snackbar Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        role="status"
      >
        <Alert onClose={handleToastClose} severity="success" sx={{ width: "100%" }}>
          Query executed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
