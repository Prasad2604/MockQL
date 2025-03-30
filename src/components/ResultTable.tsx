import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { QueryResult } from '../types';
import { useState, useCallback } from 'react';

export const ResultsTable = ({ result }: { result: QueryResult }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const totalPages = Math.ceil(result.rows.length / pageSize);

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }, []);

  const handlePageSizeChange = useCallback((event: any) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageRows = result.rows.slice(startIndex, startIndex + pageSize);

  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        p: { xs: 1.5, md: 2 },
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        bgcolor: '#f8fafc'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 1, md: 2 },
          alignItems: { xs: 'flex-start', md: 'center' }
        }}>
          <Typography variant="body2" color="text.secondary">
            {result.rows.length} rows
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result.executionTime.toFixed(2)}ms
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2 
        }}>
          <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 120 } }}>
            <InputLabel>Rows per page</InputLabel>
            <Select
              value={pageSize}
              label="Rows per page"
              aria-label="rows per page"
              id="row-per-page"
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

      <TableContainer 
        sx={{ 
          flex: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            height: '8px',
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f5f9'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cbd5e1',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#94a3b8'
            }
          }
        }}
      >
        <Table 
          stickyHeader 
          size="small" 
          sx={{ 
            minWidth: { xs: 800, md: result.columns.length * 150 },
            '& .MuiTableCell-root': {
              px: { xs: 1, md: 2 },
              py: { xs: 1, md: 1.5 },
              fontSize: { xs: '0.75rem', md: '0.875rem' }
            }
          }}
        >
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
                    minWidth: { xs: 120, md: 150 },
                    whiteSpace: 'nowrap'
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
                {row.map((cell: string | number, cellIndex: number) => (
                  <TableCell
                    key={`${rowIndex}-${cellIndex}`}
                    sx={{
                      color: '#1e293b',
                      minWidth: { xs: 120, md: 150 },
                      whiteSpace: 'nowrap',
                      fontFamily: 'monospace'
                    }}
                  >
                    {cell?.toString() || ''}
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