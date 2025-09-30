import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  image: string;
  description: string;
  sku: string;
  createdAt: string;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Смартфон Samsung Galaxy S23',
    price: 79990,
    oldPrice: 89990,
    category: 'Электроника',
    stock: 15,
    status: 'active',
    image: 'https://via.placeholder.com/100',
    description: 'Флагманский смартфон с отличной камерой',
    sku: 'SM-S911B',
    createdAt: '2025-01-15'
  },
  {
    id: '2',
    name: 'Ноутбук Apple MacBook Air M2',
    price: 129990,
    category: 'Электроника',
    stock: 8,
    status: 'active',
    image: 'https://via.placeholder.com/100',
    description: 'Легкий и мощный ноутбук для работы',
    sku: 'MBA-M2-256',
    createdAt: '2025-01-14'
  },
  {
    id: '3',
    name: 'Наушники Sony WH-1000XM5',
    price: 34990,
    oldPrice: 39990,
    category: 'Аксессуары',
    stock: 25,
    status: 'active',
    image: 'https://via.placeholder.com/100',
    description: 'Беспроводные наушники с шумоподавлением',
    sku: 'WH-1000XM5',
    createdAt: '2025-01-13'
  },
  {
    id: '4',
    name: 'Умные часы Apple Watch Series 9',
    price: 49990,
    category: 'Аксессуары',
    stock: 0,
    status: 'draft',
    image: 'https://via.placeholder.com/100',
    description: 'Смарт-часы с функциями здоровья',
    sku: 'AW-S9-GPS',
    createdAt: '2025-01-12'
  },
  {
    id: '5',
    name: 'Планшет iPad Pro 12.9"',
    price: 119990,
    category: 'Электроника',
    stock: 5,
    status: 'active',
    image: 'https://via.placeholder.com/100',
    description: 'Профессиональный планшет для творчества',
    sku: 'IPAD-PRO-129',
    createdAt: '2025-01-11'
  }
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    oldPrice: undefined,
    category: '',
    stock: 0,
    status: 'active',
    image: 'https://via.placeholder.com/400',
    description: '',
    sku: ''
  });

  const categories = ['Все', 'Электроника', 'Аксессуары', 'Одежда', 'Дом и сад'];
  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'active', label: 'Активные' },
    { value: 'draft', label: 'Черновики' },
    { value: 'archived', label: 'Архивные' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name || '',
      price: formData.price || 0,
      oldPrice: formData.oldPrice,
      category: formData.category || 'Электроника',
      stock: formData.stock || 0,
      status: formData.status || 'active',
      image: formData.image || 'https://via.placeholder.com/400',
      description: formData.description || '',
      sku: formData.sku || '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([newProduct, ...products]);
    resetForm();
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...editingProduct, ...formData }
        : p
    ));
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Удалить товар?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      oldPrice: undefined,
      category: '',
      stock: 0,
      status: 'active',
      image: 'https://via.placeholder.com/400',
      description: '',
      sku: ''
    });
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Активен</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Черновик</Badge>;
      case 'archived':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Архив</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/dashboard'}>
                <Icon name="ArrowLeft" size={18} />
              </Button>
              <div>
                <div className="text-sm text-gray-500 mb-1">Мой магазин</div>
                <h1 className="text-2xl font-bold text-gray-900">Управление товарами</h1>
              </div>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Фильтры и поиск</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label>Поиск по названию или артикулу</Label>
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Найти товар..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Категория</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Статус</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Товары ({filteredProducts.length})</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Импорт
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold">Товар</th>
                    <th className="text-left p-3 text-sm font-semibold">Артикул</th>
                    <th className="text-left p-3 text-sm font-semibold">Категория</th>
                    <th className="text-right p-3 text-sm font-semibold">Цена</th>
                    <th className="text-center p-3 text-sm font-semibold">Остаток</th>
                    <th className="text-center p-3 text-sm font-semibold">Статус</th>
                    <th className="text-center p-3 text-sm font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-600">{product.sku}</td>
                      <td className="p-3 text-sm">{product.category}</td>
                      <td className="p-3 text-right">
                        <div className="font-semibold">{product.price.toLocaleString()} ₽</div>
                        {product.oldPrice && (
                          <div className="text-xs text-gray-400 line-through">
                            {product.oldPrice.toLocaleString()} ₽
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant={product.stock > 10 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}>
                          {product.stock} шт
                        </Badge>
                      </td>
                      <td className="p-3 text-center">{getStatusBadge(product.status)}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(product)}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Icon name="Package" size={48} className="mx-auto mb-4" />
                  <p>Товары не найдены</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingProduct ? 'Редактировать товар' : 'Добавить товар'}</CardTitle>
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="main" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="main">Основное</TabsTrigger>
                  <TabsTrigger value="pricing">Цены и остатки</TabsTrigger>
                  <TabsTrigger value="media">Изображения</TabsTrigger>
                </TabsList>

                <TabsContent value="main" className="space-y-4 mt-4">
                  <div>
                    <Label>Название товара *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Введите название"
                    />
                  </div>
                  <div>
                    <Label>Артикул</Label>
                    <Input
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="SKU-12345"
                    />
                  </div>
                  <div>
                    <Label>Категория</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Описание товара"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Статус</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активен</SelectItem>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="archived">Архив</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4 mt-4">
                  <div>
                    <Label>Цена *</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label>Старая цена (необязательно)</Label>
                    <Input
                      type="number"
                      value={formData.oldPrice || ''}
                      onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value ? Number(e.target.value) : undefined })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label>Количество на складе</Label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-4 mt-4">
                  <div>
                    <Label>URL изображения</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  {formData.image && (
                    <div className="border rounded-lg p-4">
                      <Label className="mb-2 block">Предпросмотр</Label>
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full max-w-md h-auto rounded-lg"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={resetForm}>
                  Отмена
                </Button>
                <Button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
                  <Icon name="Save" size={16} className="mr-2" />
                  {editingProduct ? 'Сохранить' : 'Добавить товар'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}