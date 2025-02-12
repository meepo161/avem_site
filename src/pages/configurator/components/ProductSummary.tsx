import React from 'react';
import { ProductRecommendation, FormState } from '../types';

interface ProductSummaryProps {
  product: ProductRecommendation;
  formState: FormState;
}

export const ProductSummary: React.FC<ProductSummaryProps> = ({ product, formState }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="p-4 bg-gray-50 border-b">
      <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
    </div>

    <div className="p-4">
      <div className="relative h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <p className="text-gray-600 mb-4">{product.description}</p>

      {product.characteristics && Object.entries(product.characteristics).map(([key, value]) => (
        <div key={key} className="mb-2 text-sm text-gray-600">
          <span className="font-medium text-gray-700">{key}:</span> {value}
        </div>
      ))}

      {formState.organization && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Данные заказчика</h4>
          <div className="space-y-2">
            <p className="text-sm"><span className="font-medium">Организация:</span> {formState.organization}</p>
            <p className="text-sm"><span className="font-medium">Контактное лицо:</span> {formState.contactPerson}</p>
            <p className="text-sm"><span className="font-medium">Контакты:</span> {formState.contactDetails}</p>
            <p className="text-sm"><span className="font-medium">Дата поставки:</span> {formState.deliveryDate}</p>
          </div>
        </div>
      )}

      {formState.additionalTests && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Дополнительные требования</h4>
          <p className="text-sm text-gray-600">{formState.additionalTests}</p>
        </div>
      )}
    </div>
  </div>
); 