import React from 'react';
import { FaMobileAlt } from 'react-icons/fa'; // استيراد أيقونة الهاتف

const AppFooter = () => {
  return (
<footer className="bg-gray-800 dark:bg-gray-950 text-white py-4 sm:py-6 text-center">
<div className="container mx-auto px-4">
        <p className="text-sm">
          جميع الحقوق محفوظة للأستاذ علاء فريد &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm mt-1 flex items-center justify-center gap-2">
          <FaMobileAlt className="text-lg" /> {/* أيقونة الهاتف */}
          للتواصل: 01009209003
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;