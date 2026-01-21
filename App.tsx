import React, { useState, useEffect } from 'react';
import { AppScreen, TvModel } from './types';
import HomeScreen from './components/HomeScreen';
import ArMeasureStep1 from './components/ArMeasureStep1';
import ArMeasureStep2 from './components/ArMeasureStep2';
import ArMeasureStep3 from './components/ArMeasureStep3';
import AnalysisResult from './components/AnalysisResult';
import TvSelection from './components/TvSelection';
import FinalResult from './components/FinalResult';
import LandscapeView from './components/LandscapeView';
import { supabase } from './src/lib/supabase';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);

  // Lifted state for TV selection
  const [selectedSize, setSelectedSize] = useState(65);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [tvModels, setTvModels] = useState<TvModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTvModels() {
      try {
        const { data, error } = await supabase
          .from('tv_models')
          .select('*')
          .order('price', { ascending: true }); // Example ordering

        if (error) {
          console.error('Error fetching models:', error);
          return;
        }

        if (data) {
          // Map DB columns (snake_case) to Frontend types (camelCase)
          const mappedModels: TvModel[] = data.map(item => ({
            id: item.id,
            name: item.name,
            subtext: item.subtext,
            price: item.price,
            image: item.image,
            tag: item.tag,
            tagColor: item.tag_color,
            bestDist: item.best_dist,
            isPopular: item.is_popular,
            isBestValue: item.is_best_value,
            specs: item.specs
          }));

          setTvModels(mappedModels);

          if (mappedModels.length > 0 && !selectedModelId) {
            setSelectedModelId(mappedModels[0].id);
          }
        }
      } catch (e) {
        console.error('Unexpected error:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchTvModels();
  }, []);

  const navigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const currentModel = tvModels.find(m => m.id === selectedModelId) || tvModels[0];

  return (
    <div className="relative w-full h-[100dvh] bg-background-light dark:bg-background-dark overflow-hidden mx-auto max-w-[390px] shadow-2xl flex flex-col">
      {currentScreen === AppScreen.HOME && <HomeScreen onNavigate={navigate} />}
      {currentScreen === AppScreen.AR_STEP_1 && <ArMeasureStep1 onNavigate={navigate} />}
      {currentScreen === AppScreen.AR_STEP_2 && (
        <ArMeasureStep2
          onNavigate={navigate}
          onCapture={(img) => setCapturedImage(img)}
        />
      )}
      {/* Step 3 was merged into Step 2 */}

      {currentScreen === AppScreen.ANALYSIS_RESULT && (
        <AnalysisResult
          onNavigate={navigate}
          capturedImage={capturedImage}
        />
      )}

      {currentScreen === AppScreen.TV_SELECTION && (
        <TvSelection
          onNavigate={navigate}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedModelId={selectedModelId}
          setSelectedModelId={setSelectedModelId}
          tvModels={tvModels}
        />
      )}

      {currentScreen === AppScreen.SIMULATION_RESULT && currentModel && (
        <FinalResult
          onNavigate={navigate}
          selectedSize={selectedSize}
          model={currentModel}
          backgroundImage={capturedImage}
        />
      )}

      {currentScreen === AppScreen.LANDSCAPE_PREVIEW && currentModel && (
        <LandscapeView
          onNavigate={navigate}
          selectedSize={selectedSize}
          model={currentModel}
          backgroundImage={capturedImage}
        />
      )}
    </div>
  );
};

export default App;