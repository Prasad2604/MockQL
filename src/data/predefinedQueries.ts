import { Query } from '../types';
export const predefinedQueries: Query[] = [
    {
      id: 'products',
      name: 'List All Products',
      sql: 'SELECT * FROM products',
      description: 'Display all products from the database'
    },
    {
      id: 'orders',
      name: 'List All Orders',
      sql: 'SELECT * FROM orders',
      description: 'Show all orders'
    },
    {
      id: 'order_details',
      name: 'Order Details',
      sql: 'SELECT * FROM order_details',
      description: 'Display detailed order information'
    },
    {
      id: 'suppliers',
      name: 'List Suppliers',
      sql: 'SELECT * FROM suppliers',
      description: 'Show all suppliers'
    },
    {
      id: 'shippers',
      name: 'List Shippers',
      sql: 'SELECT * FROM shippers',
      description: 'Display all shipping companies'
    },
    {
      id: 'products_suppliers',
      name: 'Products with Suppliers',
      sql: 'SELECT p.*, s.company_name as supplier_name FROM products p JOIN suppliers s ON p.supplier_id = s.supplier_id',
      description: 'Show products with their supplier information'
    },
    {
      id: 'orders_shippers',
      name: 'Orders with Shipping Info',
      sql: 'SELECT o.*, s.company_name as shipper_name FROM orders o JOIN shippers s ON o.ship_via = s.shipper_id',
      description: 'Display orders with shipping company details'
    }
  ];