
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Star, 
  Truck,
  CreditCard,
  History,
  Filter
} from 'lucide-react';

export default function PharmacyShop() {
  const [cart, setCart] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      price: 12.99,
      category: 'Pain Relief',
      rating: 4.5,
      inStock: true,
      image: '/placeholder.svg',
      description: 'Effective pain relief and fever reducer'
    },
    {
      id: 2,
      name: 'Vitamin D3 Supplements',
      price: 24.99,
      category: 'Vitamins',
      rating: 4.8,
      inStock: true,
      image: '/placeholder.svg',
      description: 'Essential vitamin D3 for bone health'
    },
    {
      id: 3,
      name: 'Omega-3 Fish Oil',
      price: 34.99,
      category: 'Supplements',
      rating: 4.6,
      inStock: true,
      image: '/placeholder.svg',
      description: 'Premium fish oil for heart health'
    },
    {
      id: 4,
      name: 'Digital Thermometer',
      price: 19.99,
      category: 'Medical Devices',
      rating: 4.7,
      inStock: true,
      image: '/placeholder.svg',
      description: 'Fast and accurate temperature readings'
    },
    {
      id: 5,
      name: 'First Aid Kit',
      price: 45.99,
      category: 'Medical Supplies',
      rating: 4.9,
      inStock: false,
      image: '/placeholder.svg',
      description: 'Complete first aid kit for emergencies'
    },
    {
      id: 6,
      name: 'Blood Pressure Monitor',
      price: 89.99,
      category: 'Medical Devices',
      rating: 4.4,
      inStock: true,
      image: '/placeholder.svg',
      description: 'Home blood pressure monitoring device'
    }
  ];

  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: ['Paracetamol 500mg', 'Vitamin D3'],
      total: 37.98,
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: ['Omega-3 Fish Oil'],
      total: 34.99,
      status: 'Delivered'
    }
  ];

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="shop" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="cart" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Cart ({cart.length})
          </TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="shop" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search medicines, vitamins, medical devices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <span className="text-lg font-bold">${product.price}</span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Shopping Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">${item.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-medium w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Cart Summary */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay with M-Pesa
                      </Button>
                      <Button variant="outline">
                        <Truck className="w-4 h-4 mr-2" />
                        WhatsApp Order
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-purple-600" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      Items: {order.items.join(', ')}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total: ${order.total}</span>
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
