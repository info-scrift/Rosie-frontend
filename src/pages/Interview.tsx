
import { useState } from "react"
import axios from "axios"
import { useInterviewVoiceBot } from "@/hooks/useInterviewVoiceBot"
import {
  Mic,
  MicOff,
  ArrowRight,
  FileText,
  Briefcase,
  MessageSquare,
  Award,
  Loader2,
  Play,
  Volume2,
} from "lucide-react"

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

const Interview = () => {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [evaluated, setEvaluated] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [spokenText, setSpokenText] = useState("")
  const [remainingText, setRemainingText] = useState("")
  const [evaluationLoading, setEvaluationLoading] = useState(false)

  const voiceBot = useInterviewVoiceBot()
  console.log("answers are")
  console.log(answers)

  const speak = (text: string, fromPosition = 0) => {
    speechSynthesis.cancel()

    const textToSpeak = text.substring(fromPosition)
    setRemainingText(textToSpeak)
    setSpokenText(text.substring(0, fromPosition))

    if (textToSpeak.trim() === "") return

    const utterance = new SpeechSynthesisUtterance(textToSpeak)

    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      setCurrentUtterance(null)
      setSpokenText("")
      setRemainingText("")
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      setCurrentUtterance(null)
    }

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const currentPosition = fromPosition + event.charIndex
        setSpokenText(text.substring(0, currentPosition))
        setRemainingText(text.substring(currentPosition))
      }
    }

    setCurrentUtterance(utterance)
    speechSynthesis.speak(utterance)
  }

  const pauseSpeaking = () => {
    if (isSpeaking && currentUtterance) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPaused(true)
    }
  }

  const resumeSpeaking = () => {
    if (isPaused) {
      const currentQuestion = questions[currentIndex]
      const resumePosition = spokenText.length
      speak(currentQuestion, resumePosition)
    } else {
      speak(questions[currentIndex])
    }
  }

  const listen = () => {
    if (!voiceBot.isListening) {
      voiceBot.startListening()
    }
  }

  const generateQuestions = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert("Paste resume and job description first.")
      return
    }
    setLoading(true)
    try {
      const prompt = `You are an AI interviewer.Using the following resume and job description, generate exactly 3 interview questions that assess technical and behavioral fit.Resume:${resumeText}Job Description:${jobDescription}Return only the 3 questions in a numbered list from 1 to 3. Do NOT include any introduction, explanation, or summary.Only output the numbered questions. No heading, no conclusion, no other text.`

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are an HR assistant helping evaluate candidates.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
        },
      )

      const content = response.data.choices[0]?.message?.content ?? ""
      const extracted = content
        .split(/\n(?=\d+\.)/)
        .map((line: string) => line.trim())
        .filter(Boolean)

      setQuestions(extracted)
      setInterviewStarted(true)
      speak(extracted[0])
    } catch (err: any) {
      console.error("❌ Error generating questions:", err.response?.data || err.message)
      alert("Failed to generate questions. Check console or API key.")
    }
    setLoading(false)
  }

  const nextQuestion = () => {
    const currentTranscript = voiceBot.transcript.trim()
    const updatedAnswers = [...answers]
    updatedAnswers[currentIndex] = currentTranscript
    setAnswers(updatedAnswers)
    voiceBot.stopListening()
    voiceBot.clearTranscript()

    const isLastQuestion = currentIndex === questions.length - 1
    if (!isLastQuestion) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      speak(questions[nextIndex])
    } else {
      setEvaluationLoading(true)
      setTimeout(() => {
        evaluateInterview(updatedAnswers)
      }, 100)
    }
  }

  const evaluateInterview = async (finalAnswers = answers) => {
    const QnA = questions.map((q, i) => `Q: ${q}\nA: ${finalAnswers[i] || "(no answer)"}`).join("\n\n")
    console.log("the questions with answers are")
    console.log(QnA)

    const prompt = `Evaluate this candidate based on their answers to the interview questions below. Provide only:1. A score out of 1002. A brief summary of their overall performance.${QnA}`

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are an expert interviewer.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
        },
      )

      const evaluation = response.data.choices[0]?.message?.content
      setEvaluated(evaluation)
      setEvaluationLoading(false)
    } catch (err) {
      console.error("❌ Evaluation Error:", err)
      alert("Evaluation failed. Try again.")
      setEvaluationLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 mt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Interview Assistant</h1>
          <p className="text-lg text-gray-600">This is your live AI-powered interview. Answer each question as you would in a real interview setting.</p>
        </div>

        {!interviewStarted && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Resume</h3>
                </div>
                <div className="relative">
                  <textarea
                    rows={8}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                    placeholder="Paste your resume content here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400">{resumeText.length} characters</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Job Description</h3>
                </div>
                <div className="relative">
                  <textarea
                    rows={8}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                    {jobDescription.length} characters
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={generateQuestions}
                disabled={loading || !resumeText.trim() || !jobDescription.trim()}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start AI Interview
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {interviewStarted && questions.length > 0 && !evaluationLoading && !evaluated && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-50 px-8 py-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-full flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{questions[currentIndex]}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={listen}
                    disabled={voiceBot.isListening}
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      voiceBot.isListening
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    }`}
                  >
                    {voiceBot.isListening ? (
                      <>
                        <MicOff className="w-5 h-5" />
                        Listening...
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5" />
                        Start Recording
                      </>
                    )}
                  </button>

                  <button
                    onClick={isSpeaking ? pauseSpeaking : resumeSpeaking}
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isSpeaking
                        ? "bg-red-100 hover:bg-red-200 text-red-700"
                        : isPaused
                          ? "bg-green-100 hover:bg-green-200 text-green-700"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <MicOff className="w-4 h-4" />
                        Pause Speaking
                      </>
                    ) : isPaused ? (
                      <>
                        <Play className="w-4 h-4" />
                        Resume Speaking
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        Play Question
                      </>
                    )}
                  </button>

                  <button
                    onClick={nextQuestion}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ml-auto"
                  >
                    {currentIndex === questions.length - 1 ? "Finish Interview" : "Next Question"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {voiceBot.transcript && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-yellow-800">Live Transcript</span>
                    </div>
                    <p className="text-gray-700 italic">"{voiceBot.transcript}"</p>
                  </div>
                )}

                {answers[currentIndex] && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="text-sm font-semibold text-blue-800 mb-3 uppercase tracking-wide">Your Answer</h4>
                    <p className="text-gray-800 leading-relaxed">{answers[currentIndex]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {evaluationLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">Evaluating Your Performance</h3>
              <p className="text-lg text-gray-600 mb-8">
                Our AI is analyzing your responses and calculating your score...
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <span className="text-sm">Analyzing technical responses</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <span className="text-sm">Evaluating communication skills</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="text-sm">Finalizing your score</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {evaluated && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h3>
              <p className="text-gray-600">Here's your performance evaluation</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">{evaluated}</pre>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setInterviewStarted(false)
                  setQuestions([])
                  setAnswers([])
                  setCurrentIndex(0)
                  setEvaluated(null)
                  setEvaluationLoading(false)
                  setResumeText("")
                  setJobDescription("")
                }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start New Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Interview


// import React, { useState } from "react";
// import axios from "axios";
// import { useInterviewVoiceBot } from "@/hooks/useInterviewVoiceBot";

// const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

// const Interview = () => {
//   const [resumeText, setResumeText] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [answers, setAnswers] = useState<string[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [evaluated, setEvaluated] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   console.log('the answers are')
//   console.log(answers)

//   const voiceBot = useInterviewVoiceBot();

//   const speak = (text: string) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     speechSynthesis.speak(utterance);
//   };

// const listen = () => {
//   if (!voiceBot.isListening) {
//     voiceBot.startListening();
//   }
// };



//   const generateQuestions = async () => {
//     if (!resumeText.trim() || !jobDescription.trim()) {
//       alert("Paste resume and job description first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const prompt = `
// You are an AI interviewer.

// Using the following resume and job description, generate exactly 3 interview questions that assess technical and behavioral fit.

// Resume:
// ${resumeText}

// Job Description:
// ${jobDescription}

// Return only the 3 questions in a numbered list from 1 to 3. Do NOT include any introduction, explanation, or summary.
// Only output the numbered questions. No heading, no conclusion, no other text.
// `;

//       const response = await axios.post(
//         "https://api.groq.com/openai/v1/chat/completions",
//         {
//           model: "llama3-70b-8192",
//           messages: [
//             {
//               role: "system",
//               content: "You are an HR assistant helping evaluate candidates.",
//             },
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${GROQ_API_KEY}`,
//           },
//         }
//       );

//       const content = response.data.choices[0]?.message?.content ?? "";
//       const extracted = content
//         .split(/\n(?=\d+\.)/)
//         .map((line: string) => line.trim())
//         .filter(Boolean);

//       setQuestions(extracted);
//       setInterviewStarted(true);
//       speak(extracted[0]);
//     } catch (err: any) {
//       console.error("❌ Error generating questions:", err.response?.data || err.message);
//       alert("Failed to generate questions. Check console or API key.");
//     }
//     setLoading(false);
//   };

//   const nextQuestion = () => {
//   const currentTranscript = voiceBot.transcript.trim();

//   if (currentTranscript) {
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentIndex] = currentTranscript;
//     setAnswers(updatedAnswers);
//   }

//   voiceBot.clearTranscript?.(); 

//   if (currentIndex < questions.length - 1) {
//     setCurrentIndex((prev) => prev + 1);
//     speak(questions[currentIndex + 1]);
//   } else {
//     alert("Interview complete! Evaluating...");
//     evaluateInterview();
//   }
// };



//   const evaluateInterview = async () => {
//     const QnA = questions.map((q, i) => `Q: ${q}\nA: ${answers[i] || "(no answer)"}`).join("\n\n");

//     const prompt = `Evaluate this candidate based on their answers to the interview questions below. Provide only:
// 1. A score out of 100
// 2. A brief summary of their overall performance.

// ${QnA}`;

//     try {
//       const response = await axios.post(
//         "https://api.groq.com/openai/v1/chat/completions",
//         {
//           model: "llama3-70b-8192",
//           messages: [
//             {
//               role: "system",
//               content: "You are an expert interviewer.",
//             },
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${GROQ_API_KEY}`,
//           },
//         }
//       );

//       const evaluation = response.data.choices[0]?.message?.content;
//       setEvaluated(evaluation);
//     } catch (err) {
//       console.error("❌ Evaluation Error:", err);
//       alert("Evaluation failed. Try again.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">AI Interview</h2>

//       {!interviewStarted && (
//         <>
//           <div className="mb-4">
//             <label className="font-medium">Resume Text:</label>
//             <textarea
//               rows={5}
//               className="w-full mt-2 p-2 border rounded"
//               value={resumeText}
//               onChange={(e) => setResumeText(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="font-medium">Job Description:</label>
//             <textarea
//               rows={5}
//               className="w-full mt-2 p-2 border rounded"
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={generateQuestions}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate Interview & Start"}
//           </button>
//         </>
//       )}

//       {interviewStarted && questions.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Q{currentIndex + 1}: {questions[currentIndex]}</h3>

//           <div className="space-x-2 mb-2">
//             <button
//               onClick={listen}
//               className={`px-3 py-1 rounded ${voiceBot.isListening ? "bg-red-500" : "bg-yellow-500"} text-white`}
//               disabled={voiceBot.isListening}
//             >
//               {voiceBot.isListening ? "🎙️ Listening..." : "🎤 Answer"}
//             </button>

//             <button
//               onClick={nextQuestion}
//               className="bg-blue-600 text-white px-3 py-1 rounded"
//             //   disabled={voiceBot.isListening}
//             >
//               Next
//             </button>
//           </div>

//           {voiceBot.transcript && (
//             <p className="text-sm text-gray-600 italic mt-1">
//               (Live transcript: "{voiceBot.transcript}")
//             </p>
//           )}

//           <div className="mb-4">
//             <label className="text-sm text-gray-500">Answer:</label>
//             <p className="border p-2 rounded bg-gray-100 min-h-[60px]">{answers[currentIndex]}</p>
//           </div>
//         </div>
//       )}

//       {evaluated && (
//         <div className="mt-6 p-4 border rounded bg-green-50">
//           <h3 className="font-bold mb-2">Interview Evaluation</h3>
//           <pre className="whitespace-pre-wrap text-sm">{evaluated}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Interview;

