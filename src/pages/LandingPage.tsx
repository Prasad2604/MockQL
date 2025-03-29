import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { Terminal as TerminalIcon, PlayArrow as PlayArrowIcon, History as HistoryIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
  >
    <Box sx={{ mb: 2, color: 'primary.main' }}>{icon}</Box>
    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(45deg, #f8fafc 30%, #ffffff 90%)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #1e293b 30%, #3b82f6 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              SQL Query Visualizer
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
            >
              A modern, intuitive interface for running and visualizing SQL queries with instant results
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={() => navigate('/queryPage')}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Try it Now
            </Button>
          </Box>

          {/* Features Section */}
          <Box sx={{ mt: 8 }}>
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                gap: 4 
              }}
            >
              <FeatureCard
                icon={<TerminalIcon fontSize="large" />}
                title="SQL Editor"
                description="Write and edit SQL queries with syntax highlighting and auto-completion support"
              />
              <FeatureCard
                icon={<PlayArrowIcon fontSize="large" />}
                title="Instant Results"
                description="See your query results instantly with a clean, modern table visualization"
              />
              <FeatureCard
                icon={<HistoryIcon fontSize="large" />}
                title="Query History"
                description="Keep track of your previous queries and results for quick reference"
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Built with ❤️ using React and Material-UI
        </Typography>
      </Box>
    </Box>
  );
}; 