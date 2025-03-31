import { Query } from '../types';
export const predefinedQueries: Query[] = [
    {
        id: 'products',
        name: 'List All Products',
        sql: 'SELECT * FROM products;',
        description: 'Display all products from the database',
        table: 'products.csv'
      },
      {
        id: 'orders',
        name: 'List All Orders',
        sql: 'SELECT * FROM orders;',
        description: 'Show all orders',
        table: 'orders.csv'
      },
      {
        id: 'order_details',
        name: 'Order Details',
        sql: 'SELECT * FROM order_details;',
        description: 'Display detailed order information',
        table: 'order_details.csv'
      },
      {
        id: 'suppliers',
        name: 'List Suppliers',
        sql: 'SELECT * FROM suppliers;',
        description: 'Show all suppliers',
        table: 'suppliers.csv'
      },
      {
        id: 'shippers',
        name: 'List Shippers',
        sql: 'SELECT * FROM shippers;',
        description: 'Display all shipping companies',
        table: 'shippers.csv'
      }
  ];