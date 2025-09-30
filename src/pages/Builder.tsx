import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Component {
  id: string;
  type: string;
  content: string;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    padding?: string;
    textAlign?: string;
  };
}

interface Project {
  id: string;
  name: string;
  components: Component[];
  createdAt: string;
  updatedAt: string;
}

interface BlockTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  components: Component[];
}

const componentLibrary = [
  {
    type: 'heading',
    label: 'Заголовок',
    icon: 'Heading',
    defaultContent: 'Введите заголовок',
    defaultStyles: { fontSize: '32px', textAlign: 'center', padding: '20px' }
  },
  {
    type: 'text',
    label: 'Текст',
    icon: 'AlignLeft',
    defaultContent: 'Введите текст параграфа',
    defaultStyles: { fontSize: '16px', padding: '15px' }
  },
  {
    type: 'button',
    label: 'Кнопка',
    icon: 'MousePointer',
    defaultContent: 'Нажмите меня',
    defaultStyles: { backgroundColor: '#2563EB', textColor: '#ffffff', padding: '12px 24px', textAlign: 'center' }
  },
  {
    type: 'image',
    label: 'Изображение',
    icon: 'Image',
    defaultContent: 'https://via.placeholder.com/600x400',
    defaultStyles: { padding: '10px', textAlign: 'center' }
  },
  {
    type: 'divider',
    label: 'Разделитель',
    icon: 'Minus',
    defaultContent: '',
    defaultStyles: { backgroundColor: '#E5E7EB', padding: '1px 0' }
  },
  {
    type: 'container',
    label: 'Контейнер',
    icon: 'Square',
    defaultContent: '',
    defaultStyles: { backgroundColor: '#F9FAFB', padding: '30px' }
  }
];

