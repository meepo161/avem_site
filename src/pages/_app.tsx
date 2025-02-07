import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Сохраняем позицию прокрутки перед переходом
    const handleRouteChangeStart = () => {
      const path = router.asPath;
      sessionStorage.setItem(`scrollPos_${path}`, window.scrollY.toString());
    };

    // Восстанавливаем позицию прокрутки после перехода
    const handleRouteChangeComplete = (url: string) => {
      // Проверяем, был ли это переход "назад" или "вперед"
      const navigationType = window.performance 
        ? (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type 
        : null;
      
      if (navigationType === 'back_forward') {
        const savedPosition = sessionStorage.getItem(`scrollPos_${url}`);
        if (savedPosition) {
          window.scrollTo(0, parseInt(savedPosition));
        }
      } else {
        // Если это не переход назад/вперед, прокручиваем вверх
        window.scrollTo(0, 0);
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // Сохраняем позицию при закрытии/обновлении страницы
    window.addEventListener('beforeunload', () => {
      const path = router.asPath;
      sessionStorage.setItem(`scrollPos_${path}`, window.scrollY.toString());
    });

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return <Component {...pageProps} />;
} 