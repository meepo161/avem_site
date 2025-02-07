import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Category, Subcategory } from '@/types/products';



interface CategoryFilterProps {

  categories: Category[];

  selectedCategory: string | null;

  selectedSubcategory: string | null;

  onSelectCategory: (categoryId: string | null, e: React.MouseEvent) => void;

  onSelectSubcategory: (subcategoryId: string | null, e: React.MouseEvent) => void;

}



export default function CategoryFilter({

  categories,

  selectedCategory,

  selectedSubcategory,

  onSelectCategory,

  onSelectSubcategory,

}: CategoryFilterProps) {

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);



  const handleCategoryClick = (categoryId: string, e: React.MouseEvent) => {

    if (categoryId === selectedCategory) {

      onSelectCategory(null, e);

      onSelectSubcategory(null, e);

    } else {

      onSelectCategory(categoryId, e);

      onSelectSubcategory(null, e);

    }

  };



  const handleSubcategoryClick = (subcategoryId: string, e: React.MouseEvent) => {

    if (subcategoryId === selectedSubcategory) {

      onSelectSubcategory(null, e);

    } else {

      onSelectSubcategory(subcategoryId, e);

    }

  };



  // Выбор иконки в зависимости от категории

  const categoryIcon = (categoryId: string) => {

    switch (categoryId) {

      case 'measuring':

        return (

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 

            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />

        );

      case 'testing':

        return (

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 

            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />

        );

      case 'loading':

        return (

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 

            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />

        );

      case 'automation':

        return (

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 

            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />

        );

      case 'automotive':

        return (

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 

            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />

        );

      default:

        return (

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 

            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />

        );

    }

  };



  return (

    <motion.div 

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      className="bg-white rounded-2xl shadow-lg p-6 space-y-6"

    >

      {/* Заголовок фильтра */}

      <div className="flex items-center justify-between border-b border-gray-100 pb-4">

        <h2 className="text-xl font-bold text-gray-900">Категории</h2>

        {(selectedCategory || selectedSubcategory) && (

          <motion.button

            whileHover={{ scale: 1.05 }}

            whileTap={{ scale: 0.95 }}

            onClick={(e) => {

              onSelectCategory(null, e);

              onSelectSubcategory(null, e);

            }}

            className="text-sm px-3 py-1 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors duration-200"

          >

            Сбросить

          </motion.button>

        )}

      </div>



      {/* Список категорий */}

      <div className="space-y-2">

        {/* Категория "Вся продукция" */}

        <motion.button

          whileHover={{ x: 4 }}

          onClick={(e) => {

            e.preventDefault();

            onSelectCategory(null, e);

            onSelectSubcategory(null, e);

          }}

          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${

            !selectedCategory

              ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'

              : 'hover:bg-gray-50 text-gray-700'

          }`}

        >

          <div className="flex items-center space-x-3">

            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />

            </svg>

            <span>Вся продукция</span>

          </div>

        </motion.button>



        {/* Остальные категории */}

        {categories.map((category) => {

          return (

            <div key={category.id} className="space-y-2">

              <motion.button

                whileHover={{ x: 4 }}

                onClick={(e) => {

                  e.preventDefault();

                  handleCategoryClick(category.id, e);

                }}

                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${

                  category.id === selectedCategory

                    ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'

                    : 'hover:bg-gray-50 text-gray-700'

                }`}

              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center space-x-3">

                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      {categoryIcon(category.id)}

                    </svg>

                    <span>{category.name}</span>

                  </div>

                  {category.subcategories && category.subcategories.length > 0 && (

                    <motion.div

                      animate={{ rotate: category.id === selectedCategory ? 180 : 0 }}

                      transition={{ duration: 0.2 }}

                    >

                      <svg

                        className="w-5 h-5 text-gray-400"

                        fill="none"

                        stroke="currentColor"

                        viewBox="0 0 24 24"

                      >

                        <path

                          strokeLinecap="round"

                          strokeLinejoin="round"

                          strokeWidth={2}

                          d="M19 9l-7 7-7-7"

                        />

                      </svg>

                    </motion.div>

                  )}

                </div>

              </motion.button>



              {/* Подкатегории */}

              <AnimatePresence>

                {category.id === selectedCategory && category.subcategories && category.subcategories.length > 0 && (

                  <motion.div

                    initial={{ opacity: 0, height: 0 }}

                    animate={{ opacity: 1, height: 'auto' }}

                    exit={{ opacity: 0, height: 0 }}

                    className="ml-6 space-y-1 overflow-hidden"

                  >

                    {category.subcategories.map((subcategory) => (

                      <motion.button

                        key={subcategory.id}

                        whileHover={{ x: 4 }}

                        onClick={(e) => {

                          e.preventDefault();

                          handleSubcategoryClick(subcategory.id, e);

                        }}

                        className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-200 ${

                          subcategory.id === selectedSubcategory

                            ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'

                            : 'hover:bg-gray-50 text-gray-600'

                        }`}

                      >

                        <span className="block ml-2">{subcategory.name}</span>

                      </motion.button>

                    ))}

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          );

        })}

      </div>



      {/* Информация о выбранных фильтрах */}

      <AnimatePresence>

        {(selectedCategory || selectedSubcategory) && (

          <motion.div

            initial={{ opacity: 0, y: -10 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0, y: -10 }}

            className="p-4 bg-gray-50 rounded-xl border border-gray-100"

          >

            <p className="text-sm text-gray-600">

              Выбрано:{' '}

              <span className="font-medium text-gray-900">

                {selectedCategoryData?.name}

                {selectedSubcategory && selectedCategoryData?.subcategories.find((s: Subcategory) => s.id === selectedSubcategory) && (

                  <> → {selectedCategoryData.subcategories.find((s: Subcategory) => s.id === selectedSubcategory)?.name}</>

                )}

              </span>

            </p>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.div>

  );

}
