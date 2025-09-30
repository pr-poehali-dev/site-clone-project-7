import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  link: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    icon: 'Settings',
    title: 'Общие настройки',
    description: 'Общие настройки сайта: смена пароля, перенос на отдельный домен, настройки панели управления и т.д.',
    link: '/settings',
    category: 'main'
  },
  {
    id: 2,
    icon: 'Package',
    title: 'Модули сайта',
    description: 'Подключение отдельных модулей для сайта - интернет-магазин, лента новостей, каталог статей, форма обратной связи и т.д.',
    link: '/modules',
    category: 'main'
  },
  {
    id: 3,
    icon: 'FileText',
    title: 'Страницы сайта',
    description: 'Управление страницами сайта. Здесь можно добавить новые страницы и отредактировать уже имеющиеся на сайте.',
    link: '/pages',
    category: 'main'
  },
  {
    id: 4,
    icon: 'Menu',
    title: 'Меню сайта',
    description: 'Управление меню сайта. Создание новых меню, управление пунктами меню, добавление в меню страниц и управление порядком их отображения.',
    link: '/menu',
    category: 'main'
  },
  {
    id: 5,
    icon: 'FolderOpen',
    title: 'Файлы',
    description: 'В этом разделе на сайт можно загрузить файлы для скачивания - прайс-листы, архивы, документы и любые другие.',
    link: '/files',
    category: 'main'
  },
  {
    id: 6,
    icon: 'Database',
    title: 'Резервные копии',
    description: 'В этом разделе можно восстановить состояние сайта за несколько предыдущих дней. Сайт восстанавливается полностью вместе с настройками, страницами, товарами, заказами и т.д.',
    link: '/backups',
    category: 'main'
  },
  {
    id: 7,
    icon: 'HelpCircle',
    title: 'Тех. поддержка',
    description: 'Здесь вы можете задать вопрос технической поддержке. Для получения скорейшего ответа опишите проблему как можно более полно и точно.',
    link: '/support',
    category: 'main'
  },
  {
    id: 8,
    icon: 'Palette',
    title: 'Варианты оформления',
    description: 'Здесь можно целиком поменять оформление сайта на один из встроенных вариантов. Товары, заказы, страницы и другая информация при этом не теряются.',
    link: '/design',
    category: 'design'
  },
  {
    id: 9,
    icon: 'Code',
    title: 'Шаблоны',
    description: 'Здесь можно отредактировать внешний вид сайта. Редактировать можно либо при помощи визуального редактора, либо напрямую изменяя HTML-кода шаблона.',
    link: '/templates',
    category: 'design'
  },
  {
    id: 10,
    icon: 'Image',
    title: 'Изображения',
    description: 'Здесь можно загрузить на сайт изображения. Их можно использовать в качестве элементов дизайна или просто разместить на страницах сайта.',
    link: '/images',
    category: 'design'
  },
  {
    id: 11,
    icon: 'CreditCard',
    title: 'Пополнить счет',
    description: 'Здесь вы можете пополнить счет.',
    link: '/billing',
    category: 'billing'
  }
];

