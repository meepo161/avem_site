import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { motion } from 'framer-motion';
import { products, categories } from '@/data/products';
import HeroBackground from '@/components/HeroBackground';

type SortOption = 'name' | 'type';

// Функция для нормализации текста
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[ёе]/g, 'е')
    .replace(/[йи]/g, 'и')
    .replace(/[^a-zа-я0-9\s]/g, '')
    .trim();
};

// Функция для проверки совпадения слов
const checkWordMatch = (word: string, searchWord: string): boolean => {
  const normalizedWord = normalizeText(word);
  const normalizedSearch = normalizeText(searchWord);
  
  // Точное совпадение
  if (normalizedWord === normalizedSearch) return true;
  
  // Частичное совпадение в начале слова
  if (normalizedWord.startsWith(normalizedSearch)) return true;
  
  // Частичное совпадение с учетом возможных опечаток (расстояние Левенштейна <= 2)
  if (normalizedWord.length > 4 && normalizedSearch.length > 4) {
    const distance = levenshteinDistance(normalizedWord, normalizedSearch);
    if (distance <= 2) return true;
  }
  
  return false;
};

// Функция для расчета расстояния Левенштейна
const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
};

// Функция для расчета веса совпадения
const calculateMatchWeight = (word: string, searchWord: string): number => {
  const normalizedWord = normalizeText(word);
  const normalizedSearch = normalizeText(searchWord);
  
  // Точное совпадение
  if (normalizedWord === normalizedSearch) return 1.0;
  
  // Частичное совпадение в начале слова
  if (normalizedWord.startsWith(normalizedSearch)) return 0.8;
  
  // Частичное совпадение с учетом опечаток
  if (normalizedWord.length > 4 && normalizedSearch.length > 4) {
    const distance = levenshteinDistance(normalizedWord, normalizedSearch);
    if (distance === 1) return 0.6;
    if (distance === 2) return 0.4;
  }
  
  return 0;
};

// Функция для расчета общей релевантности продукта
const calculateProductRelevance = (product: typeof products[0], searchWords: string[]): number => {
  let totalWeight = 0;

  for (const searchWord of searchWords) {
    let maxWordWeight = 0;

    // Проверяем название продукта (высший приоритет)
    const nameWords = product.name.split(' ');
    for (const word of nameWords) {
      const weight = calculateMatchWeight(word, searchWord) * 1.5; // Увеличенный вес для названия
      maxWordWeight = Math.max(maxWordWeight, weight);
    }

    // Проверяем описание продукта (средний приоритет)
    const descriptionWords = product.description.split(' ');
    for (const word of descriptionWords) {
      const weight = calculateMatchWeight(word, searchWord);
      maxWordWeight = Math.max(maxWordWeight, weight);
    }

    // Проверяем категорию и подкатегорию (низший приоритет)
    const category = categories.find(c => c.id === product.categoryId);
    const subcategory = category?.subcategories.find(s => s.id === product.subcategoryId);
    
    if (category) {
      const weight = calculateMatchWeight(category.name, searchWord) * 0.8;
      maxWordWeight = Math.max(maxWordWeight, weight);
    }
    
    if (subcategory) {
      const weight = calculateMatchWeight(subcategory.name, searchWord) * 0.8;
      maxWordWeight = Math.max(maxWordWeight, weight);
    }

    totalWeight += maxWordWeight;
  }

  // Нормализуем вес относительно количества слов в запросе
  return searchWords.length > 0 ? totalWeight / searchWords.length : 0;
};

