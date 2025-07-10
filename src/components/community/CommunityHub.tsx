
import { useState } from 'react';
import { Users, MessageCircle, Star, Search, Filter, UserPlus, Award, Bookmark } from 'lucide-react';

interface CommunityHubProps {
  userProfile: any;
}

export const CommunityHub = ({ userProfile }: CommunityHubProps) => {
  const [activeTab, setActiveTab] = useState<'peers' | 'mentors' | 'groups'>('peers');

  // Mock data based on user profile
  const mockPeers = [
    {
      id: 1,
      name: 'Sarah Chen',
      field: 'Photography',
      level: 'Beginner',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=100&h=100&fit=crop&crop=face',
      commonInterests: ['Portrait Photography', 'Street Photography'],
      recentWork: 'https://images.unsplash.com/photo-1616587226157-48e49175ee20?w=300&h=200&fit=crop',
      matchScore: 92
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      field: 'Photography',
      level: 'Intermediate',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      commonInterests: ['Landscape Photography', 'Drone Photography'],
      recentWork: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      matchScore: 87
    },
    {
      id: 3,
      name: 'Emma Thompson',
      field: 'Photography',
      level: 'Beginner',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      commonInterests: ['Portrait Photography', 'Fashion Photography'],
      recentWork: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop',
      matchScore: 85
    }
  ];

  const mockMentors = [
    {
      id: 1,
      name: 'David Park',
      field: 'Photography',
      experience: '15 years',
      specialties: ['Commercial Photography', 'Lighting', 'Post-Processing'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 4.9,
      studentsHelped: 127,
      bio: 'Award-winning commercial photographer with expertise in studio lighting and brand photography.',
      availability: 'Available for 1-on-1 sessions'
    },
    {
      id: 2,
      name: 'Lisa Zhang',
      field: 'Photography',
      experience: '12 years',
      specialties: ['Portrait Photography', 'Natural Light', 'Posing'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      studentsHelped: 89,
      bio: 'Specializing in natural light portraits and helping photographers develop their unique style.',
      availability: 'Group sessions available'
    }
  ];

  const mockGroups = [
    {
      id: 1,
      name: 'Photography Beginners Circle',
      members: 234,
      category: 'Skill Level',
      description: 'A supportive community for photographers just starting their journey',
      lastActivity: '2 hours ago',
      isJoined: false
    },
    {
      id: 2,
      name: 'Portrait Lighting Masters',
      members: 156,
      category: 'Technique',
      description: 'Advanced discussions on portrait lighting techniques and setups',
      lastActivity: '4 hours ago',
      isJoined: true
    },
    {
      id: 3,
      name: 'Street Photography Society',
      members: 445,
      category: 'Genre',
      description: 'Share street photography work and discuss urban photography techniques',
      lastActivity: '1 day ago',
      isJoined: false
    }
  ];

  const renderPeers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recommended Peers</h3>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div className="grid gap-6">
          {mockPeers.map((peer) => (
            <div key={peer.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <img
                src={peer.avatar}
                alt={peer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{peer.name}</h4>
                    <p className="text-sm text-gray-600">{peer.field} • {peer.level}</p>
                    <p className="text-sm text-gray-500">{peer.location}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{peer.matchScore}% match</span>
                    </div>
                    <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors">
                      <UserPlus className="w-3 h-3" />
                      <span>Connect</span>
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Common interests:</p>
                  <div className="flex flex-wrap gap-1">
                    {peer.commonInterests.map((interest, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                {peer.recentWork && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Recent work:</p>
                    <img
                      src={peer.recentWork}
                      alt="Recent work"
                      className="w-24 h-16 rounded object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMentors = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Find a Mentor</h3>
        
        <div className="grid gap-6">
          {mockMentors.map((mentor) => (
            <div key={mentor.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{mentor.name}</h4>
                      <p className="text-gray-600">{mentor.experience} experience in {mentor.field}</p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{mentor.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{mentor.studentsHelped} students helped</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-600">Verified Mentor</span>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all">
                        Request Mentorship
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mt-3">{mentor.bio}</p>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-green-800 text-sm">{mentor.availability}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Join Creative Communities</h3>
        
        <div className="grid gap-4">
          {mockGroups.map((group) => (
            <div key={group.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">{group.name}</h4>
                    <p className="text-sm text-gray-600">{group.description}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{group.members} members</span>
                      <span>•</span>
                      <span>{group.category}</span>
                      <span>•</span>
                      <span>Active {group.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {group.isJoined ? (
                  <>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Joined
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join Group
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'peers', label: 'Find Peers', icon: Users },
    { id: 'mentors', label: 'Find Mentors', icon: Award },
    { id: 'groups', label: 'Join Groups', icon: MessageCircle }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Creative Community</h1>
        <p className="text-lg text-gray-600">
          Connect with fellow creatives, find mentors, and join communities in your field
        </p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-gray-600">Active Creatives</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">156</div>
            <div className="text-gray-600">Available Mentors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">43</div>
            <div className="text-gray-600">Active Groups</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'peers' && renderPeers()}
      {activeTab === 'mentors' && renderMentors()}
      {activeTab === 'groups' && renderGroups()}
    </div>
  );
};
