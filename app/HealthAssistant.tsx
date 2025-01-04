import React, { useState } from "react";
import SimliVapi from "./SimliVapi";
import { 
  Brain, Heart, ShieldCheck, 
  Stethoscope, FileText, Clipboard, 
 Waves, 
  Activity, Clock, 
  ArrowRight, Check, X
} from "lucide-react";

interface HealthAIAssistantProps {
  simli_faceid: string;
  vapi_agentid: string;
}

const HealthAIAssistant: React.FC<HealthAIAssistantProps> = ({ simli_faceid, vapi_agentid }) => {
  const [showDottedFace, setShowDottedFace] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'diagnosis' | 'consultation'>('overview');

  const patientProfile = {
    name: "Patient Name 1",
    age: 35,
    gender: "Female",
    lastCheckup: "1 month ago"
  };

  const healthMetrics = [
    { 
      icon: <Heart className="w-6 h-6 text-emerald-400" />, 
      label: "Heart Rate", 
      value: "72 bpm", 
      status: "Normal" 
    },
    { 
      icon: <Waves className="w-6 h-6 text-cyan-400" />, 
      label: "Respiratory Rate", 
      value: "16 breaths/min", 
      status: "Healthy" 
    },
    { 
      icon: <Activity className="w-6 h-6 text-indigo-400" />, 
      label: "Blood Pressure", 
      value: "120/80 mmHg", 
      status: "Optimal" 
    }
  ];

  const aiRecommendations = [
    {
      title: "Preventive Health",
      description: "Annual wellness screening recommended",
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />
    },
    {
      title: "Lifestyle Optimization",
      description: "Personalized nutrition and exercise plan",
      icon: <Brain className="w-5 h-5 text-teal-400" />
    }
  ];

  const onStart = () => {
    setShowDottedFace(false);
  };

  const onClose = () => {
    setShowDottedFace(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex">
      {/* Left Sidebar - Patient Profile & Metrics */}
      <div className="w-72 bg-neutral-900/70 p-6 space-y-6 border-r border-neutral-800">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-neutral-800 rounded-full mb-4 flex items-center justify-center">
            <Stethoscope className="w-12 h-12 text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-100">{patientProfile.name}</h2>
          <p className="text-neutral-400">{patientProfile.age} • {patientProfile.gender}</p>
          <p className="text-sm text-neutral-500 mt-2">Last Medical Checkup: {patientProfile.lastCheckup}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-neutral-200 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-cyan-400" />
            Health Metrics
          </h3>
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-neutral-800 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {metric.icon}
                <div>
                  <p className="text-sm text-neutral-300">{metric.label}</p>
                  <p className="font-semibold">{metric.value}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full 
                ${metric.status === 'Normal' ? 'bg-emerald-500/20 text-emerald-400' : 
                  metric.status === 'Healthy' ? 'bg-cyan-500/20 text-cyan-400' : 
                  'bg-amber-500/20 text-amber-400'}`}>
                {metric.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Central AI Assistant */}
      <div className="flex-grow flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full border-4 border-neutral-800/50 overflow-hidden relative">
            <SimliVapi
              agentId={vapi_agentid}
              simli_faceid={simli_faceid}
              onStart={onStart}
              onClose={onClose}
              showDottedFace={showDottedFace}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 pb-6">
          {['overview', 'diagnosis', 'consultation'].map((section) => (
            <button 
              key={section}
              onClick={() => setActiveSection(section as any)}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all
                ${activeSection === section 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
            >
              {section === 'overview' && <FileText className="w-4 h-4" />}
              {section === 'diagnosis' && <Clipboard className="w-4 h-4" />}
              {section === 'consultation' && <Stethoscope className="w-4 h-4" />}
              <span className="capitalize">{section}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Sidebar - AI Recommendations */}
      <div className="w-72 bg-neutral-900/70 p-6 space-y-6 border-l border-neutral-800">
        <div>
          <h3 className="font-semibold text-neutral-200 flex items-center mb-4">
            <Brain className="w-5 h-5 mr-2 text-teal-400" />
            AI Recommendations
          </h3>
          {aiRecommendations.map((rec, index) => (
            <div 
              key={index} 
              className="bg-neutral-800 rounded-lg p-4 mb-4 flex items-center space-x-4 hover:bg-neutral-700/50 transition-colors"
            >
              {rec.icon}
              <div className="flex-grow">
                <h4 className="font-medium text-neutral-200">{rec.title}</h4>
                <p className="text-sm text-neutral-400">{rec.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full
                ${rec.priority === 'High' 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-amber-500/20 text-amber-400'}`}>
                {rec.priority}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg flex items-center justify-between px-4">
            Start AI Consultation <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex space-x-2">
            <button className="flex-grow bg-neutral-800 hover:bg-neutral-700 text-neutral-100 py-3 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 mr-2" /> Accept
            </button>
            <button className="flex-grow bg-neutral-800 hover:bg-neutral-700 text-neutral-100 py-3 rounded-lg flex items-center justify-center">
              <X className="w-5 h-5 mr-2" /> Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthAIAssistant;