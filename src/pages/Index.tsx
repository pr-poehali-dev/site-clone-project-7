import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const templates = [
  {
    id: 1,
    title: 'Бизнес Портфолио',
    category: 'Бизнес',
    description: 'Современный шаблон для презентации вашего бизнеса',
    image: 'https://v3.fal.media/files/lion/xEUZIsinZlmclKJCNzI1w_output.png',
    features: ['Адаптивный', 'SEO-оптимизирован', 'Формы контактов']
  },
  {
    id: 2,
    title: 'Интернет-магазин',
    category: 'E-commerce',
    description: 'Полнофункциональный шаблон для онлайн-торговли',
    image: 'https://v3.fal.media/files/lion/xEUZIsinZlmclKJCNzI1w_output.png',
    features: ['Корзина', 'Оплата', 'Каталог товаров']
  },
  {
    id: 3,
    title: 'Лендинг страница',
    category: 'Маркетинг',
    description: 'Эффективный лендинг для продвижения продукта',
    image: 'https://v3.fal.media/files/lion/xEUZIsinZlmclKJCNzI1w_output.png',
    features: ['Высокая конверсия', 'A/B тестирование', 'Аналитика']
  },
  {
    id: 4,
    title: 'Блог',
    category: 'Контент',
    description: 'Минималистичный шаблон для блога или журнала',
    image: 'https://v3.fal.media/files/lion/xEUZIsinZlmclKJCNzI1w_output.png',
    features: ['Редактор статей', 'Комментарии', 'RSS']
  },
  {
    id: 5,
    title: 'Корпоративный сайт',
    category: 'Бизнес',
    description: 'Профессиональный шаблон для крупных компаний',
    image: 'https://v3.fal.media/files/lion/xEUZIsinZlmclKJCNzI1w_output.png',
    features: ['Многостраничный', 'Новости', 'Вакансии']
  },
  {
    id: 6,
    title: 'Ресторан',
    category: 'HoReCa',
    description: 'Аппетитный шаблон для кафе и ресторанов',
    image: 'https://v3.fal.media/files/lion/xEUZIsinZlmclKJCNzI1w_output.png',
    features: ['Меню', 'Бронирование', 'Галерея']
  }
];

const pricing = [
  {
    name: 'Старт',
    price: '0',
    period: 'бесплатно',
    features: [
      '1 сайт',
      'Базовые шаблоны',
      'Поддомен',
      '500 МБ хранилища',
      'Базовая аналитика'
    ],
    highlighted: false
  },
  {
    name: 'Профессионал',
    price: '990',
    period: 'в месяц',
    features: [
      '5 сайтов',
      'Все премиум шаблоны',
      'Свой домен',
      '10 ГБ хранилища',
      'Расширенная аналитика',
      'Без рекламы',
      'Приоритетная поддержка'
    ],
    highlighted: true
  },
  {
    name: 'Бизнес',
    price: '2490',
    period: 'в месяц',
    features: [
      'Неограниченно сайтов',
      'Все функции',
      'Белая метка',
      '100 ГБ хранилища',
      'API доступ',
      'Выделенный менеджер',
      'SLA 99.9%'
    ],
    highlighted: false
  }
];

