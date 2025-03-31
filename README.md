# MockQL

![MockQL Banner](./screenshots/banner.png)

MockQL is a modern SQL query interface designed for efficient data visualization and query management. With a focus on performance and usability, it features a virtualized table system capable of handling large datasets smoothly while maintaining responsive performance.

## Core Features

### Query Results Visualization

- **High-Performance Data Table**: Efficiently handles large datasets using virtualization
- **Real-time Performance Metrics**: Shows row count and execution time for each query
- **Smart Column Management**: Automatic column width handling with horizontal scrolling
- **Alternating Row Colors**: Enhanced readability with zebra-striped rows
- **Interactive Sorting**: Sort any column in ascending or descending order with visual indicators

### Performance Features

- **Virtualized Scrolling**: Only renders visible rows for optimal performance
- **Dynamic Height Adjustment**: Automatically adjusts to container size
- **Smooth Scrolling**: Implements row overscan for seamless scrolling experience
- **Memory Efficient**: Minimizes DOM elements and memory usage
- **Optimized Sorting**: Efficient sorting algorithm with type-aware comparisons

### User Experience

- **Responsive Design**: Adapts seamlessly to different screen sizes
- **Dark Mode Support**: Comfortable viewing in different lighting conditions
- **Sticky Headers**: Column headers remain visible while scrolling
- **Smooth Scrollbar**: Custom-styled scrollbar with hover effects
- **Sort Indicators**: Clear visual feedback for sort direction with arrow icons

## Tech Stack

### Framework and Language

- **React** with TypeScript - For robust type safety and component architecture
- **Vite** - For fast development and optimized builds

### Major Plugins and Packages

#### UI & Styling

- **@mui/material**: ^5.x.x - Material UI components and theming
- **@mui/icons-material**: ^5.x.x - Material design icons

#### Tables & Large Data Handling

- **react-window**: ^1.8.x - Virtualized rendering for large datasets

## Performance Optimizations

### Virtualization Implementation

```typescript
<List
  height={tableHeight}
  itemCount={result.rows.length}
  itemSize={ROW_HEIGHT}
  width="100%"
  overscanCount={OVERSCAN_COUNT}
>
  {Row}
</List>
```

### Dynamic Sizing

```typescript
const resizeObserver = new ResizeObserver(updateTableHeight);
if (containerRef.current) {
  resizeObserver.observe(containerRef.current);
}
```

### Sorting Implementation

```typescript
const handleSort = (columnIndex: number) => {
  // ... sort configuration logic ...

  const sorted = [...rows].sort((a, b) => {
    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }
    return direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};
```

### Key Optimizations

1. **Virtualized Rendering**

   - Only renders visible rows (typically 10-15 at a time)
   - Uses 5 items overscan for smooth scrolling
   - Reduces memory usage and DOM elements

2. **Smart Layout Management**

   - ResizeObserver for dynamic height calculations
   - Efficient single horizontal scrollbar
   - Sticky headers with proper z-indexing

3. **Component Optimization**
   - Memoized row components using useCallback
   - Efficient text overflow handling
   - Optimized column width calculations
   - Type-aware sorting for better performance

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/MockQL.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Performance Metrics

The table component is optimized to handle large datasets efficiently:

- Renders only visible rows (typically 10-15 at a time)
- Maintains smooth 60fps scrolling performance
- Minimal memory footprint due to row virtualization
- Instant updates for sorting and filtering operations
- Fast sorting performance with optimized comparisons

## Future Improvements

1. **Data Management**

   - Add filtering capabilities
   - Enable CSV export
   - Add multi-column sorting

2. **Performance**
   - Add column virtualization for wide datasets
   - Implement progressive loading for very large datasets
   - Cache sort results for frequently sorted columns

## Contact

For any inquiries or support, please open an issue in this repository.

## License

MIT License - feel free to use this project for any purpose.

---

Made with ❤️ by [Your Name]
