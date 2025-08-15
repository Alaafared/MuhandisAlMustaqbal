import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';

const GradeSelection = ({ grades, onSelectGrade }) => {
  return (
<div className="min-h-[calc(100vh-180px)] gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4 sm:p-6">      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {grades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl card-hover cursor-pointer"
              onClick={() => onSelectGrade(grade)}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  {grade.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {grade.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {grade.subjects.length} وحدات دراسية
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:text-white">
                  ابدأ الاختبار
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeSelection;