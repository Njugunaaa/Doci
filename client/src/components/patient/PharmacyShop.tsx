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
  Filter,
  Phone,
  MessageCircle
} from 'lucide-react';

export default function PharmacyShop() {
  const [cart, setCart] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Realistic pharmacy products with medical imagery (using SVG placeholders for medication visuals)
  const products = [
    {
      id: 1,
      name: 'Panadol Extra (Paracetamol 500mg)',
      price: 150,
      category: 'Pain Relief',
      rating: 4.5,
      inStock: true,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Fast relief for headaches, fever and body pain',
      brand: 'GSK Kenya'
    },
    {
      id: 2,
      name: 'Vitamin D3 Supplements',
      price: 1200,
      category: 'Vitamins',
      rating: 4.8,
      inStock: true,
      image: 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Essential vitamin D3 for bone health - 60 tablets',
      brand: 'Healthy U Kenya'
    },
    {
      id: 3,
      name: 'Omega-3 Fish Oil Capsules',
      price: 2500,
      category: 'Supplements',
      rating: 4.6,
      inStock: true,
      image: 'https://images.pexels.com/photos/3683089/pexels-photo-3683089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Premium fish oil for heart health - 90 capsules',
      brand: 'Nature\'s Way Kenya'
    },
    {
      id: 4,
      name: 'Digital Thermometer',
      price: 800,
      category: 'Medical Devices',
      rating: 4.7,
      inStock: true,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Fast and accurate temperature readings',
      brand: 'Omron Kenya'
    },
    {
      id: 5,
      name: 'First Aid Kit - Family Size',
      price: 3500,
      category: 'Medical Supplies',
      rating: 4.9,
      inStock: false,
      image: 'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Complete first aid kit for home emergencies',
      brand: 'SafeCare Kenya'
    },
    {
      id: 6,
      name: 'Blood Pressure Monitor',
      price: 6500,
      category: 'Medical Devices',
      rating: 4.4,
      inStock: true,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Home blood pressure monitoring device',
      brand: 'Omron Kenya'
    },
    {
      id: 7,
      name: 'Amoxicillin 500mg',
      price: 300,
      category: 'Antibiotics',
      rating: 4.3,
      inStock: true,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Antibiotic for bacterial infections - 21 capsules',
      brand: 'Cosmos Kenya',
      prescription: true
    },
    {
      id: 8,
      name: 'Malaria Test Kit',
      price: 250,
      category: 'Diagnostic',
      rating: 4.6,
      inStock: true,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Rapid malaria diagnostic test',
      brand: 'Access Bio Kenya'
    },
    {
      id: 9,
      name: 'ORS (Oral Rehydration Salts)',
      price: 50,
      category: 'Emergency Care',
      rating: 4.8,
      inStock: true,
      image: 'https://images.pexels.com/photos/3683089/pexels-photo-3683089.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'WHO/UNICEF approved ORS for dehydration',
      brand: 'Shelys Kenya'
    },
    {
      id: 10,
      name: 'Mosquito Net (LLIN)',
      price: 800,
      category: 'Prevention',
      rating: 4.7,
      inStock: true,
      image: 'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Long-lasting insecticidal net for malaria prevention',
      brand: 'Vestergaard Kenya'
    },
    {
      id: 11,
      name: 'Water Purification Tablets',
      price: 180,
      category: 'Prevention',
      rating: 4.5,
      inStock: true,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Aquatabs for safe drinking water - 50 tablets',
      brand: 'Medentech Kenya'
    },
    {
      id: 12,
      name: 'Zinc Supplements',
      price: 450,
      category: 'Supplements',
      rating: 4.4,
      inStock: true,
      image: 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Zinc tablets for immune support - 30 tablets',
      brand: 'Healthy Living Kenya'
    }
  ];

  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: ['Panadol Extra', 'Vitamin D3'],
      total: 1350,
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: ['Omega-3 Fish Oil'],
      total: 2500,
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
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Doci's Pharmacy</h2>
          <p className="text-gray-600">Quality medicines delivered to your doorstep across Kenya</p>
        </div>
        <Badge className="bg-green-100 text-green-700">
          <Truck className="w-3 h-3 mr-1" />
          Free delivery in Nairobi
        </Badge>
      </div>

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
              
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['All', 'Pain Relief', 'Vitamins', 'Antibiotics', 'Medical Devices', 'Prevention'].map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-blue-50">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      {product.prescription && (
                        <Badge variant="destructive" className="text-xs">
                          Prescription Required
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-xs text-blue-600 font-medium">{product.brand}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <span className="text-lg font-bold">KSh {product.price.toLocaleString()}</span>
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
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">KSh {item.price.toLocaleString()}</p>
                          <p className="text-xs text-blue-600">{item.brand}</p>
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
                        <span className="font-medium w-24 text-right">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Cart Summary */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total: KSh {getTotalPrice().toLocaleString()}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay with M-Pesa
                      </Button>
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Order
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call to Order
                      </Button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        📞 Need help? Call our pharmacy hotline: +254 700 123 456
                      </p>
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
                      <span className="font-medium">Total: KSh {order.total.toLocaleString()}</span>
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

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-red-800">Emergency Medicine Delivery</h3>
              <p className="text-sm text-red-600">Need urgent medication? We deliver within 30 minutes in Nairobi</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Phone className="w-4 h-4 mr-2" />
              Call Emergency
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}