
import { useState, useRef } from 'react';
import { Upload, Camera, Image, MessageSquare, TrendingUp, Palette, Eye } from 'lucide-react';

interface FeedbackUploadProps {
  userProfile: any;
}

interface FeedbackResult {
  overall: string;
  technical: { score: number; feedback: string };
  creative: { score: number; feedback: string };
  composition: { score: number; feedback: string };
  suggestions: string[];
}

export const FeedbackUpload = ({ userProfile }: FeedbackUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFeedback(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const generateMockFeedback = (): FeedbackResult => {
    const primaryField = userProfile?.creativeFields[0] || 'photography';
    
    const feedbackTemplates = {
      photography: {
        overall: "This is a compelling image with strong visual impact. Your technical execution shows good understanding of fundamental principles, and there are several areas where small adjustments could elevate the work significantly.",
        technical: {
          score: Math.floor(Math.random() * 3) + 7, // 7-9
          feedback: "Your exposure is well-balanced with good detail retention in both highlights and shadows. The focus is sharp where it needs to be, though consider experimenting with different aperture settings for more creative depth of field effects."
        },
        creative: {
          score: Math.floor(Math.random() * 2) + 8, // 8-9
          feedback: "The subject matter is engaging and you've captured an interesting moment. Your perspective shows creative thinking, and the emotional content comes through clearly."
        },
        composition: {
          score: Math.floor(Math.random() * 3) + 6, // 6-8
          feedback: "Good use of leading lines to draw the viewer's eye. The rule of thirds is applied effectively, though experimenting with more dynamic compositions could add additional visual interest."
        },
        suggestions: [
          "Try shooting during golden hour for warmer, more flattering light",
          "Experiment with different angles - get lower or higher for more dramatic perspectives",
          "Consider the background more carefully to avoid distracting elements",
          "Play with foreground elements to add depth and layers to your composition"
        ]
      },
      design: {
        overall: "Your design demonstrates solid understanding of visual hierarchy and brand principles. The concept is clear and the execution is clean, with room for refinement in a few key areas.",
        technical: {
          score: Math.floor(Math.random() * 2) + 7, // 7-8
          feedback: "Typography choices are appropriate and readable. Color contrast meets accessibility standards, and the overall technical execution is sound."
        },
        creative: {
          score: Math.floor(Math.random() * 3) + 7, // 7-9
          feedback: "The concept is original and well-suited to the brief. Your creative choices support the message effectively and show personality."
        },
        composition: {
          score: Math.floor(Math.random() * 2) + 8, // 8-9
          feedback: "Excellent use of white space and visual hierarchy. Elements are well-balanced and the layout guides the viewer's eye naturally through the design."
        },
        suggestions: [
          "Try experimenting with more dynamic color combinations",
          "Consider adding subtle textures or patterns for visual interest",
          "Test the design at different sizes to ensure scalability",
          "Explore variations in typography weight for better emphasis"
        ]
      }
    };

    return feedbackTemplates[primaryField as keyof typeof feedbackTemplates] || feedbackTemplates.photography;
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const mockFeedback = generateMockFeedback();
      setFeedback(mockFeedback);
      setIsAnalyzing(false);
    }, 3000);
  };

  const ScoreCircle = ({ score, label }: { score: number; label: string }) => {
    const circumference = 2 * Math.PI * 20;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 10) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" stroke="#e5e7eb" strokeWidth="4" fill="none" />
            <circle
              cx="22" cy="22" r="20"
              stroke={score >= 8 ? "#10b981" : score >= 6 ? "#f59e0b" : "#ef4444"}
              strokeWidth="4"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{score}</span>
          </div>
        </div>
        <span className="text-sm text-gray-600 mt-2">{label}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Get AI-Powered Feedback</h1>
        <p className="text-lg text-gray-600">
          Upload your creative work and receive detailed analysis and improvement suggestions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Your Work</h2>
            
            {!uploadedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Drop your image here</p>
                <p className="text-gray-500">or click to browse files</p>
                <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Uploaded work"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setPreviewUrl('');
                      setFeedback(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Description (optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about this work, your goals, or specific areas you'd like feedback on..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
                
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    'Get AI Feedback'
                  )}
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="space-y-6">
          {feedback && (
            <>
              {/* Scores */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Overall Scores
                </h3>
                
                <div className="flex justify-around">
                  <ScoreCircle score={feedback.technical.score} label="Technical" />
                  <ScoreCircle score={feedback.creative.score} label="Creative" />
                  <ScoreCircle score={feedback.composition.score} label="Composition" />
                </div>
              </div>

              {/* Detailed Feedback */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                  Detailed Analysis
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Overall Impression</h4>
                    <p className="text-gray-700 leading-relaxed">{feedback.overall}</p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-900 flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          Technical Execution
                        </h4>
                        <span className="text-blue-700 font-bold">{feedback.technical.score}/10</span>
                      </div>
                      <p className="text-blue-800 text-sm">{feedback.technical.feedback}</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-orange-900 flex items-center">
                          <Palette className="w-4 h-4 mr-1" />
                          Creative Vision
                        </h4>
                        <span className="text-orange-700 font-bold">{feedback.creative.score}/10</span>
                      </div>
                      <p className="text-orange-800 text-sm">{feedback.creative.feedback}</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-green-900 flex items-center">
                          <Camera className="w-4 h-4 mr-1" />
                          Composition
                        </h4>
                        <span className="text-green-700 font-bold">{feedback.composition.score}/10</span>
                      </div>
                      <p className="text-green-800 text-sm">{feedback.composition.feedback}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Suggestions for Improvement
                </h3>
                
                <div className="space-y-3">
                  {feedback.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 text-sm font-medium">{index + 1}</span>
                      </div>
                      <p className="text-purple-900 text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Save Feedback & Track Progress
                  </button>
                </div>
              </div>
            </>
          )}
          
          {!feedback && !uploadedFile && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">Ready to get feedback?</h3>
              <p className="text-gray-400">Upload your work to see detailed AI analysis and suggestions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
