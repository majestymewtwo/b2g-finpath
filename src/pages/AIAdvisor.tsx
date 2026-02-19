import { useEffect, useRef, useState } from "react";
import { Mic, Check, RotateCcw } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const SpeechRecognition =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition;

const AIAdvisor = () => {
  const [isListening, setIsListening] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setHasStopped(false);
    };

    recognition.onresult = (event: any) => {
      let liveText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        liveText += event.results[i][0].transcript;
      }
      setTranscript(liveText);
    };

    recognition.onend = () => {
      setIsListening(false);
      setHasStopped(true);
    };

    recognitionRef.current = recognition;
  }, []);

  // 🔥 Stop speech when tab changes or component unmounts
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentWordIndex(null);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      speechSynthesis.cancel();
    };
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return;
    speechSynthesis.cancel(); // stop speaking if recording again
    setIsSpeaking(false);
    setTranscript("");
    setAiResponse("");
    setHasStopped(false);
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  const retake = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setTranscript("");
    setAiResponse("");
    setHasStopped(false);
    setCurrentWordIndex(null);
    startRecording();
  };

  const generateInsight = async () => {
    if (!transcript.trim()) return;

    setIsGenerating(true);
    setAiResponse("");
    setCurrentWordIndex(null);

    try {
      const response = await fetch("https://muthu-victus:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: transcript }),
      });

      const data = await response.json();
      setAiResponse(data.reply);
      speakResponse(data.reply);
    } catch (error) {
      alert("Failed to fetch response from server");
      console.error("Error generating insight", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const speakResponse = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;

    const words = text.split(" ");

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onboundary = (event: any) => {
      if (event.name === "word") {
        const charIndex = event.charIndex;

        let runningLength = 0;
        for (let i = 0; i < words.length; i++) {
          runningLength += words[i].length + 1;
          if (runningLength > charIndex) {
            setCurrentWordIndex(i);
            break;
          }
        }
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(null);
    };

    speechSynthesis.cancel(); // cancel any previous speech
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentWordIndex(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-border">
        <h1 className="font-bold text-foreground text-lg">
          Voice Financial Advisor
        </h1>
        <p className="text-xs text-primary font-medium">
          {isListening
            ? "Listening..."
            : hasStopped
            ? "Review your speech"
            : "Tap mic to start"}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {transcript && (
          <div className="w-full bg-muted/50 border border-border rounded-2xl p-5 text-foreground text-sm leading-relaxed">
            {transcript}
          </div>
        )}

        {aiResponse && (
          <div className="w-full bg-primary/10 border border-primary/20 rounded-2xl p-5 text-foreground text-sm leading-relaxed">
            {aiResponse.split(" ").map((word, index) => (
              <span
                key={index}
                className={`transition-all duration-150 ${
                  index === currentWordIndex
                    ? "bg-primary text-primary-foreground px-1 rounded"
                    : ""
                }`}
              >
                {word + " "}
              </span>
            ))}
          </div>
        )}

        {isGenerating && (
          <div className="text-xs text-muted-foreground animate-pulse">
            Generating insight...
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="px-6 pb-6 flex justify-center gap-4">
        {!isListening && !hasStopped && (
          <button
            onClick={startRecording}
            className="w-16 h-16 rounded-2xl flex items-center justify-center gradient-primary text-primary-foreground transition-all duration-300"
          >
            <Mic className="w-6 h-6" />
          </button>
        )}

        {isListening && (
          <button
            onClick={stopRecording}
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-500 text-white animate-pulse transition-all duration-300"
          >
            <Mic className="w-6 h-6" />
          </button>
        )}

        {!isListening && hasStopped && (
          <>
            <button
              onClick={generateInsight}
              className="w-16 h-16 rounded-2xl flex items-center justify-center bg-green-500 text-white transition-all duration-300"
            >
              <Check className="w-6 h-6" />
            </button>

            <button
              onClick={retake}
              className="w-16 h-16 rounded-2xl flex items-center justify-center bg-yellow-500 text-white transition-all duration-300"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </>
        )}

        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-600 text-white transition-all duration-300"
          >
            Stop
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default AIAdvisor;
