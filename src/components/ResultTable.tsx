import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FixedSizeList as List } from 'react-window';
import { QueryResult } from '../types';
import { useCallback, useRef, useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc' | null;
};

export const ResultsTable = ({ result }: { result: QueryResult }) => {
  const [tableHeight, setTableHeight] = useState(400);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });
  const [sortedRows, setSortedRows] = useState(result.rows);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ROW_HEIGHT = 36;
  const OVERSCAN_COUNT = 5;

  useEffect(() => {
    setSortedRows(result.rows);
  }, [result.rows]);

  useEffect(() => {
    const updateTableHeight = () => {
      if (containerRef.current && headerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const headerHeight = headerRef.current.clientHeight;
        setTableHeight(containerHeight - headerHeight);
      }
    };

    updateTableHeight();
    
    const resizeObserver = new ResizeObserver(updateTableHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateTableHeight);
    };
  }, []);

  const handleSort = (columnIndex: number) => {
    const columnKey = result.columns[columnIndex];
    let direction: 'asc' | 'desc' | null = 'asc';

    if (sortConfig.key === columnKey) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }

    setSortConfig({ key: columnKey, direction });

    if (direction === null) {
      setSortedRows([...result.rows]);
      return;
    }

    const sorted = [...sortedRows].sort((a, b) => {
      const aValue = a[columnIndex];
      const bValue = b[columnIndex];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      
      if (direction === 'asc') {
        return aString.localeCompare(bString);
      }
      return bString.localeCompare(aString);
    });

    setSortedRows(sorted);
  };

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const row = sortedRows[index];
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
        }}
      >
        {row.map((cell: string | number, cellIndex: number) => (
          <div
            key={`${index}-${cellIndex}`}
            style={{
              flex: 1,
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: '#1e293b',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              height: ROW_HEIGHT,
            }}
          >
            {cell?.toString() || ''}
          </div>
        ))}
      </div>
    );
  }, [sortedRows]);

  const getSortIcon = (column: string) => {
    const isActive = sortConfig.key === column;
    const iconStyle = {
      fontSize: 16,
      color: isActive ? '#475569' : '#94a3b8',
      transition: 'color 0.2s ease'
    };

    if (!isActive || !sortConfig.direction) {
      return <UnfoldMoreIcon sx={iconStyle} />;
    }

    return sortConfig.direction === 'asc' ? (
      <ArrowUpwardIcon sx={iconStyle} />
    ) : (
      <ArrowDownwardIcon sx={iconStyle} />
    );
  };

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
      <Box 
        ref={headerRef}
        sx={{ 
          p: { xs: 1.5, md: 2 },
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          bgcolor: '#f8fafc'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {result.rows.length} rows
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {result.executionTime.toFixed(2)}ms
        </Typography>
      </Box>

      <Box 
        ref={containerRef}
        sx={{ 
          flex: 1,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': {
            height: '8px',
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
        }}>
          <div style={{ minWidth: result.columns.length * 150 }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#f8fafc',
                borderBottom: '2px solid #e2e8f0',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              {result.columns.map((column, index) => (
                <Box
                  key={column}
                  onClick={() => handleSort(index)}
                  sx={{
                    flex: 1,
                    minWidth: 150,
                    padding: '0 16px',
                    fontWeight: 600,
                    color: '#475569',
                    height: ROW_HEIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    gap: '4px',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      bgcolor: '#f1f5f9',
                      '& .sort-icon': {
                        color: '#475569 !important'
                      }
                    }
                  }}
                >
                  <Box sx={{ 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{ flex: 1 }}>{column}</span>
                    <Box className="sort-icon">
                      {getSortIcon(column)}
                    </Box>
                  </Box>
                </Box>
              ))}
            </div>

            {/* Rows */}
            <List
              height={tableHeight}
              itemCount={sortedRows.length}
              itemSize={ROW_HEIGHT}
              width="100%"
              overscanCount={OVERSCAN_COUNT}
            >
              {Row}
            </List>
          </div>
        </Box>
      </Box>
    </Paper>
  );
};