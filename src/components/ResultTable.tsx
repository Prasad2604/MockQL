import { useMemo, useState, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Chip,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { QueryResult } from '../types';


export const ResultsTable = ({ result }: { result: QueryResult }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const totalPages = Math.ceil(result.rows.length / pageSize);

const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
}, []);

  const handlePageSizeChange = useCallback((event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  const currentPageRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return result.rows.slice(startIndex, startIndex + pageSize);
  }, [result.rows, currentPage, pageSize]);

  if (!result || !result.columns || !result.rows) {
    return null;
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: '#ffffff',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
            Query Results
          </Typography>
          <Chip 
            label={`${result.rows.length} rows`}
            size="small"
            sx={{ 
              bgcolor: '#e2e8f0',
              color: '#475569',
              fontWeight: 500
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {result.executionTime.toFixed(2)}ms
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Rows per page</InputLabel>
            <Select
              value={pageSize}
              label="Rows per page"
              onChange={handlePageSizeChange}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#64748b',
                '&.Mui-selected': {
                  bgcolor: '#e2e8f0',
                  color: '#1e293b',
                  '&:hover': {
                    bgcolor: '#cbd5e1'
                  }
                }
              }
            }}
          />
        </Box>
      </Box>

      <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {result.columns.map((column) => (
                <TableCell
                  key={column}
                  sx={{
                    bgcolor: '#f8fafc',
                    fontWeight: 600,
                    color: '#475569',
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                    py: 1.5
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                sx={{
                  '&:hover': {
                    bgcolor: '#f1f5f9'
                  }
                }}
              >
                {result.columns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      color: '#1e293b',
                      py: 1.5
                    }}
                  >
                    {row[column]?.toString() || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}; 