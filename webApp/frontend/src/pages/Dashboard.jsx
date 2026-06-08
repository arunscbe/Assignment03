import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Image as ImageIcon,
  Mic2,
  Volume2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';

const stats = [
  { name: 'Total Requests', value: '1,284', change: '+12.5%', icon: TrendingUp, color: 'text-blue-500' },
  { name: 'Success Rate', value: '99.2%', change: '+0.4%', icon: CheckCircle2, color: 'text-green-500' },
  { name: 'Avg Resp Time', value: '450ms', change: '-24ms', icon: Clock, color: 'text-purple-500' },
];

const tools = [
  { name: 'Text To Text', description: 'Advanced conversational AI for complex reasoning.', icon: MessageSquare, path: '/text-to-text', color: 'bg-blue-500' },
  { name: 'Image To Text', description: 'Get detailed descriptions from any visual input.', icon: ImageIcon, path: '/image-to-text', color: 'bg-indigo-500' },
  { name: 'Audio To Text', description: 'Highly accurate speech-to-text transcription.', icon: Mic2, path: '/audio-to-text', color: 'bg-emerald-500' },
  { name: 'Text To Audio', description: 'Convert written text into natural-sounding speech.', icon: Volume2, path: '/text-to-audio', color: 'bg-orange-500' },
  { name: 'Text To Image', description: 'Generate stunning visuals from text prompts.', icon: Sparkles, path: '/text-to-image', color: 'bg-pink-500' },
];

const Dashboard = () => {
  return (
    <div className="space-y-10">

      {/* Stats Grid */}


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tools Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link to={tool.path}>
                  <Card className="h-full hover:border-primary-500/50 transition-colors">
                    <div className={`${tool.color} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-4`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold mb-1">{tool.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