const sidebarMenu = [
  {
    id: 1,
    title: 'Главная',
    icon: 'Home',
    items: [
      { label: 'Общие настройки', link: '/settings' },
      { label: 'Страницы сайта', link: '/pages' },
      { label: 'Меню сайта', link: '/menu' },
      { label: 'Файлы', link: '/files' }
    ]
  },
  {
    id: 2,
    title: 'Дизайн сайта',
    icon: 'PaintBucket',
    items: [
      { label: 'Варианты оформления', link: '/design' },
      { label: 'Изображения', link: '/images' },
      { label: 'Шаблоны сайта', link: '/templates' },
      { label: 'Визуальный редактор', link: '/builder' }
    ]
  },
  {
    id: 3,
    title: 'Мой магазин',
    icon: 'ShoppingCart',
    items: [
      { label: 'Разделы каталога', link: '/catalog' },
      { label: 'Товары', link: '/products' },
      { label: 'Заказы', link: '/orders' },
      { label: 'Импорт/Экспорт', link: '/import-export' },
      { label: 'Настройки магазина', link: '/shop-settings' }
    ]
  },
  {
    id: 4,
    title: 'Доп. модули',
    icon: 'Boxes',
    items: [
      { label: 'Лента новостей', link: '/news' },
      { label: 'Каталог статей', link: '/articles' },
      { label: 'Поиск', link: '/search' },
      { label: 'Формы обратной связи', link: '/forms' },
      { label: 'Пользователи', link: '/users' },
      { label: 'Опросы', link: '/polls' },
      { label: 'Фотогалерея', link: '/gallery' },
      { label: 'Онлайн-консультант', link: '/chat' },
      { label: 'Магазин в Telegram', link: '/telegram' },
      { label: 'Мобильное приложение', link: '/mobile-app' },
      { label: 'Магазины на поддоменах', link: '/subdomains' },
      { label: 'Мультиязычность', link: '/multilang' }
    ]
  },
  {
    id: 5,
    title: 'Реклама',
    icon: 'TrendingUp',
    items: [
      { label: 'Соцсети', link: '/social' },
      { label: 'Маркетплейсы', link: '/marketplaces' },
      { label: 'E-mail рассылки', link: '/email' },
      { label: 'Заказать рекламу', link: '/ads' }
    ]
  },
  {
    id: 6,
    title: 'Помощь',
    icon: 'HelpCircle',
    items: [
      { label: 'Техподдержка', link: '/support' },
      { label: 'Отдел доработки', link: '/custom-dev' },
      { label: 'Справка', link: '/help' }
    ]
  }
];

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  const toggleMenu = (menuId: number) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus(expandedMenus.filter(id => id !== menuId));
    } else {
      setExpandedMenus([...expandedMenus, menuId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} flex-shrink-0`}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!sidebarCollapsed && (
              <img src="https://alltrades.ru/img/promo/logo1.jpg" alt="Logo" className="w-16 h-16 rounded-full" />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Icon name={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </Button>
          </div>

          <nav className="p-2">
            {sidebarMenu.map((menu) => (
              <div key={menu.id} className="mb-2">
                <button
                  onClick={() => toggleMenu(menu.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={menu.icon as any} size={18} className="text-primary" />
                    {!sidebarCollapsed && <span className="font-medium text-sm">{menu.title}</span>}
                  </div>
                  {!sidebarCollapsed && (
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`transition-transform ${expandedMenus.includes(menu.id) ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {expandedMenus.includes(menu.id) && !sidebarCollapsed && (
                  <div className="ml-9 mt-1 space-y-1">
                    {menu.items.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {!sidebarCollapsed && (
            <div className="p-4 m-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-sm mb-3">Информация</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="/orders" className="text-gray-600 hover:text-primary">
                    Всего заказов: <strong>1</strong>
                  </a>
                </p>
                <p>
                  <a href="/comments" className="text-gray-600 hover:text-primary">
                    Комментариев: <strong>0</strong>
                  </a>
                </p>
                <p className="text-gray-600">
                  На счету: <strong>42 руб</strong>
                </p>
                <p className="text-red-600 font-semibold">Тариф: 2100 руб/мес</p>
                <p className="text-red-600 text-xs">Необходимо пополнить счет</p>
                <p>
                  <a href="/billing" className="text-teal-600 hover:text-teal-700">
                    Пополнить счет
                  </a>
                </p>
                <p className="text-green-600 flex items-center gap-1 pt-2">
                  <Icon name="Lock" size={14} />
                  <span className="text-xs">Защищено SSL</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Главная</div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Панель управления интернет-магазином
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Icon name="Lock" size={12} className="mr-1" />
                  SSL
                </Badge>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выход
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-all cursor-pointer group hover:scale-105"
                onClick={() => window.location.href = item.link}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={item.icon as any} size={40} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}