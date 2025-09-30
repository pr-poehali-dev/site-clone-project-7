import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
    defaultStyles: { padding: '20px' }
  },
  {
    type: 'container',
    label: 'Контейнер',
    icon: 'Square',
    defaultContent: 'Контейнер',
    defaultStyles: { backgroundColor: '#f3f4f6', padding: '30px' }
  }
];

export default function Builder() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

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
    setSelectedComponent(newComponent.id);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const updateComponentStyle = (id: string, styleName: string, value: string) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, styles: { ...c.styles, [styleName]: value } } : c
    ));
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const moveComponent = (fromIndex: number, toIndex: number) => {
    const newComponents = [...components];
    const [removed] = newComponents.splice(fromIndex, 1);
    newComponents.splice(toIndex, 0, removed);
    setComponents(newComponents);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOver(components[index].id);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/html'));
    moveComponent(fromIndex, toIndex);
    setDraggedOver(null);
  };

  const renderComponent = (component: Component) => {
    const isSelected = selectedComponent === component.id;
    const isDraggedOver = draggedOver === component.id;

    const baseStyles = {
      ...component.styles,
      cursor: 'move',
      transition: 'all 0.2s',
      border: isSelected ? '2px solid #2563EB' : isDraggedOver ? '2px dashed #2563EB' : '2px solid transparent',
      position: 'relative' as const,
      minHeight: '40px'
    };

    switch (component.type) {
      case 'heading':
        return (
          <h2 style={baseStyles}>
            {component.content}
          </h2>
        );
      case 'text':
        return (
          <p style={baseStyles}>
            {component.content}
          </p>
        );
      case 'button':
        return (
          <div style={{ ...baseStyles, display: 'inline-block', borderRadius: '8px' }}>
            {component.content}
          </div>
        );
      case 'image':
        return (
          <div style={baseStyles}>
            <img 
              src={component.content} 
              alt="Component" 
              style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
            />
          </div>
        );
      case 'divider':
        return (
          <div style={baseStyles}>
            <hr style={{ border: 'none', borderTop: '2px solid #e5e7eb', margin: '0' }} />
          </div>
        );
      case 'container':
        return (
          <div style={{ ...baseStyles, borderRadius: '8px' }}>
            {component.content}
          </div>
        );
      default:
        return null;
    }
  };

  const selected = components.find(c => c.id === selectedComponent);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Layout" className="text-primary" size={24} />
              <span className="text-xl font-bold">Конструктор сайтов</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Icon name="Save" size={14} />
              Сохранено
            </Badge>
            <Button variant="outline" size="sm">
              <Icon name="Eye" className="mr-2" size={16} />
              Предпросмотр
            </Button>
            <Button size="sm">
              <Icon name="Rocket" className="mr-2" size={16} />
              Опубликовать
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="Package" size={18} />
              Компоненты
            </h3>
            <div className="space-y-2">
              {componentLibrary.map((comp) => (
                <Button
                  key={comp.type}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addComponent(comp.type)}
                >
                  <Icon name={comp.icon as any} className="mr-2" size={18} />
                  {comp.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg min-h-[600px] p-8">
            {components.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <Icon name="MousePointer" size={64} className="text-gray-300 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Начните создавать
                </h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Выберите компоненты слева и перетаскивайте их для создания вашего сайта
                </p>
                <Button onClick={() => addComponent('heading')}>
                  <Icon name="Plus" className="mr-2" size={18} />
                  Добавить первый компонент
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {components.map((component, index) => (
                  <div
                    key={component.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragLeave={() => setDraggedOver(null)}
                    onClick={() => setSelectedComponent(component.id)}
                    className="relative group"
                  >
                    {renderComponent(component)}
                    {selectedComponent === component.id && (
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteComponent(component.id);
                          }}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            {selected ? (
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Settings" size={18} />
                  Настройки компонента
                </h3>

                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Контент</TabsTrigger>
                    <TabsTrigger value="style">Стиль</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="content">Содержимое</Label>
                      {selected.type === 'image' ? (
                        <Input
                          id="content"
                          value={selected.content}
                          onChange={(e) => updateComponent(selected.id, { content: e.target.value })}
                          placeholder="URL изображения"
                        />
                      ) : (
                        <textarea
                          id="content"
                          className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          value={selected.content}
                          onChange={(e) => updateComponent(selected.id, { content: e.target.value })}
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="style" className="space-y-4 mt-4">
                    {selected.type !== 'divider' && (
                      <>
                        <div>
                          <Label htmlFor="fontSize">Размер шрифта</Label>
                          <Input
                            id="fontSize"
                            value={selected.styles.fontSize || '16px'}
                            onChange={(e) => updateComponentStyle(selected.id, 'fontSize', e.target.value)}
                            placeholder="16px"
                          />
                        </div>

                        <div>
                          <Label htmlFor="textColor">Цвет текста</Label>
                          <div className="flex gap-2">
                            <Input
                              id="textColor"
                              type="color"
                              value={selected.styles.textColor || '#000000'}
                              onChange={(e) => updateComponentStyle(selected.id, 'textColor', e.target.value)}
                              className="w-20"
                            />
                            <Input
                              value={selected.styles.textColor || '#000000'}
                              onChange={(e) => updateComponentStyle(selected.id, 'textColor', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="textAlign">Выравнивание</Label>
                          <div className="flex gap-2">
                            {['left', 'center', 'right'].map((align) => (
                              <Button
                                key={align}
                                variant={selected.styles.textAlign === align ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateComponentStyle(selected.id, 'textAlign', align)}
                                className="flex-1"
                              >
                                <Icon name={`Align${align.charAt(0).toUpperCase() + align.slice(1)}` as any} size={16} />
                              </Button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="backgroundColor">Фон</Label>
                      <div className="flex gap-2">
                        <Input
                          id="backgroundColor"
                          type="color"
                          value={selected.styles.backgroundColor || '#ffffff'}
                          onChange={(e) => updateComponentStyle(selected.id, 'backgroundColor', e.target.value)}
                          className="w-20"
                        />
                        <Input
                          value={selected.styles.backgroundColor || '#ffffff'}
                          onChange={(e) => updateComponentStyle(selected.id, 'backgroundColor', e.target.value)}
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="padding">Отступы</Label>
                      <Input
                        id="padding"
                        value={selected.styles.padding || '10px'}
                        onChange={(e) => updateComponentStyle(selected.id, 'padding', e.target.value)}
                        placeholder="10px"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <Icon name="MousePointer" size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Выберите компонент<br />для настройки</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}