interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  address: string;
}

interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  user: User;
  total: number;
  status: string;
  created_at: string;
}

export default Order;
