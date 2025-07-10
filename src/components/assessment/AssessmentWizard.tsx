
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Camera, Palette, Pen, Video } from 'lucide-react';

interface AssessmentWizardProps {
  onComplete: (profile: any) => void;
}

const creativeFields = [
  { id: 'photography', name: 'Photography', icon: Camera, description: 'Capture moments and tell stories' },
  { id: 'illustration', name: 'Illustration', icon: Pen, description: 'Create visual narratives and artwork' },
  { id: 'design', name: 'Graphic Design', icon: Palette, description: 'Design visual communications' },
  { id: 'video', name: 'Video Production', icon: Video, description: 'Create and edit video content' },
];

const skillQuestions = {
  photography: [
    {
      question: "How familiar are you with manual camera settings?",
      options: ["Complete beginner", "Know the basics", "Comfortable with most settings", "Expert level"]
    },
    {
      question: "Which composition techniques do you use regularly?",
      options: ["None", "Rule of thirds", "Leading lines, symmetry", "Advanced techniques like golden ratio"]
    }
  ],
  illustration: [
    {
      question: "What's your experience with digital illustration tools?",
      options: ["Never used them", "Basic familiarity", "Regular user", "Professional level"]
    },
    {
      question: "How comfortable are you with color theory?",
      options: ["What's color theory?", "Basic understanding", "Good grasp", "Advanced knowledge"]
    }
  ],
  design: [
    {
      question: "How familiar are you with design software?",
      options: ["Never used professional tools", "Basic Canva/simple tools", "Adobe Creative Suite basics", "Advanced user"]
    },
    {
      question: "Understanding of typography principles?",
      options: ["What's typography?", "Basic font selection", "Good understanding", "Typography expert"]
    }
  ],
  video: [
    {
      question: "Experience with video editing software?",
      options: ["Complete beginner", "Basic editing", "Intermediate skills", "Professional editor"]
    },
    {
      question: "Understanding of video storytelling?",
      options: ["Just record and post", "Basic story structure", "Good narrative sense", "Expert storyteller"]
    }
  ]
};

export const AssessmentWizard = ({ onComplete }: AssessmentWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [skillAnswers, setSkillAnswers] = useState<Record<string, number[]>>({});
  const [learningGoals, setLearningGoals] = useState('');
  const [timeCommitment, setTimeCommitment] = useState(3);

  const steps = ['Creative Fields', 'Skill Assessment', 'Goals & Time'];

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleSkillAnswer = (fieldId: string, questionIndex: number, answerIndex: number) => {
    setSkillAnswers(prev => ({
      ...prev,
      [fieldId]: {
        ...prev[fieldId],
        [questionIndex]: answerIndex
      }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedFields.length > 0;
      case 1:
        return selectedFields.every(field => 
          skillQuestions[field as keyof typeof skillQuestions]?.every((_, index) => 
            skillAnswers[field]?.[index] !== undefined
          )
        );
      case 2:
        return learningGoals.trim().length > 0;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    const profile = {
      creativeFields: selectedFields,
      skillLevels: selectedFields.reduce((acc, field) => {
        const answers = skillAnswers[field] || [];
        const avgScore = answers.reduce((sum, score) => sum + score, 0) / answers.length;
        const levels = ['beginner', 'beginner', 'intermediate', 'advanced'];
        acc[field] = levels[Math.floor(avgScore)] || 'beginner';
        return acc;
      }, {} as Record<string, string>),
      learningGoals: learningGoals.split(',').map(goal => goal.trim()).filter(Boolean),
      availableTimePerWeek: timeCommitment,
    };
    
    onComplete(profile);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Creative Fields</h2>
              <p className="text-gray-600">Select the areas you're interested in or currently working with</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {creativeFields.map((field) => {
                const Icon = field.icon;
                const isSelected = selectedFields.includes(field.id);
                
                return (
                  <div
                    key={field.id}
                    onClick={() => handleFieldToggle(field.id)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{field.name}</h3>
                        <p className="text-gray-600 text-sm">{field.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Assess Your Skills</h2>
              <p className="text-gray-600">Help us understand your current level in each field</p>
            </div>
            
            <div className="space-y-8">
              {selectedFields.map((fieldId) => {
                const field = creativeFields.find(f => f.id === fieldId);
                const questions = skillQuestions[fieldId as keyof typeof skillQuestions];
                
                return (
                  <div key={fieldId} className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{field?.name}</h3>
                    
                    <div className="space-y-6">
                      {questions?.map((q, qIndex) => (
                        <div key={qIndex} className="space-y-3">
                          <h4 className="font-medium text-gray-800">{q.question}</h4>
                          <div className="space-y-2">
                            {q.options.map((option, oIndex) => {
                              const isSelected = skillAnswers[fieldId]?.[qIndex] === oIndex;
                              
                              return (
                                <label
                                  key={oIndex}
                                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                    isSelected
                                      ? 'border-blue-500 bg-blue-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`${fieldId}-${qIndex}`}
                                    checked={isSelected}
                                    onChange={() => handleSkillAnswer(fieldId, qIndex, oIndex)}
                                    className="sr-only"
                                  />
                                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                  }`}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                                  </div>
                                  <span className="text-gray-700">{option}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Set Your Goals</h2>
              <p className="text-gray-600">Tell us what you want to achieve and how much time you can commit</p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  What specific skills or techniques do you want to learn? (comma-separated)
                </label>
                <textarea
                  value={learningGoals}
                  onChange={(e) => setLearningGoals(e.target.value)}
                  placeholder="e.g., portrait lighting, digital painting, logo design"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  How many hours per week can you dedicate to learning?
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">{timeCommitment}</span>
                    <span className="text-gray-600 ml-1">hours per week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                  index <= currentStep
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ml-4 ${
                    index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white shadow-md'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleComplete();
              } else {
                setCurrentStep(prev => prev + 1);
              }
            }}
            disabled={!canProceed()}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md ${
              canProceed()
                ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:from-blue-700 hover:to-orange-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
