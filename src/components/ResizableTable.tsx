import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResizableTableProps {
  specifications: Record<string, string>;
}

const ResizableTable: React.FC<ResizableTableProps> = ({ specifications }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const firstColumnRef = useRef<HTMLTableCellElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const entries = Object.entries(specifications);
  const visibleEntries = showAll ? entries : entries.slice(0, 5);
  const hasMore = entries.length > 5;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const diff = e.clientX - startX;
      const newWidth = Math.max(150, startWidth + diff);
      if (firstColumnRef.current) {
        firstColumnRef.current.style.width = `${newWidth}px`;
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startX, startWidth]);

  const handleMouseDown = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (firstColumnRef.current) {
      setIsResizing(true);
      setStartX(e.clientX);
      setStartWidth(firstColumnRef.current.offsetWidth);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Характеристики</span>
          <span className="text-sm text-gray-500">({entries.length})</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full border-collapse">
          <thead>
            <tr>
              <th
                ref={firstColumnRef}
                className="text-center bg-gray-50 px-4 py-3 text-gray-700 font-medium border-b border-gray-200 min-w-[150px] select-none"
                style={{ width: '50%' }}
              >
                <div className="flex items-center">
                  <span className="flex-grow">Параметр</span>
                  <span
                    className="w-4 cursor-col-resize bg-gray-200 hover:bg-primary-200 transition-colors flex items-center justify-center"
                    onMouseDown={handleMouseDown}
                  >
                    <span className="w-0.5 h-6 bg-gray-400" />
                  </span>
                </div>
              </th>
              <th className="text-center bg-gray-50 px-4 py-3 text-gray-700 font-medium border-b border-gray-200">
                Значение
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence initial={false}>
              {visibleEntries.map(([key, value], index) => (
                <motion.tr
                  key={key}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98]
                  }}
                  className={`group transition-colors duration-150 ${
                    index % 2 === 0 
                      ? 'hover:bg-gray-100/80' 
                      : 'bg-gray-100/50 hover:bg-gray-100/80'
                  }`}
                >
                  <motion.td 
                    className="px-4 py-3 text-gray-600 group-hover:text-primary-600 transition-colors whitespace-normal break-words align-top text-center"
                  >
                    {key}
                  </motion.td>
                  <motion.td 
                    className="px-4 py-3 text-gray-800 group-hover:text-primary-600 whitespace-normal break-words align-top text-center transition-colors"
                  >
                    {value}
                  </motion.td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {hasMore && (
          <div className="p-4 border-t border-gray-200">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span>{showAll ? 'Показать меньше' : `Показать все (${entries.length})`}</span>
              <motion.svg
                className="w-5 h-5"
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </div>
        )}
      </div>

      {isResizing && (
        <div className="fixed inset-0 bg-black/0 cursor-col-resize z-50" />
      )}
    </div>
  );
};

export default ResizableTable; 