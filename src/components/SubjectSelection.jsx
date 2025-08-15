import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SubjectSelection = ({ grade, onSelectSubject, onGoBack, questionsData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubjectClick = (subject) => {
    if (questionsData[subject] && questionsData[subject].length > 0) {
      onSelectSubject(subject);
    } else {
      toast({
        title: "🚧 هذه المادة غير متوفرة حالياً",
        description: "يمكنك طلب إضافة أسئلة لهذه المادة في الرسالة التالية! 🚀",
      });
    }
  };
  
  return (
// تغيير className للعنصر الرئيسي ليصبح:
<div className="min-h-screen gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900 p-4 sm:p-6 pt-20 sm:pt-24">      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            onClick={onGoBack}
            variant="outline"
            className="mb-6 bg-white/20 dark:bg-gray-800/30 border-white/30 dark:border-gray-700/50 text-white dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للصفوف
          </Button>
          
          <h1 className="text-4xl font-bold text-white dark:text-gray-100 mb-2">
            {grade.name}
          </h1>
          <p className="text-xl text-white/90 dark:text-gray-300 mb-8">
            اختر الوحدة التي تريد اختبار معلوماتك فيها من القائمة أدناه:
          </p>
        </motion.div>

        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full"
            >
              <Button 
                variant="outline" 
                className="w-full justify-between text-lg p-6 bg-white/20 dark:bg-gray-800/30 border-white/30 dark:border-gray-700/50 text-white dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/50"
              >
                <span>اختر وحدة</span>
                {isDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-[calc(100%-2rem)] md:w-[580px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto">
            {grade.subjects.map((subject, index) => (
              <DropdownMenuItem 
                key={subject} 
                onClick={() => handleSubjectClick(subject)}
                className="p-4 text-md cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/50 focus:bg-white/30 dark:focus:bg-gray-700/50"
              >
                <BookOpen className="w-5 h-5 ml-3 text-teal-500 dark:text-teal-400" />
                <span>{subject}</span>
                <span className="mr-auto text-xs text-gray-500 dark:text-gray-400 pl-2">
                  ({questionsData[subject] ? `${questionsData[subject].length} سؤال` : 'قريباً'})
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SubjectSelection;