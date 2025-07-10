
import { useState, useEffect } from 'react';
import { Trophy, Target, Clock, TrendingUp, Star, BookOpen, Users, Camera } from 'lucide-react';

interface DashboardProps {
  userProfile: any;
}

export const Dashboard = ({ userProfile }: DashboardProps) => {
  const [journeyData, setJourneyData] = useState<any>(null);

  useEffect(() => {
    if (userProfile) {
      // Generate personalized journey based on user profile
      const mockJourney = generatePersonalizedJourney(userProfile);
      setJourneyData(mockJourney);
    }
  }, [userProfile]);

  const generatePersonalizedJourney = (profile: any) => {
    const primaryField = profile.creativeFields[0];
    const skillLevel = profile.skillLevels[primaryField];
    
    const journeyMap = {
      photography: {
        beginner: {
          phase: 'Foundation Building',
          nextActions: [
            { type: 'course', title: 'Camera Basics & Manual Mode', duration: '2 hours', difficulty: 'beginner' },
            { type: 'practice', title: 'Daily Light Study', duration: '30 min', difficulty: 'beginner' },
            { type: 'community', title: 'Join Photography Basics Group', duration: '5 min', difficulty: 'beginner' }
          ],
          milestones: [
            { title: 'Master Camera Controls', completed: false, progress: 0 },
            { title: 'Understand Composition Rules', completed: false, progress: 0 },
            { title: 'Create First Portfolio', completed: false, progress: 0 }
          ]
        },
        intermediate: {
          phase: 'Skill Refinement',
          nextActions: [
            { type: 'course', title: 'Advanced Portrait Lighting', duration: '3 hours', difficulty: 'intermediate' },
            { type: 'practice', title: 'Style Development Challenge', duration: '1 hour', difficulty: 'intermediate' },
            { type: 'community', title: 'Find a Photography Mentor', duration: '10 min', difficulty: 'intermediate' }
          ],
          milestones: [
            { title: 'Develop Personal Style', completed: false, progress: 30 },
            { title: 'Master Advanced Techniques', completed: false, progress: 0 },
            { title: 'Build Professional Portfolio', completed: false, progress: 15 }
          ]
        }
      },
      design: {
        beginner: {
          phase: 'Design Fundamentals',
          nextActions: [
            { type: 'course', title: 'Design Principles & Color Theory', duration: '2.5 hours', difficulty: 'beginner' },
            { type: 'practice', title: 'Logo Design Challenge', duration: '45 min', difficulty: 'beginner' },
            { type: 'community', title: 'Connect with Design Students', duration: '5 min', difficulty: 'beginner' }
          ],
          milestones: [
            { title: 'Understand Design Principles', completed: false, progress: 0 },
            { title: 'Master Typography Basics', completed: false, progress: 0 },
            { title: 'Create First Brand Identity', completed: false, progress: 0 }
          ]
        }
      }
    };

    return journeyMap[primaryField as keyof typeof journeyMap]?.[skillLevel] || journeyMap.photography.beginner;
  };

  if (!userProfile || !journeyData) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  const statsCards = [
    { icon: Target, label: 'Skills Learning', value: userProfile.creativeFields.length, color: 'blue' },
    { icon: Trophy, label: 'Achievements', value: '3', color: 'orange' },
    { icon: Clock, label: 'Hours/Week', value: userProfile.availableTimePerWeek, color: 'green' },
    { icon: TrendingUp, label: 'Progress', value: '67%', color: 'purple' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Creative!</h1>
        <p className="text-blue-100 text-lg">
          You're in the <span className="font-semibold">{journeyData.phase}</span> phase of your journey
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            orange: 'bg-orange-100 text-orange-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600'
          };
          
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Next Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-orange-500" />
              Recommended Next Steps
            </h2>
            
            <div className="space-y-4">
              {journeyData.nextActions.map((action: any, index: number) => {
                const actionIcons = {
                  course: BookOpen,
                  practice: Camera,
                  community: Users
                };
                const ActionIcon = actionIcons[action.type as keyof typeof actionIcons];
                
                return (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="p-2 bg-white rounded-lg mr-4">
                      <ActionIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.duration} • {action.difficulty}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Start
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Milestones */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Journey Milestones</h2>
            
            <div className="space-y-4">
              {journeyData.milestones.map((milestone: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                    <span className="text-sm text-gray-600">{milestone.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Goals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4">Your Learning Goals</h3>
            <div className="space-y-3">
              {userProfile.learningGoals.slice(0, 3).map((goal: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4">Your Creative Profile</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Primary Field</span>
                <span className="text-sm font-medium capitalize">{userProfile.creativeFields[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Skill Level</span>
                <span className="text-sm font-medium capitalize">{userProfile.skillLevels[userProfile.creativeFields[0]]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Fields</span>
                <span className="text-sm font-medium">{userProfile.creativeFields.length}</span>
              </div>
            </div>
          </div>

          {/* Community Highlight */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <Users className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="font-semibold text-orange-900">Community</h3>
            </div>
            <p className="text-sm text-orange-800 mb-4">
              Connect with 2,847 creatives in your field
            </p>
            <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Find Your Tribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
