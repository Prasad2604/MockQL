import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FixedSizeList as List } from 'react-window';
import { QueryResult } from '../types';
import { useCallback, useRef, useState, useEffect } from 'react';

export const ResultsTable = ({ result }: { result: QueryResult }) => {
  const [tableHeight, setTableHeight] = useState(400);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ROW_HEIGHT = 36;
  const OVERSCAN_COUNT = 5;

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

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const row = result.rows[index];
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
              // minWidth: 150,
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
  }, [result.rows]);

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
              {result.columns.map((column) => (
                <div
                  key={column}
                  style={{
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
                  }}
                >
                  {column}
                </div>
              ))}
            </div>

            {/* Rows */}
            <List
              height={tableHeight}
              itemCount={result.rows.length}
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