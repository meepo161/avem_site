import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/data/products';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onSelectSubcategory: (subcategoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(selectedCategory);

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      onSelectCategory(null);
      onSelectSubcategory(null);
    } else {
      setExpandedCategory(categoryId);
      onSelectCategory(categoryId);
      onSelectSubcategory(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Категории</h3>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setExpandedCategory(null);
          onSelectCategory(null);
          onSelectSubcategory(null);
        }}
        className={`w-full text-left px-4 py-2 rounded-md mb-2 transition-colors ${
          !selectedCategory ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Все продукты
      </motion.button>

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="space-y-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category.id ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </motion.button>

            {expandedCategory === category.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-4 space-y-1"
              >
                {category.subcategories.map((subcategory) => (
                  <motion.button
                    key={subcategory.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectSubcategory(subcategory.id)}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {subcategory.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;