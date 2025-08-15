
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Sun, Moon } from 'lucide-react';

import GradeSelection from '@/components/GradeSelection';
import SubjectSelection from '@/components/SubjectSelection';
import QuizView from '@/components/QuizView';
import AppFooter from '@/components/AppFooter';
import WelcomeHeader from '@/components/WelcomeHeader';
import { gradesData, questionsData } from '@/lib/data';

const App = () => {
  const [currentView, setCurrentView] = useState('grades');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setCurrentView('subjects');
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentView('quiz');
  };

  const goBack = () => {
    if (currentView === 'quiz') {
      setCurrentView('subjects');
    } else if (currentView === 'subjects') {
      setCurrentView('grades');
    }
  };

  const resetQuiz = () => {
    setCurrentView('subjects');
  };


  return (
    <div className={`font-arabic min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="bg-white/20 dark:bg-gray-800/30 border-white/30 dark:border-gray-700/50 text-white dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'grades' && (
            <>
              <WelcomeHeader />
              <GradeSelection 
                grades={gradesData} 
                onSelectGrade={handleGradeSelect} 
              />
            </>
          )}
          {currentView === 'subjects' && selectedGrade && (
            <SubjectSelection
              grade={selectedGrade}
              onSelectSubject={handleSubjectSelect}
              onGoBack={goBack}
              questionsData={questionsData}
            />
          )}
          {currentView === 'quiz' && selectedSubject && selectedGrade && (
            <QuizView
              subject={selectedSubject}
              questions={questionsData[selectedSubject] || []}
              onGoBack={goBack}
              onQuizComplete={resetQuiz}
            />
          )}
        </AnimatePresence>
      </div>
      <AppFooter />
      <Toaster />
    </div>
  );
};

export default App;