export default function Products() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const productImages = [
    '/images/products/КСПЭМ1000jpg.jpg',
    '/images/products/КСИПН.jpg',
    '/images/products/ливс.jpg',
    '/images/products/КИЛОВОЛЬТМЕТР КВМ.jpg',
  ];

  // Синхронизация состояния с URL при монтировании и изменении URL
  useEffect(() => {
    const { category, subcategory, search } = router.query;
    
    // Проверяем, что категория существует перед установкой
    if (typeof category === 'string') {
      const categoryExists = categories.some(c => c.id === category);
      if (categoryExists) {
        setSelectedCategory(category);
        
        // Проверяем подкатегорию только если категория существует
        if (typeof subcategory === 'string') {
          const categoryData = categories.find(c => c.id === category);
          const subcategoryExists = categoryData?.subcategories.some(s => s.id === subcategory);
          if (subcategoryExists) {
            setSelectedSubcategory(subcategory);
          } else {
            setSelectedSubcategory(null);
          }
        } else {
          setSelectedSubcategory(null);
        }
      } else {
        // Если категория не существует, сбрасываем все
        setSelectedCategory(null);
        setSelectedSubcategory(null);
      }
    } else {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }

    // Устанавливаем поисковый запрос
    if (typeof search === 'string') {
      setSearchQuery(search);
    } else {
      setSearchQuery('');
    }
  }, [router.query]);

  // Обновление URL при изменении фильтров
  const updateURL = (newCategory: string | null, newSubcategory: string | null, newSearch: string) => {
    const query: { [key: string]: string } = {};
    
    if (newCategory) {
      query.category = newCategory;
      if (newSubcategory) {
        query.subcategory = newSubcategory;
      }
    }
    
    if (newSearch) {
      query.search = newSearch;
    }

    // Формируем новый URL
    const queryString = new URLSearchParams(query).toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;
    
    // Обновляем URL без перезагрузки страницы
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  };

  // Сброс всех фильтров
  const resetFilters = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
    
    // Обновляем URL без перезагрузки страницы
    window.history.replaceState({ ...window.history.state, as: '/products', url: '/products' }, '', '/products');
  };

  // Обработчики изменения фильтров
  const handleCategoryChange = (categoryId: string | null, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (categoryId === selectedCategory) {
      // Если кликнули на уже выбранную категорию, сбрасываем все
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSearchQuery('');
      updateURL(null, null, '');
    } else {
      // Выбираем новую категорию и сбрасываем подкатегорию
      setSelectedCategory(categoryId);
      setSelectedSubcategory(null);
      setSearchQuery('');
      updateURL(categoryId, null, '');
    }
  };

  const handleSubcategoryChange = (subcategoryId: string | null, e?: React.MouseEvent) => {
    e?.preventDefault();
    // Проверяем, что категория выбрана и подкатегория существует
    if (!selectedCategory) return;
    
    const category = categories.find(c => c.id === selectedCategory);
    if (!category?.subcategories?.some(s => s.id === subcategoryId)) return;

    if (subcategoryId === selectedSubcategory) {
      // Если кликнули на уже выбранную подкатегорию, сбрасываем только её
      setSelectedSubcategory(null);
      updateURL(selectedCategory, null, searchQuery);
    } else {
      // Выбираем новую подкатегорию
      setSelectedSubcategory(subcategoryId);
      updateURL(selectedCategory, subcategoryId, searchQuery);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newSearch = e.target.value;
    setSearchQuery(newSearch);
    updateURL(selectedCategory, selectedSubcategory, newSearch);
  };

  // Получаем текущую категорию и подкатегорию для отображения в заголовке
  const currentCategory = useMemo(() => {
    if (!selectedCategory) {
      return 'Вся продукция';
    }
    return categories.find(cat => cat.id === selectedCategory)?.name || '';
  }, [selectedCategory]);

  const currentSubcategory = useMemo(() => {
    if (!selectedCategory || !selectedSubcategory) return null;
    const category = categories.find(c => c.id === selectedCategory);
    return category?.subcategories.find(s => s.id === selectedSubcategory);
  }, [selectedCategory, selectedSubcategory, categories]);

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    // Удаляем дубликаты по id
    const uniqueProducts = products.reduce((acc, current) => {
      const exists = acc.find(item => item.id === current.id);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, [] as typeof products);

    let filtered = uniqueProducts;

    // Фильтрация по категории и подкатегории
    if (selectedCategory) {
      filtered = filtered.filter(product => {
        // Проверяем, что у продукта есть правильная категория и подкатегория
        const category = categories.find(c => c.id === selectedCategory);
        if (!category) return false;

        const matchesCategory = product.categoryId === selectedCategory;
        
        if (selectedSubcategory) {
          const subcategory = category.subcategories.find(s => s.id === selectedSubcategory);
          if (!subcategory) return false;
          
          return matchesCategory && product.subcategoryId === selectedSubcategory;
        }
        
        return matchesCategory;
      });
    }

    // Фильтрация по поисковому запросу
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      filtered = filtered.filter(product => {
        const normalizedName = normalizeText(product.name);
        const normalizedDescription = normalizeText(product.description);
        
        return normalizedName.includes(normalizedQuery) || 
               normalizedDescription.includes(normalizedQuery);
      });
    }

    return filtered;
  }, [products, categories, selectedCategory, selectedSubcategory, searchQuery]);

  return (
    <Layout>
      {/* Hero секция */}
      <section className="relative h-[40vh] md:min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <HeroBackground image="/images/products/КСПЭМ1000jpg.jpg" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Продукция
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80"
          >
            Широкий ассортимент высококачественного оборудования для различных отраслей промышленности
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Поиск по названию или описанию..."
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Фильтры */}
            <div className="lg:col-span-1">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onSelectCategory={handleCategoryChange}
                onSelectSubcategory={handleSubcategoryChange}
              />
            </div>

            {/* Список продуктов */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{currentCategory}</h1>
                {currentSubcategory && (
                  <p className="text-gray-600">{currentSubcategory.name}</p>
                )}
              </div>

              {/* Сетка продуктов */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    description={product.description}
                    image={product.images[0]}
                    category={categories.find(c => c.id === product.categoryId)?.name || ''}
                    categoryId={product.categoryId}
                    subcategoryId={product.subcategoryId}
                    documents={product.documents}
                  />
                ))}
              </div>

              {/* Сообщение, если ничего не найдено */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">По вашему запросу ничего не найдено</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 