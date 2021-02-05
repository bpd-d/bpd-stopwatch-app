export function useAudioContext(): AudioContext {
    const AudioContext = window.AudioContext;
    return new AudioContext();
}