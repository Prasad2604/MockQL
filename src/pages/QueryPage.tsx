import { useState } from "react";
import { Box, Typography } from "@mui/material";
import {SQLEditor} from "../components/SQLEditor";
export default function QueryPage() {
  
  const [sqlInput,setSqlInput] = useState<string>("");
  
  
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
      <Box sx={{ flex: 1, position: 'absolute' }}>
          <SQLEditor
            value={sqlInput}
            onChange={setSqlInput}
          />
      </Box>
    </>
  )
}
