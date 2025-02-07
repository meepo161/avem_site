import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { motion } from 'framer-motion';
import { products, categories } from '@/data/products';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Инициализация состояния после монтирования компонента
  useEffect(() => {
    setIsClient(true);
    const savedCategory = localStorage.getItem('selectedCategory');
    const savedSubcategory = localStorage.getItem('selectedSubcategory');
    const savedQuery = localStorage.getItem('searchQuery');
    
    if (savedCategory) setSelectedCategory(savedCategory);
    if (savedSubcategory) setSelectedSubcategory(savedSubcategory);
    if (savedQuery) setSearchQuery(savedQuery);

    // Восстанавливаем позицию скролла
    const savedScrollPos = localStorage.getItem('catalogScrollPos');
    if (savedScrollPos) {
      window.scrollTo(0, parseInt(savedScrollPos));
    }

    // Сохраняем позицию скролла при скролле
    const handleScroll = () => {
      localStorage.setItem('catalogScrollPos', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      localStorage.removeItem('catalogScrollPos');
    };
  }, []);

  // Сохраняем состояние фильтров при изменении
  useEffect(() => {
    if (!isClient) return;
    
    if (selectedCategory) {
      localStorage.setItem('selectedCategory', selectedCategory);
    } else {
      localStorage.removeItem('selectedCategory');
    }
  }, [selectedCategory, isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    if (selectedSubcategory) {
      localStorage.setItem('selectedSubcategory', selectedSubcategory);
    } else {
      localStorage.removeItem('selectedSubcategory');
    }
  }, [selectedSubcategory, isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    if (searchQuery) {
      localStorage.setItem('searchQuery', searchQuery);
    } else {
      localStorage.removeItem('searchQuery');
    }
  }, [searchQuery, isClient]);

  // Функция для сброса всех фильтров
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('selectedSubcategory');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('catalogScrollPos');
  };

  const filteredProducts = useMemo(() => {
    const searchWords = searchQuery.split(' ').filter(word => word.length > 0);
    
    const filtered = products
      .filter(product => {
        if (searchQuery) {
          return searchWords.every(searchWord => {
            const nameWords = product.name.split(' ');
            const nameMatch = nameWords.some(word => checkWordMatch(word, searchWord));
            if (nameMatch) return true;

            const descriptionWords = product.description.split(' ');
            const descriptionMatch = descriptionWords.some(word => checkWordMatch(word, searchWord));
            if (descriptionMatch) return true;

            const category = categories.find(c => c.id === product.categoryId);
            const subcategory = category?.subcategories.find(s => s.id === product.subcategoryId);
            
            const categoryMatch = category && checkWordMatch(category.name, searchWord);
            const subcategoryMatch = subcategory && checkWordMatch(subcategory.name, searchWord);

            return categoryMatch || subcategoryMatch;
          });
        }

        if (!selectedCategory) return true;
        if (!selectedSubcategory) return product.categoryId === selectedCategory;
        return product.categoryId === selectedCategory && product.subcategoryId === selectedSubcategory;
      });

    // Если есть поисковый запрос, сортируем по релевантности
    if (searchQuery) {
      return filtered.sort((a, b) => {
        const relevanceA = calculateProductRelevance(a, searchWords);
        const relevanceB = calculateProductRelevance(b, searchWords);
        return relevanceB - relevanceA;
      });
    }

    // Без поискового запроса возвращаем в порядке добавления
    return filtered;
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  return (
    <Layout>
      {/* Hero секция */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-900/20" />
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: 'url(/images/grid.svg)',
              backgroundRepeat: 'repeat',
              opacity: 0.1 
            }} 
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Каталог продукции</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Инновационные решения для измерения, диагностики и испытаний электротехнического оборудования
            </p>
            
            {/* Поиск */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Сайдбар с фильтрами */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  onSelectCategory={setSelectedCategory}
                  onSelectSubcategory={setSelectedSubcategory}
                />
              </motion.div>
            </div>

            {/* Список продуктов */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard
                      id={product.id}
                      title={product.name}
                      description={product.description}
                      image={product.images[0]}
                      category={categories.find(c => c.id === product.categoryId)?.name || ''}
                    />
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg mb-2">
                    По выбранным критериям ничего не найдено
                  </p>
                  <p className="text-gray-400">
                    Попробуйте изменить параметры поиска или фильтрации
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Сбросить все фильтры
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 