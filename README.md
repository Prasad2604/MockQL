# MockQL

![MockQL Banner](./screenshots/banner.png)

MockQL is a high-performance SQL data visualization application designed with a focus on efficiency, usability, and smooth handling of large datasets. The application features a virtualized table system that can handle extensive data sets while maintaining responsive performance and providing intuitive data manipulation capabilities.

## Overview

MockQL stands out for its ability to efficiently display and manage large SQL query results through:

- **Virtualized Data Rendering**: Handles large datasets smoothly by only rendering visible rows
- **Interactive Data Sorting**: Sort any column with intuitive controls and visual indicators
- **Responsive Design**: Adapts seamlessly to different screen sizes and orientations
- **Performance Metrics**: Real-time display of row counts and execution times
- **Dark Mode Support**: Enhanced visibility and reduced eye strain in different lighting conditions

### Core Features

#### Advanced Data Table

- Virtualized scrolling for efficient handling of large datasets
- Interactive column headers with sort indicators
- Smooth horizontal scrolling for wide datasets
- Alternating row colors for better readability
- Fixed headers while scrolling

#### Performance Features

- Dynamic row virtualization (only renders visible rows)
- Optimized sorting algorithms for both numeric and string data
- Efficient memory usage through row recycling
- Smart resize handling with ResizeObserver
- Minimal DOM updates for smooth scrolling

#### User Experience

- Intuitive sorting controls with visual feedback
- Responsive layout that adapts to screen size
- Custom-styled scrollbars for better control
- Clear performance metrics display
- Smooth transitions and hover effects

## Technical Implementation

### Performance Optimizations

- Uses `react-window` for efficient row virtualization
- Implements memoized components to prevent unnecessary re-renders
- Employs dynamic height calculations for optimal viewport usage
- Features type-aware sorting for better performance
- Utilizes efficient DOM recycling for large datasets

### Key Metrics

- Renders only 10-15 rows at a time regardless of dataset size
- Maintains smooth 60fps scrolling performance
- Instant sorting operations with visual feedback
- Responsive across different screen sizes
- Minimal memory footprint through virtualization

### Smart Features

- Intelligent column width management
- Automatic height adjustments
- Smooth scrolling with row overscan
- Type-aware sorting (handles both numbers and strings)
- Case-insensitive string comparisons

## Technical Stack

### Core Technologies

- **React** with TypeScript for robust type safety
- **Material-UI** for consistent design components
- **react-window** for virtualized rendering
- **Custom Hooks** for efficient state management

### Key Dependencies

```json
{
  "@mui/material": "^5.x.x",
  "@mui/icons-material": "^5.x.x",
  "react-window": "^1.8.x"
}
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/MockQL.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Future Roadmap

### Planned Features

1. **Data Management**

   - CSV export functionality
   - Column filtering capabilities
   - Multi-column sorting
   - Search within results

2. **Performance Enhancements**

   - Column virtualization for wide datasets
   - Progressive loading for very large datasets
   - Sort result caching
   - Advanced data type detection

3. **User Experience**
   - Customizable column widths
   - Pinned columns
   - Row selection
   - Aggregate functions

## License

MIT License - feel free to use this project for any purpose.

---

Made with ❤️ by [Your Name]
