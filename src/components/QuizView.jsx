import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { checkImageExists } from '@/lib/utils';

const QuizView = ({ subject, questions, onGoBack, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    if (questions[currentQuestionIndex]?.image) {
      const verifyImage = async () => {
        const exists = await checkImageExists(questions[currentQuestionIndex].image);
        setImageExists(exists);
      };
      verifyImage();
    } else {
      setImageExists(false);
    }
  }, [currentQuestionIndex, questions]);

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900 flex flex-col items-center justify-center p-4 text-white">
        <h2 className="text-3xl font-bold mb-4">لا توجد أسئلة لهذه وحدة  حالياً.</h2>
        <p className="mb-8 text-lg">سيتم إضافة الأسئلة قريباً. يمكنك اختيار وحدة أخرى.</p>
        <Button
          onClick={onGoBack}
          variant="outline"
          className="bg-white/20 dark:bg-gray-800/30 border-white/30 dark:border-gray-700/50 text-white dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          العودة للوحدات
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correct) {
      setScore(score + 1);
      toast({
        title: "🎉 إجابة صحيحة!",
        description: "أحسنت! استمر في التقدم",
      });
    } else {
      toast({
        title: "❌ إجابة خاطئة",
        description: "لا تقلق، تعلم من الأخطاء!",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuizForSubject = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
<div className="min-h-screen gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900 p-4 sm:p-6 pt-20 sm:pt-24">        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            انتهى الاختبار!
          </h2>
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4 score-animation">
            {percentage}%
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            لقد أجبت على {score} من {questions.length} أسئلة بشكل صحيح
          </p>
          <div className="space-y-3">
            <Button
              onClick={resetQuizForSubject}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white"
            >
              <RotateCcw className="w-4 h-4 ml-2" />
              إعادة الاختبار لهذه الوحدة
            </Button>
            <Button
              onClick={onQuizComplete}
              variant="outline"
              className="w-full dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              اختيار وحدة أخرى
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={onGoBack}
            variant="outline"
            className="mb-6 bg-white/20 dark:bg-gray-800/30 border-white/30 dark:border-gray-700/50 text-white dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للوحدات
          </Button>
          
          <div className="bg-white/20 dark:bg-gray-800/40 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center text-white dark:text-gray-200">
              <div>
                <h2 className="text-2xl font-bold">{subject}</h2>
                <p>السؤال {currentQuestionIndex + 1} من {questions.length}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{score}</div>
                <div className="text-sm">النقاط</div>
              </div>
            </div>
            <div className="w-full bg-white/30 dark:bg-gray-700/50 rounded-full h-2 mt-4">
              <div
                className="bg-white dark:bg-gray-300 rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            {currentQuestion.question}
          </h3>

          {currentQuestion.image && (
            <div className="mb-6 flex justify-center">
              {imageExists ? (
                <motion.img
                  src={currentQuestion.image}
                  alt="صورة السؤال"
                  className="max-h-64 max-w-full rounded-lg object-contain shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  onError={() => setImageExists(false)}
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                  الصورة غير متوفرة
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            {currentQuestion.choices.map((choice, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-right rounded-xl border-2 transition-all duration-300 text-gray-700 dark:text-gray-200 ${
                  selectedAnswer === null
                    ? 'border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
                    : selectedAnswer === index
                    ? index === currentQuestion.correct
                      ? 'correct-answer border-green-500 dark:border-green-400'
                      : 'wrong-answer border-red-500 dark:border-red-400'
                    : index === currentQuestion.correct
                    ? 'correct-answer border-green-500 dark:border-green-400 opacity-70'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-full border-2 ${
                    selectedAnswer === null ? 'border-current' :
                    selectedAnswer === index ? (index === currentQuestion.correct ? 'border-white' : 'border-white') :
                    index === currentQuestion.correct ? 'border-white' : 'border-current'
                  } flex items-center justify-center font-bold`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span 
  className="text-lg"
  dangerouslySetInnerHTML={{ __html: choice }}
/>
                </div>
              </motion.button>
            ))}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 text-white"
              >
                {currentQuestionIndex < questions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizView;