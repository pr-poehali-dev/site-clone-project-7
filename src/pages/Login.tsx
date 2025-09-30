import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', username);
    formData.append('password', password);
    formData.append('redirect', '');

    try {
      const response = await fetch('https://alltrades.ru/cp/?show=login&act=auth&key=', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8 pt-8">
          <a href="https://alltrades.ru" className="inline-block mb-6">
            <img 
              src="https://alltrades.ru/img/promo/logo1.jpg" 
              alt="AllTrades Logo" 
              className="w-32 h-32 rounded-full mx-auto shadow-lg"
            />
          </a>
          <CardTitle className="text-2xl font-bold text-gray-900">Вход в систему</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Логин:
              </Label>
              <Input
                id="username"
                type="text"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Пароль:
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                className="h-11"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2 h-4 w-4" />
                    Войти
                  </>
                )}
              </Button>
              <a
                href="https://www.alltrades.ru/?show=account4&act=s_restore_password"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Забыли пароль?
              </a>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">или</span>
              </div>
            </div>

            <div className="flex justify-center pb-2">
              <div id="telegram-login-container">
                <iframe
                  id="telegram-login-alltrades_bot"
                  src="https://oauth.telegram.org/embed/alltrades_bot?origin=https%3A%2F%2Falltrades.ru&return_to=https%3A%2F%2Falltrades.ru%2Fcp%2F%3Fshow%3Dlogin&size=medium&request_access=write"
                  width="186"
                  height="28"
                  frameBorder="0"
                  scrolling="no"
                  className="border-none overflow-hidden"
                  style={{ colorScheme: 'light dark' }}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}