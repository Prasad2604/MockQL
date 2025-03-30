import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { QueryHistory as QueryHistoryType } from '../types';

interface QueryHistoryProps {
  history: QueryHistoryType[];
  onSelectQuery: (query: string) => void;
  onDeleteQuery: (id: string) => void;
}

interface GroupedQueries {
  [key: string]: QueryHistoryType[];
}

export const QueryHistory = ({ history, onSelectQuery, onDeleteQuery }: QueryHistoryProps) => {
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedQueryId, setSelectedQueryId] = useState<string | null>(null);

  const groupedQueries = useMemo(() => {
    return history.reduce((groups: GroupedQueries, query) => {
      const date = new Date(query.timestamp);
      const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(query);
      return groups;
    }, {});
  }, [history]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, queryId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedQueryId(queryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedQueryId(null);
  };

  const handleRerunQuery = () => {
    const query = history.find(h => h.id === selectedQueryId);
    if (query) {
      onSelectQuery(query.query);
    }
    handleMenuClose();
  };

  const handleDeleteQuery = () => {
    if (selectedQueryId) {
      onDeleteQuery(selectedQueryId);
    }
    handleMenuClose();
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          px: { xs: 2, md: 3 },
          py: { xs: 1.5, md: 2 },
          fontWeight: 600,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: { xs: '1rem', md: '1.25rem' }
        }}
      >
        Query History
      </Typography>

      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255, 255, 255, 0.3)',
        }
      }}>
        {Object.entries(groupedQueries).map(([date, queries]) => (
          <Box key={date}>
            <Typography
              sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 },
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.7)',
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {date}
            </Typography>
            {queries.map((item) => (
              <Box
                key={item.id}
                sx={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                <Box
                  sx={{
                    px: { xs: 2, md: 3 },
                    py: { xs: 1, md: 1.5 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box 
                    sx={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: 0
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        fontFamily: 'monospace',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: 1
                      }}
                    >
                      {item.query}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(e, item.id);
                      }}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        p: 0.5
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setExpandedQuery(expandedQuery === item.id ? null : item.id)}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        p: 0.5
                      }}
                    >
                      {expandedQuery === item.id ? (
                        <KeyboardArrowUpIcon fontSize="small" />
                      ) : (
                        <KeyboardArrowDownIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </Box>

                <Collapse in={expandedQuery === item.id}>
                  <Box
                    sx={{
                      px: { xs: 2, md: 3 },
                      py: { xs: 1.5, md: 2 },
                      bgcolor: 'rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all'
                      }}
                    >
                      {item.query}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: { xs: 1, md: 3 },
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: { xs: '0.7rem', md: '0.75rem' }
                    }}>
                      <span>Time: {formatTime(item.timestamp)}</span>
                      <span>Rows: {item.result.rows.length}</span>
                      <span>Duration: {item.result.executionTime.toFixed(2)}ms</span>
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: '#1e293b',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            '& .MuiMenuItem-root': {
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              py: { xs: 0.75, md: 1 },
              px: { xs: 1.5, md: 2 },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)'
              }
            }
          }
        }}
      >
        <MenuItem onClick={handleRerunQuery}>
          <PlayArrowIcon fontSize="small" sx={{ mr: 1 }} />
          Run Query
        </MenuItem>
        <MenuItem onClick={handleDeleteQuery}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete from History
        </MenuItem>
      </Menu>
    </Box>
  );
}; 