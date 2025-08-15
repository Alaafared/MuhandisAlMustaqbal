import React from 'react';
import { motion } from 'framer-motion';

const WelcomeHeader = () => {
  return (
<motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  className="gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900 text-white text-center py-8 sm:py-10 px-4"
>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        مرحباً بكم في تطبيق مهندس المستقبل
      </h1>
      <p className="text-lg md:text-xl mb-2">
        لبرنامج فني تركيبات كهربية لمدارس التعليم الفني
      </p>
      <p className="text-md md:text-lg font-semibold mb-2">
        إعداد وتصميم: م / علاء فريد - معلم أول أ كهرباء
      </p>
      <p className="text-sm md:text-md mb-4">
        مدرسة الشهيد المقدم محمد عبداللاه صالح الثانوية الصناعية العسكرية المشتركة
      </p>
      <div className="border-t border-white/30 pt-4 mt-4 max-w-2xl mx-auto">
        <p className="text-md font-semibold mb-2">شكر خاص</p>
        <p className="text-sm">
          للسادة موجهين تخصص الكهرباء بمحافظة الإسماعيلية:
        </p>
        <p className="text-sm">
          المهندس محمود جابر - المهندس هشام السيد
        </p>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;