const features = [
  {
    icon: 'Layout',
    title: 'Drag & Drop редактор',
    description: 'Создавайте сайты без кода с помощью визуального редактора'
  },
  {
    icon: 'Smartphone',
    title: 'Адаптивный дизайн',
    description: 'Ваш сайт будет идеально выглядеть на любых устройствах'
  },
  {
    icon: 'Zap',
    title: 'Быстрая загрузка',
    description: 'Оптимизированный код для максимальной производительности'
  },
  {
    icon: 'Search',
    title: 'SEO инструменты',
    description: 'Встроенные инструменты для продвижения в поисковиках'
  },
  {
    icon: 'ShoppingCart',
    title: 'E-commerce',
    description: 'Интеграция с платежными системами и управление товарами'
  },
  {
    icon: 'BarChart3',
    title: 'Аналитика',
    description: 'Отслеживайте посетителей и конверсии в реальном времени'
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Code2" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900">BuildSite</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#templates" className="text-gray-700 hover:text-primary transition-colors">
                Шаблоны
              </a>
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
                Возможности
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-primary transition-colors">
                Тарифы
              </a>
              <a href="#examples" className="text-gray-700 hover:text-primary transition-colors">
                Примеры
              </a>
              <Button variant="outline">Войти</Button>
              <Button>Начать бесплатно</Button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name="Menu" size={24} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
              <div className="flex flex-col gap-4">
                <a href="#templates" className="text-gray-700 hover:text-primary transition-colors">
                  Шаблоны
                </a>
                <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
                  Возможности
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-primary transition-colors">
                  Тарифы
                </a>
                <a href="#examples" className="text-gray-700 hover:text-primary transition-colors">
                  Примеры
                </a>
                <Button variant="outline" className="w-full">Войти</Button>
                <Button className="w-full">Начать бесплатно</Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            🚀 Без знания программирования
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Создавайте сайты<br />
            <span className="text-primary">быстрее чем думаете</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Профессиональный конструктор сайтов с drag-and-drop редактором,
            готовыми шаблонами и мощными инструментами
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 transition-transform hover:scale-105" onClick={() => window.location.href = '/builder'}>
              <Icon name="Rocket" className="mr-2" size={20} />
              Начать создавать
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 transition-transform hover:scale-105" onClick={() => window.location.href = '/builder'}>
              <Icon name="Play" className="mr-2" size={20} />
              Смотреть демо
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Созданных сайтов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-gray-600">Рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-20 bg-white">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4">Возможности</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Все что нужно для успеха
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Мощные инструменты для создания профессиональных сайтов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} className="text-primary" size={28} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="templates" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4">Шаблоны</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Готовые решения для любой ниши
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите шаблон и настройте под себя за минуты
          </p>
        </div>

        <Tabs defaultValue="all" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-12 bg-white border border-gray-200">
            <TabsTrigger 
              value="all"
              onClick={() => setSelectedCategory('all')}
            >
              Все
            </TabsTrigger>
            <TabsTrigger 
              value="Бизнес"
              onClick={() => setSelectedCategory('Бизнес')}
            >
              Бизнес
            </TabsTrigger>
            <TabsTrigger 
              value="E-commerce"
              onClick={() => setSelectedCategory('E-commerce')}
            >
              Магазины
            </TabsTrigger>
            <TabsTrigger 
              value="Маркетинг"
              onClick={() => setSelectedCategory('Маркетинг')}
            >
              Маркетинг
            </TabsTrigger>
            <TabsTrigger 
              value="Контент"
              onClick={() => setSelectedCategory('Контент')}
            >
              Контент
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => (
              <Card 
                key={template.id} 
                className="group overflow-hidden border-2 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button className="w-full" size="lg">
                      <Icon name="Eye" className="mr-2" size={18} />
                      Предварительный просмотр
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {template.title}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Использовать шаблон
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tabs>
      </section>

      <section id="pricing" className="container mx-auto px-4 py-20 bg-white">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4">Тарифы</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Выберите подходящий план
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Начните бесплатно или выберите профессиональный план
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricing.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${
                plan.highlighted 
                  ? 'border-4 border-primary shadow-2xl scale-105 z-10' 
                  : 'border-2 hover:border-primary'
              } transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-white px-4 py-1 text-sm">
                    🔥 Популярный
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== '0' && <span className="text-gray-600 text-lg"> ₽</span>}
                </div>
                <CardDescription className="text-base mt-2">{plan.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon 
                        name="Check" 
                        className="text-green-500 flex-shrink-0 mt-0.5" 
                        size={20} 
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.price === '0' ? 'Начать бесплатно' : 'Выбрать план'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="examples" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4">Примеры работ</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Созданные на нашей платформе
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Вдохновитесь работами наших пользователей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((item, index) => (
            <Card 
              key={item}
              className="group overflow-hidden border-2 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Globe" className="text-primary/40" size={80} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg">
                    <Icon name="ExternalLink" className="mr-2" size={18} />
                    Посмотреть сайт
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Пример проекта {item}</CardTitle>
                <CardDescription>
                  Созданный с помощью нашего конструктора за 2 часа
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl my-20">
        <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы создать свой сайт?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Присоединяйтесь к 50,000+ создателям, которые уже используют нашу платформу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 transition-transform hover:scale-105">
              <Icon name="Rocket" className="mr-2" size={20} />
              Начать бесплатно
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary transition-transform hover:scale-105"
            >
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Code2" className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold">BuildSite</span>
              </div>
              <p className="text-gray-400">
                Создавайте профессиональные сайты без знания программирования
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Продукт</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Шаблоны</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Примеры</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Статус</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2025 BuildSite. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Github" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Twitter" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Linkedin" size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}