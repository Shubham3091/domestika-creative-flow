
import { useState } from 'react';
import { AssessmentWizard } from '@/components/assessment/AssessmentWizard';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { FeedbackUpload } from '@/components/feedback/FeedbackUpload';
import { CommunityHub } from '@/components/community/CommunityHub';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'assessment' | 'feedback' | 'community'>('dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  const handleAssessmentComplete = (profile: any) => {
    setUserProfile(profile);
    setHasCompletedAssessment(true);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    if (!hasCompletedAssessment && currentView === 'dashboard') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Your Creative Journey 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                  {" "}Starts Here
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get personalized guidance, AI-powered feedback, and connect with a community of creatives
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="text-left space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">What you'll discover:</h2>
                <div className="grid gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Personalized Learning Path</h3>
                      <p className="text-gray-600">Custom recommendations based on your skills and goals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">AI-Powered Feedback</h3>
                      <p className="text-gray-600">Get detailed critiques and improvement suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Creative Community</h3>
                      <p className="text-gray-600">Connect with peers and find mentors in your field</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setCurrentView('assessment')}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Your Assessment
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'assessment':
        return <AssessmentWizard onComplete={handleAssessmentComplete} />;
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      case 'feedback':
        return <FeedbackUpload userProfile={userProfile} />;
      case 'community':
        return <CommunityHub userProfile={userProfile} />;
      default:
        return <Dashboard userProfile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {hasCompletedAssessment && (
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
      )}
      {renderContent()}
    </div>
  );
};

export default Index;