const blockTemplates: BlockTemplate[] = [
  {
    id: 'hero-1',
    name: 'Герой с кнопкой',
    category: 'hero',
    thumbnail: '🎯',
    components: [
      {
        id: 'temp-1',
        type: 'container',
        content: '',
        styles: { backgroundColor: '#EEF2FF', padding: '60px 20px', textAlign: 'center' }
      },
      {
        id: 'temp-2',
        type: 'heading',
        content: 'Создавайте потрясающие сайты',
        styles: { fontSize: '48px', textAlign: 'center', padding: '20px' }
      },
      {
        id: 'temp-3',
        type: 'text',
        content: 'Профессиональный конструктор для ваших идей',
        styles: { fontSize: '20px', textAlign: 'center', padding: '15px', textColor: '#6B7280' }
      },
      {
        id: 'temp-4',
        type: 'button',
        content: 'Начать бесплатно',
        styles: { backgroundColor: '#2563EB', textColor: '#ffffff', padding: '16px 32px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'features-1',
    name: 'Три преимущества',
    category: 'features',
    thumbnail: '⭐',
    components: [
      {
        id: 'temp-5',
        type: 'container',
        content: '',
        styles: { backgroundColor: '#ffffff', padding: '40px 20px' }
      },
      {
        id: 'temp-6',
        type: 'heading',
        content: '🚀 Быстро',
        styles: { fontSize: '24px', textAlign: 'center', padding: '15px' }
      },
      {
        id: 'temp-7',
        type: 'text',
        content: 'Создавайте сайты за минуты',
        styles: { fontSize: '16px', textAlign: 'center', padding: '10px' }
      },
      {
        id: 'temp-8',
        type: 'heading',
        content: '💎 Красиво',
        styles: { fontSize: '24px', textAlign: 'center', padding: '15px' }
      },
      {
        id: 'temp-9',
        type: 'text',
        content: 'Профессиональный дизайн',
        styles: { fontSize: '16px', textAlign: 'center', padding: '10px' }
      },
      {
        id: 'temp-10',
        type: 'heading',
        content: '⚡ Мощно',
        styles: { fontSize: '24px', textAlign: 'center', padding: '15px' }
      },
      {
        id: 'temp-11',
        type: 'text',
        content: 'Все необходимые инструменты',
        styles: { fontSize: '16px', textAlign: 'center', padding: '10px' }
      }
    ]
  },
  {
    id: 'cta-1',
    name: 'Призыв к действию',
    category: 'cta',
    thumbnail: '🎁',
    components: [
      {
        id: 'temp-12',
        type: 'container',
        content: '',
        styles: { backgroundColor: '#1E40AF', padding: '50px 20px', textAlign: 'center' }
      },
      {
        id: 'temp-13',
        type: 'heading',
        content: 'Готовы начать?',
        styles: { fontSize: '36px', textAlign: 'center', padding: '20px', textColor: '#ffffff' }
      },
      {
        id: 'temp-14',
        type: 'text',
        content: 'Присоединяйтесь к тысячам пользователей',
        styles: { fontSize: '18px', textAlign: 'center', padding: '15px', textColor: '#DBEAFE' }
      },
      {
        id: 'temp-15',
        type: 'button',
        content: 'Начать сейчас',
        styles: { backgroundColor: '#ffffff', textColor: '#1E40AF', padding: '16px 32px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'testimonial-1',
    name: 'Отзыв',
    category: 'testimonials',
    thumbnail: '💬',
    components: [
      {
        id: 'temp-16',
        type: 'container',
        content: '',
        styles: { backgroundColor: '#F9FAFB', padding: '40px 20px' }
      },
      {
        id: 'temp-17',
        type: 'text',
        content: '"Лучший конструктор, который я использовал!"',
        styles: { fontSize: '20px', textAlign: 'center', padding: '15px', textColor: '#374151' }
      },
      {
        id: 'temp-18',
        type: 'text',
        content: '— Иван Петров, CEO',
        styles: { fontSize: '14px', textAlign: 'center', padding: '10px', textColor: '#6B7280' }
      }
    ]
  },
  {
    id: 'contact-1',
    name: 'Форма контактов',
    category: 'contact',
    thumbnail: '📧',
    components: [
      {
        id: 'temp-19',
        type: 'container',
        content: '',
        styles: { backgroundColor: '#ffffff', padding: '40px 20px' }
      },
      {
        id: 'temp-20',
        type: 'heading',
        content: 'Свяжитесь с нами',
        styles: { fontSize: '32px', textAlign: 'center', padding: '20px' }
      },
      {
        id: 'temp-21',
        type: 'text',
        content: 'Email: info@example.com | Телефон: +7 (999) 123-45-67',
        styles: { fontSize: '16px', textAlign: 'center', padding: '15px', textColor: '#6B7280' }
      },
      {
        id: 'temp-22',
        type: 'button',
        content: 'Написать нам',
        styles: { backgroundColor: '#10B981', textColor: '#ffffff', padding: '14px 28px', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'footer-1',
    name: 'Подвал',
    category: 'footer',
    thumbnail: '🔗',
    components: [
      {
        id: 'temp-23',
        type: 'container',
        content: '',
        styles: { backgroundColor: '#1F2937', padding: '40px 20px' }
      },
      {
        id: 'temp-24',
        type: 'text',
        content: '© 2025 Ваша Компания. Все права защищены.',
        styles: { fontSize: '14px', textAlign: 'center', padding: '10px', textColor: '#9CA3AF' }
      },
      {
        id: 'temp-25',
        type: 'text',
        content: 'О нас | Контакты | Политика конфиденциальности',
        styles: { fontSize: '14px', textAlign: 'center', padding: '10px', textColor: '#9CA3AF' }
      }
    ]
  }
];

export default function Builder() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [showBlockLibrary, setShowBlockLibrary] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState('Мой проект');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const savedProjects = localStorage.getItem('builder-projects');
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      setProjects(parsed);
    }
  }, []);

  useEffect(() => {
    if (currentProject) {
      const timer = setTimeout(() => {
        saveProject();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [components, projectName]);

  const saveProject = () => {
    const updatedProject: Project = {
      id: currentProject?.id || Date.now().toString(),
      name: projectName,
      components: components,
      createdAt: currentProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedProjects = currentProject
      ? projects.map(p => p.id === currentProject.id ? updatedProject : p)
      : [...projects, updatedProject];

    setProjects(updatedProjects);
    setCurrentProject(updatedProject);
    localStorage.setItem('builder-projects', JSON.stringify(updatedProjects));
  };

  const createNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'Новый проект',
      components: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCurrentProject(newProject);
    setProjectName(newProject.name);
    setComponents([]);
    setShowProjectManager(false);
  };

  const loadProject = (project: Project) => {
    setCurrentProject(project);
    setProjectName(project.name);
    setComponents(project.components);
    setShowProjectManager(false);
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('builder-projects', JSON.stringify(updatedProjects));
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
      setComponents([]);
      setProjectName('Мой проект');
    }
  };

  const addComponent = (type: string) => {
    const library = componentLibrary.find(c => c.type === type);
    if (!library) return;

    const newComponent: Component = {
      id: Date.now().toString(),
      type,
      content: library.defaultContent,
      styles: library.defaultStyles
    };

    setComponents([...components, newComponent]);
  };

  const addBlockTemplate = (template: BlockTemplate) => {
    const newComponents = template.components.map(comp => ({
      ...comp,
      id: Date.now().toString() + Math.random()
    }));
    setComponents([...components, ...newComponents]);
    setShowBlockLibrary(false);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(components.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
    setSelectedComponent(null);
  };

  const handleDragStart = (id: string) => {
    setDraggedComponent(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedComponent) return;

    const draggedIndex = components.findIndex(c => c.id === draggedComponent);
    const targetIndex = components.findIndex(c => c.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newComponents = [...components];
    const [removed] = newComponents.splice(draggedIndex, 1);
    newComponents.splice(targetIndex, 0, removed);

    setComponents(newComponents);
    setDraggedComponent(null);
  };

  const selected = components.find(c => c.id === selectedComponent);
  const categories = ['all', 'hero', 'features', 'cta', 'testimonials', 'contact', 'footer'];
  const categoryLabels: Record<string, string> = {
    all: 'Все',
    hero: 'Герои',
    features: 'Преимущества',
    cta: 'Призывы',
    testimonials: 'Отзывы',
    contact: 'Контакты',
    footer: 'Подвалы'
  };

  const filteredBlocks = selectedCategory === 'all' 
    ? blockTemplates 
    : blockTemplates.filter(b => b.category === selectedCategory);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" size={18} />
          </Button>
          <Input 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)}
            className="font-semibold text-lg border-none focus-visible:ring-0 w-64"
          />
          <Badge variant="outline" className="text-xs">
            {currentProject ? 'Сохранено' : 'Не сохранено'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowProjectManager(true)}>
            <Icon name="FolderOpen" size={18} className="mr-2" />
            Проекты
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowBlockLibrary(true)}>
            <Icon name="Layout" size={18} className="mr-2" />
            Блоки
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Eye" size={18} className="mr-2" />
            Предпросмотр
          </Button>
          <Button size="sm">
            <Icon name="Upload" size={18} className="mr-2" />
            Опубликовать
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Компоненты</h3>
            <div className="space-y-2">
              {componentLibrary.map((comp) => (
                <Card
                  key={comp.type}
                  className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => addComponent(comp.type)}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={comp.icon as any} size={20} className="text-primary" />
                    <span className="text-sm font-medium">{comp.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
          <div className="max-w-4xl mx-auto bg-white min-h-full shadow-lg rounded-lg">
            {components.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <Icon name="MousePointer" size={48} className="mb-4" />
                <p className="text-lg">Выберите компонент слева или добавьте готовый блок</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowBlockLibrary(true)}
                >
                  <Icon name="Layout" size={18} className="mr-2" />
                  Открыть библиотеку блоков
                </Button>
              </div>
            ) : (
              <div>
                {components.map((comp) => (
                  <div
                    key={comp.id}
                    draggable
                    onDragStart={() => handleDragStart(comp.id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(comp.id)}
                    onClick={() => setSelectedComponent(comp.id)}
                    className={`relative group cursor-move ${
                      selectedComponent === comp.id ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {comp.type === 'heading' && (
                      <h1
                        style={{
                          backgroundColor: comp.styles.backgroundColor,
                          color: comp.styles.textColor,
                          fontSize: comp.styles.fontSize,
                          padding: comp.styles.padding,
                          textAlign: comp.styles.textAlign as any
                        }}
                      >
                        {comp.content}
                      </h1>
                    )}
                    {comp.type === 'text' && (
                      <p
                        style={{
                          backgroundColor: comp.styles.backgroundColor,
                          color: comp.styles.textColor,
                          fontSize: comp.styles.fontSize,
                          padding: comp.styles.padding,
                          textAlign: comp.styles.textAlign as any
                        }}
                      >
                        {comp.content}
                      </p>
                    )}
                    {comp.type === 'button' && (
                      <div style={{ padding: comp.styles.padding, textAlign: comp.styles.textAlign as any }}>
                        <button
                          style={{
                            backgroundColor: comp.styles.backgroundColor,
                            color: comp.styles.textColor,
                            padding: '12px 24px',
                            borderRadius: '6px',
                            fontWeight: '500'
                          }}
                        >
                          {comp.content}
                        </button>
                      </div>
                    )}
                    {comp.type === 'image' && (
                      <div style={{ padding: comp.styles.padding, textAlign: comp.styles.textAlign as any }}>
                        <img src={comp.content} alt="Component" className="max-w-full h-auto" />
                      </div>
                    )}
                    {comp.type === 'divider' && (
                      <hr
                        style={{
                          backgroundColor: comp.styles.backgroundColor,
                          border: 'none',
                          height: '2px',
                          margin: comp.styles.padding
                        }}
                      />
                    )}
                    {comp.type === 'container' && (
                      <div
                        style={{
                          backgroundColor: comp.styles.backgroundColor,
                          padding: comp.styles.padding,
                          minHeight: '100px'
                        }}
                      >
                        {comp.content || <span className="text-gray-400">Контейнер</span>}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteComponent(comp.id);
                        }}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">Настройки</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedComponent(null)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>

                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Контент</TabsTrigger>
                    <TabsTrigger value="style">Стиль</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    {selected.type !== 'divider' && selected.type !== 'container' && (
                      <div>
                        <Label>Содержание</Label>
                        <Input
                          value={selected.content}
                          onChange={(e) =>
                            updateComponent(selected.id, { content: e.target.value })
                          }
                          placeholder="Введите текст"
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="style" className="space-y-4">
                    <div>
                      <Label>Цвет фона</Label>
                      <Input
                        type="color"
                        value={selected.styles.backgroundColor || '#ffffff'}
                        onChange={(e) =>
                          updateComponent(selected.id, {
                            styles: { ...selected.styles, backgroundColor: e.target.value }
                          })
                        }
                      />
                    </div>
                    {selected.type !== 'divider' && (
                      <div>
                        <Label>Цвет текста</Label>
                        <Input
                          type="color"
                          value={selected.styles.textColor || '#000000'}
                          onChange={(e) =>
                            updateComponent(selected.id, {
                              styles: { ...selected.styles, textColor: e.target.value }
                            })
                          }
                        />
                      </div>
                    )}
                    {(selected.type === 'heading' || selected.type === 'text') && (
                      <div>
                        <Label>Размер текста</Label>
                        <Input
                          value={selected.styles.fontSize || '16px'}
                          onChange={(e) =>
                            updateComponent(selected.id, {
                              styles: { ...selected.styles, fontSize: e.target.value }
                            })
                          }
                          placeholder="16px"
                        />
                      </div>
                    )}
                    <div>
                      <Label>Отступы</Label>
                      <Input
                        value={selected.styles.padding || '0'}
                        onChange={(e) =>
                          updateComponent(selected.id, {
                            styles: { ...selected.styles, padding: e.target.value }
                          })
                        }
                        placeholder="20px"
                      />
                    </div>
                    {selected.type !== 'divider' && (
                      <div>
                        <Label>Выравнивание</Label>
                        <Select
                          value={selected.styles.textAlign || 'left'}
                          onValueChange={(value) =>
                            updateComponent(selected.id, {
                              styles: { ...selected.styles, textAlign: value }
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Слева</SelectItem>
                            <SelectItem value="center">По центру</SelectItem>
                            <SelectItem value="right">Справа</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center text-gray-400 mt-8">
                <Icon name="MousePointer" size={48} className="mx-auto mb-2" />
                <p>Выберите компонент для редактирования</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {showProjectManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Мои проекты</h2>
                <Button variant="ghost" onClick={() => setShowProjectManager(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <Button onClick={createNewProject} className="mb-6 w-full">
                <Icon name="Plus" size={18} className="mr-2" />
                Создать новый проект
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {project.components.length} компонентов
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      Обновлён: {new Date(project.updatedAt).toLocaleDateString('ru-RU')}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => loadProject(project)}
                    >
                      Открыть
                    </Button>
                  </Card>
                ))}
              </div>

              {projects.length === 0 && (
                <div className="text-center text-gray-400 py-12">
                  <Icon name="FolderOpen" size={48} className="mx-auto mb-4" />
                  <p>У вас пока нет сохранённых проектов</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {showBlockLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[85vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Библиотека готовых блоков</h2>
                <Button variant="ghost" onClick={() => setShowBlockLibrary(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="flex gap-2 mb-6 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {categoryLabels[cat]}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBlocks.map((block) => (
                  <Card
                    key={block.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                    onClick={() => addBlockTemplate(block)}
                  >
                    <div className="text-5xl mb-3 text-center">{block.thumbnail}</div>
                    <h3 className="font-semibold text-center mb-2">{block.name}</h3>
                    <p className="text-xs text-gray-500 text-center mb-3">
                      {block.components.length} компонентов
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}