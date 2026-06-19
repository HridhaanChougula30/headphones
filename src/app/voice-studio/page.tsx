import VoiceStudio from '@/components/VoiceStudio';

export const metadata = {
  title: 'Voice Clone Studio - Multi-Language AI Voice Synthesis',
  description: 'Record your voice and synthesize it in 100+ languages with our premium AI voice cloning studio.',
};

export default function VoiceStudioPage() {
  return (
    <main className="min-h-screen bg-gradient-obsidian">
      <VoiceStudio />
    </main>
  );
}
