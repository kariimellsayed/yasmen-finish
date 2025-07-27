'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';

export default function OrderDetails() {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg print:p-0 print:shadow-none print:border-none print:max-w-full print:bg-white">
      {/* اللوجو */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* العنوان */}
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {t('dashboard.orders.detailsTitle')}
      </h2>

      {/* تفاصيل الطلب */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-base print:text-sm">
        <div>
          <p><strong>{t('dashboard.orders.customerName')}:</strong> محمد علي</p>
          <p><strong>{t('dashboard.orders.orderNumber')}:</strong> #123456</p>
          <p><strong>{t('dashboard.orders.date')}:</strong> 2025-07-26</p>
        </div>
        <div>
          <p><strong>{t('dashboard.orders.status')}:</strong> تم التوصيل</p>
          <p><strong>{t('dashboard.orders.total')}:</strong> 560 جنيه</p>
          <p><strong>{t('dashboard.orders.paymentMethod')}:</strong> كاش</p>
        </div>
      </div>

      {/* المنتجات */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">{t('dashboard.orders.products')}</h3>
        <ul className="space-y-2">
          <li className="border p-3 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold">تيشرت رجالي</p>
              <p className="text-sm text-gray-500">{t('dashboard.orders.size')}: L / {t('dashboard.orders.color')}: أسود</p>
            </div>
            <p className="font-semibold">220 جنيه</p>
          </li>
          <li className="border p-3 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold">بنطلون جينز</p>
              <p className="text-sm text-gray-500">{t('dashboard.orders.size')}: 32 / {t('dashboard.orders.color')}: أزرق</p>
            </div>
            <p className="font-semibold">340 جنيه</p>
          </li>
        </ul>
      </div>

      {/* زر رفع صورة */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleImageUpload}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 transition print:hidden"
        >
          {t('dashboard.orders.uploadImage')}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
        />
      </div>
    </div>
  );
}
