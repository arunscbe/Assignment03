import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Shell } from '../components/Layout/Shell';

// Pages
import Dashboard from '../pages/Dashboard';
import TextToText from '../pages/TextToText';
import ImageToText from '../pages/ImageToText';
import AudioToText from '../pages/AudioToText';
import TextToAudio from '../pages/TextToAudio';
import TextToImage from '../pages/TextToImage';

const AppRouter = () => {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/text-to-text" element={<TextToText />} />
        <Route path="/image-to-text" element={<ImageToText />} />
        <Route path="/audio-to-text" element={<AudioToText />} />
        <Route path="/text-to-audio" element={<TextToAudio />} />
        <Route path="/text-to-image" element={<TextToImage />} />
        {/* Fallback */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Shell>
  );
};

export default AppRouter;
