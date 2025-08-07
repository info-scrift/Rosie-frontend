
// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { useInterviewVoiceBot } from "@/hooks/useInterviewVoiceBot"
// import {
//   Mic,
//   MicOff,
//   ArrowRight,
//   FileText,
//   Briefcase,
//   MessageSquare,
//   Award,
//   Loader2,
//   Play,
//   Volume2,
//   Sparkles,
//   Clock,
//   CheckCircle,
//   User,
//   Brain,
// } from "lucide-react"

// const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

// const Interview = () => {
//   const [resumeText, setResumeText] = useState("")
//   const [jobDescription, setJobDescription] = useState("")
//   const [questions, setQuestions] = useState<string[]>([])
//   const [answers, setAnswers] = useState<string[]>([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [interviewStarted, setInterviewStarted] = useState(false)
//   const [evaluated, setEvaluated] = useState<any>(null)
//   const [loading, setLoading] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [isPaused, setIsPaused] = useState(false)
//   const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)
//   const [spokenText, setSpokenText] = useState("")
//   const [remainingText, setRemainingText] = useState("")
//   const [evaluationLoading, setEvaluationLoading] = useState(false)

//   const voiceBot = useInterviewVoiceBot()
//   console.log('the key is '+ GROQ_API_KEY)
//   console.log("voice bot is listening:", voiceBot.isListening)
//   console.log("answers are")
//   console.log(answers)

//   const speak = (text: string, fromPosition = 0) => {
//     speechSynthesis.cancel()
//     const textToSpeak = text.substring(fromPosition)
//     setRemainingText(textToSpeak)
//     setSpokenText(text.substring(0, fromPosition))

//     if (textToSpeak.trim() === "") return

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setIsPaused(false)
//     }

//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setIsPaused(false)
//       setCurrentUtterance(null)
//       setSpokenText("")
//       setRemainingText("")
//     }

//     utterance.onerror = () => {
//       setIsSpeaking(false)
//       setIsPaused(false)
//       setCurrentUtterance(null)




//     }

//     utterance.onboundary = (event) => {
//       if (event.name === "word") {
//         const currentPosition = fromPosition + event.charIndex
//         setSpokenText(text.substring(0, currentPosition))
//         setRemainingText(text.substring(currentPosition))
//       }
//     }

//     setCurrentUtterance(utterance)
//     speechSynthesis.speak(utterance)
//   }

//   const pauseSpeaking = () => {
//     if (isSpeaking && currentUtterance) {
//       speechSynthesis.cancel()
//       setIsSpeaking(false)
//       setIsPaused(true)
//     }
//   }

//   const resumeSpeaking = () => {
//     if (isPaused) {
//       const currentQuestion = questions[currentIndex]
//       const resumePosition = spokenText.length
//       speak(currentQuestion, resumePosition)
//     } else {
//       speak(questions[currentIndex])
//     }
//   }

//   const listen = () => {
//     if (!voiceBot.isListening) {
//       voiceBot.startListening()
//     }
//   }

//   const generateQuestions = async () => {
//     if (!resumeText.trim() || !jobDescription.trim()) {
//       alert("Paste resume and job description first.")
//       return
//     }

//     setLoading(true)
//     try {
//       const prompt = `You are an AI interviewer.Using the following resume and job description, generate exactly 5 interview questions that assess technical and behavioral fit(but easy short questions).Resume:${resumeText}Job Description:${jobDescription}Return only the 5 questions in a numbered list from 1 to 5. Do NOT include any introduction, explanation, or summary.Only output the numbered questions. No heading, no conclusion, no other text.`

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
//         },
//       )

//       const content = response.data.choices[0]?.message?.content ?? ""
//       const extracted = content
//         .split(/\n(?=\d+\.)/)
//         .map((line: string) => line.trim())
//         .filter(Boolean)

//       setQuestions(extracted)
//       setInterviewStarted(true)
//       speak(extracted[0])
//     } catch (err: any) {
//       console.error("❌ Error generating questions:", err.response?.data || err.message)
//       alert("Failed to generate questions. Check console or API key.")
//     }
//     setLoading(false)
//   }

//   const nextQuestion = () => {
//     const currentTranscript = voiceBot.transcript.trim()
//     const updatedAnswers = [...answers]
//     updatedAnswers[currentIndex] = currentTranscript
//     setAnswers(updatedAnswers)

//     voiceBot.stopListening()
//     voiceBot.clearTranscript()

//     const isLastQuestion = currentIndex === questions.length - 1

//     if (!isLastQuestion) {
//       const nextIndex = currentIndex + 1
//       setCurrentIndex(nextIndex)
//       speak(questions[nextIndex])
//     } else {
//       setEvaluationLoading(true)
//       setTimeout(() => {
//         evaluateInterview(updatedAnswers)
//       }, 100)
//     }
//   }

//   const evaluateInterview = async (finalAnswers = answers) => {
//     const QnA = questions.map((q, i) => `Q: ${q}\nA: ${finalAnswers[i] || "(no answer)"}`).join("\n\n")

//     console.log("the questions with answers are")
//     console.log(QnA)

//     const prompt = `Evaluate this candidate based on their answers to the interview questions below. Hey if there are few grammatical mistakes ignore them and assume the correct words yourself and also keep a light hand Provide only:1. A score out of 100 2. A brief summary of their overall performance.${QnA}`

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
//         },
//       )

//       const evaluation = response.data.choices[0]?.message?.content
//       setEvaluated(evaluation)
//       setEvaluationLoading(false)
//     } catch (err) {
//       console.error("❌ Evaluation Error:", err)
//       alert("Evaluation failed. Try again.")
//       setEvaluationLoading(false)
//     }
//   }

//   return (
//     <div className="mt-10 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl">
//               <Brain className="w-10 h-10 text-white" />
//             </div>
//             <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
//               AI Interview Assistant
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Experience the future of interviews with our AI-powered assistant. Get personalized questions, real-time
//               feedback, and comprehensive evaluation.
//             </p>
//             <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
//               <div className="flex items-center gap-2">
//                 <Sparkles className="w-4 h-4 text-yellow-500" />
//                 <span>AI-Powered</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-blue-500" />
//                 <span>Real-time</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-500" />
//                 <span>Instant Feedback</span>
//               </div>
//             </div>
//           </div>

//           {!interviewStarted && (
//             <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 mb-8">
//               <div className="grid lg:grid-cols-2 gap-12">
//                 {/* Resume Section */}
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl shadow-lg">
//                       <FileText className="w-6 h-6 text-emerald-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900">Your Resume</h3>
//                       <p className="text-gray-600">Paste your resume content to get started</p>
//                     </div>
//                   </div>
//                   <div className="relative group">
//                     <textarea
//                       rows={10}
//                       className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none bg-gray-50/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-inner group-hover:shadow-lg"
//                       placeholder="Paste your complete resume here including education, experience, skills, and achievements..."
//                       value={resumeText}
//                       onChange={(e) => setResumeText(e.target.value)}
//                     />
//                     <div className="absolute bottom-4 right-4 flex items-center gap-2">
//                       <div className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-600 shadow-sm">
//                         {resumeText.length} characters
//                       </div>
//                       {resumeText.length > 100 && (
//                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Job Description Section */}
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg">
//                       <Briefcase className="w-6 h-6 text-purple-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900">Job Description</h3>
//                       <p className="text-gray-600">The role you're applying for</p>
//                     </div>
//                   </div>
//                   <div className="relative group">
//                     <textarea
//                       rows={10}
//                       className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none bg-gray-50/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-inner group-hover:shadow-lg"
//                       placeholder="Paste the complete job description including requirements, responsibilities, and qualifications..."
//                       value={jobDescription}
//                       onChange={(e) => setJobDescription(e.target.value)}
//                     />
//                     <div className="absolute bottom-4 right-4 flex items-center gap-2">
//                       <div className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-600 shadow-sm">
//                         {jobDescription.length} characters
//                       </div>
//                       {jobDescription.length > 100 && (
//                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-12 text-center">
//                 <button
//                   onClick={generateQuestions}
//                   disabled={loading || !resumeText.trim() || !jobDescription.trim()}
//                   className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="relative flex items-center gap-4">
//                     {loading ? (
//                       <>
//                         <Loader2 className="w-6 h-6 animate-spin" />
//                         <span>Generating Your Interview...</span>
//                       </>
//                     ) : (
//                       <>
//                         <div className="p-2 bg-white/20 rounded-xl">
//                           <Play className="w-6 h-6" />
//                         </div>
//                         <span>Start AI Interview</span>
//                         <Sparkles className="w-5 h-5 animate-pulse" />
//                       </>
//                     )}
//                   </div>
//                 </button>
//                 <p className="mt-4 text-gray-600 text-sm">
//                   Our AI will generate 5 personalized questions based on your profile
//                 </p>
//               </div>
//             </div>
//           )}

//           {interviewStarted && questions.length > 0 && !evaluationLoading && !evaluated && (
//             <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//               {/* Progress Header */}
//               <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-8 py-6 border-b border-gray-200/50">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-blue-100 rounded-xl">
//                       <User className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <span className="text-lg font-bold text-gray-900">
//                         Question {currentIndex + 1} of {questions.length}
//                       </span>
//                       <p className="text-sm text-gray-600">Take your time to provide thoughtful answers</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-blue-600">
//                       {Math.round(((currentIndex + 1) / questions.length) * 100)}%
//                     </div>
//                     <div className="text-xs text-gray-500 uppercase tracking-wide">Complete</div>
//                   </div>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
//                   <div
//                     className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
//                     style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
//                   >
//                     <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-8 sm:p-12">
//                 {/* Question Display */}
//                 <div className="mb-10">
//                   <div className="flex items-start gap-6 mb-8">
//                     <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex-shrink-0 shadow-lg">
//                       <MessageSquare className="w-8 h-8 text-blue-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="mb-3">
//                         <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                           <Clock className="w-3 h-3" />
//                           Interview Question
//                         </span>
//                       </div>
//                       <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{questions[currentIndex]}</h3>
//                     </div>
//                   </div>

//                   {/* Control Buttons */}
//                   <div className="flex flex-wrap items-center gap-4 mb-8">
//                     <button
//                       onClick={listen}
//                       disabled={voiceBot.isListening}
//                       className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
//                         voiceBot.isListening
//                           ? "bg-gradient-to-r from-red-500 to-red-600 text-white cursor-not-allowed"
//                           : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
//                       }`}
//                     >
//                       {voiceBot.isListening ? (
//                         <>
//                           <div className="p-1 bg-white/20 rounded-lg">
//                             <MicOff className="w-5 h-5" />
//                           </div>
//                           <span>Listening...</span>
//                           <div className="flex gap-1">
//                             <div className="w-1 h-4 bg-white/60 rounded-full animate-bounce"></div>
//                             <div
//                               className="w-1 h-4 bg-white/60 rounded-full animate-bounce"
//                               style={{ animationDelay: "0.1s" }}
//                             ></div>
//                             <div
//                               className="w-1 h-4 bg-white/60 rounded-full animate-bounce"
//                               style={{ animationDelay: "0.2s" }}
//                             ></div>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <div className="p-1 bg-white/20 rounded-lg">
//                             <Mic className="w-5 h-5" />
//                           </div>
//                           <span>Start Recording</span>
//                         </>
//                       )}
//                     </button>

//                     <button
//                       onClick={isSpeaking ? pauseSpeaking : resumeSpeaking}
//                       className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
//                         isSpeaking
//                           ? "bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 border-2 border-red-300"
//                           : isPaused
//                             ? "bg-gradient-to-r from-green-100 to-emerald-200 hover:from-green-200 hover:to-emerald-300 text-green-700 border-2 border-green-300"
//                             : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-2 border-gray-300"
//                       }`}
//                     >
//                       {isSpeaking ? (
//                         <>
//                           <MicOff className="w-4 h-4" />
//                           <span>Pause Speaking</span>
//                         </>
//                       ) : isPaused ? (
//                         <>
//                           <Play className="w-4 h-4" />
//                           <span>Resume Speaking</span>
//                         </>
//                       ) : (
//                         <>
//                           <Volume2 className="w-4 h-4" />
//                           <span>Play Question</span>
//                         </>
//                       )}
//                     </button>

//                     <button
//                       onClick={nextQuestion}
//                       className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ml-auto"
//                     >
//                       <span>{currentIndex === questions.length - 1 ? "Finish Interview" : "Next Question"}</span>
//                       <div className="p-1 bg-white/20 rounded-lg">
//                         <ArrowRight className="w-5 h-5" />
//                       </div>
//                     </button>
//                   </div>

//                   {/* Live Transcript */}
//                   {voiceBot.transcript && (
//                     <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8 shadow-lg">
//                       <div className="flex items-center gap-3 mb-4">
//                         <div className="flex items-center gap-2">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
//                           <div
//                             className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
//                             style={{ animationDelay: "0.5s" }}
//                           ></div>
//                         </div>
//                         <span className="text-lg font-bold text-yellow-800 uppercase tracking-wide">
//                           Live Answer Transcript
//                         </span>
//                       </div>
//                       <div className="bg-white/60 rounded-xl p-4 border border-yellow-200">
//                         <p className="text-gray-800 text-lg italic leading-relaxed">"{voiceBot.transcript}"</p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Saved Answer */}
//                   {answers[currentIndex] && (
//                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
//                       <div className="flex items-center gap-3 mb-4">
//                         <CheckCircle className="w-6 h-6 text-blue-600" />
//                         <h4 className="text-lg font-bold text-blue-800 uppercase tracking-wide">Your Answer</h4>
//                       </div>
//                       <div className="bg-white/70 rounded-xl p-6 border border-blue-200">
//                         <p className="text-gray-800 text-lg leading-relaxed">{answers[currentIndex]}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {evaluationLoading && (
//             <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-16">
//               <div className="text-center">
//                 <div className="relative mb-12">
//                   <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-full mb-8 shadow-2xl">
//                     <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Award className="w-12 h-12 text-blue-600 animate-pulse" />
//                   </div>
//                 </div>
//                 <h3 className="text-4xl font-bold text-gray-900 mb-6">Evaluating Your Performance</h3>
//                 <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
//                   Our advanced AI is carefully analyzing your responses across multiple dimensions to provide
//                   comprehensive feedback and calculate your interview score.
//                 </p>
//                 <div className="space-y-6 max-w-md mx-auto">
//                   <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
//                     <span className="font-medium">Analyzing technical responses</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
//                     <div
//                       className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
//                       style={{ animationDelay: "0.2s" }}
//                     ></div>
//                     <span className="font-medium">Evaluating communication skills</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
//                     <div
//                       className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
//                       style={{ animationDelay: "0.4s" }}
//                     ></div>
//                     <span className="font-medium">Calculating overall performance</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
//                     <div
//                       className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
//                       style={{ animationDelay: "0.6s" }}
//                     ></div>
//                     <span className="font-medium">Finalizing your score</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {evaluated && (
//             <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12">
//               <div className="text-center mb-12">
//                 <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 shadow-2xl">
//                   <Award className="w-12 h-12 text-green-600" />
//                 </div>
//                 <h3 className="text-4xl font-bold text-gray-900 mb-4">Interview Complete!</h3>
//                 <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                   Congratulations on completing your AI interview. Here's your comprehensive performance evaluation.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-green-200 shadow-xl mb-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <Sparkles className="w-6 h-6 text-green-600" />
//                   <h4 className="text-2xl font-bold text-gray-900">Your Results</h4>
//                 </div>
//                 <div className="bg-white/80 rounded-xl p-6 shadow-sm">
//                   <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium text-lg">
//                     {evaluated}
//                   </pre>
//                 </div>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={() => {
//                     setInterviewStarted(false)
//                     setQuestions([])
//                     setAnswers([])
//                     setCurrentIndex(0)
//                     setEvaluated(null)
//                     setEvaluationLoading(false)
//                     setResumeText("")
//                     setJobDescription("")
//                   }}
//                   className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                 >
//                   <Play className="w-5 h-5" />
//                   <span>Start New Interview</span>
//                 </button>
//                 <p className="mt-4 text-gray-600">Ready for another round? Practice makes perfect!</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Interview

"use client"
import { useState } from "react"
import axios from "axios"
import { useInterviewVoiceBot } from "@/hooks/useInterviewVoiceBot"
import { Mic, MicOff, ArrowRight, FileText, Briefcase, MessageSquare, Award, Loader2, Play, Volume2, Sparkles, Clock, CheckCircle, User, Brain } from 'lucide-react'
import { getApiUrl } from "@/utils/getUrl"

  const baseURL=getApiUrl()

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

  console.log("voice bot is listening:", voiceBot.isListening)
  console.log("answers are", answers)

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
      const response = await axios.post(`${baseURL}/interview/generate-questions`, {
        resumeText: resumeText.trim(),
        jobDescription: jobDescription.trim()
      })

      if (response.data.success) {
        setQuestions(response.data.questions)
        setInterviewStarted(true)
        speak(response.data.questions[0])
      } else {
        throw new Error(response.data.message || 'Failed to generate questions')
      }
    } catch (err: any) {
      console.error("❌ Error generating questions:", err.response?.data || err.message)
      const errorMessage = err.response?.data?.message || err.message || "Failed to generate questions. Please try again."
      alert(errorMessage)
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
    try {
      const response = await axios.post(`${baseURL}/api/interview/evaluate-interview`, {
        questions: questions,
        answers: finalAnswers
      })

      if (response.data.success) {
        setEvaluated(response.data.evaluation)
      } else {
        throw new Error(response.data.message || 'Failed to evaluate interview')
      }
    } catch (err: any) {
      console.error("❌ Evaluation Error:", err.response?.data || err.message)
      const errorMessage = err.response?.data?.message || err.message || "Evaluation failed. Please try again."
      alert(errorMessage)
    }
    setEvaluationLoading(false)
  }

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-2xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
              AI Interview Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of interviews with our AI-powered assistant. Get personalized questions, real-time
              feedback, and comprehensive evaluation.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Instant Feedback</span>
              </div>
            </div>
          </div>

          {!interviewStarted && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 mb-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Resume Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl shadow-lg">
                      <FileText className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Your Resume</h3>
                      <p className="text-gray-600">Paste your resume content to get started</p>
                    </div>
                  </div>
                  <div className="relative group">
                    <textarea
                      rows={10}
                      className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none bg-gray-50/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-inner group-hover:shadow-lg"
                      placeholder="Paste your complete resume here including education, experience, skills, and achievements..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <div className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                        {resumeText.length} characters
                      </div>
                      {resumeText.length > 100 && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Description Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Job Description</h3>
                      <p className="text-gray-600">The role you're applying for</p>
                    </div>
                  </div>
                  <div className="relative group">
                    <textarea
                      rows={10}
                      className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none bg-gray-50/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-inner group-hover:shadow-lg"
                      placeholder="Paste the complete job description including requirements, responsibilities, and qualifications..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <div className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                        {jobDescription.length} characters
                      </div>
                      {jobDescription.length > 100 && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={generateQuestions}
                  disabled={loading || !resumeText.trim() || !jobDescription.trim()}
                  className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-4">
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Generating Your Interview...</span>
                      </>
                    ) : (
                      <>
                        <div className="p-2 bg-white/20 rounded-xl">
                          <Play className="w-6 h-6" />
                        </div>
                        <span>Start AI Interview</span>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </>
                    )}
                  </div>
                </button>
                <p className="mt-4 text-gray-600 text-sm">
                  Our AI will generate 5 personalized questions based on your profile
                </p>
              </div>
            </div>
          )}

          {interviewStarted && questions.length > 0 && !evaluationLoading && !evaluated && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Progress Header */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-8 py-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        Question {currentIndex + 1} of {questions.length}
                      </span>
                      <p className="text-sm text-gray-600">Take your time to provide thoughtful answers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(((currentIndex + 1) / questions.length) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Complete</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-12">
                {/* Question Display */}
                <div className="mb-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex-shrink-0 shadow-lg">
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          <Clock className="w-3 h-3" />
                          Interview Question
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{questions[currentIndex]}</h3>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <button
                      onClick={listen}
                      disabled={voiceBot.isListening}
                      className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        voiceBot.isListening
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                      }`}
                    >
                      {voiceBot.isListening ? (
                        <>
                          <div className="p-1 bg-white/20 rounded-lg">
                            <MicOff className="w-5 h-5" />
                          </div>
                          <span>Listening...</span>
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-white/60 rounded-full animate-bounce"></div>
                            <div
                              className="w-1 h-4 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1 h-4 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-1 bg-white/20 rounded-lg">
                            <Mic className="w-5 h-5" />
                          </div>
                          <span>Start Recording</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={isSpeaking ? pauseSpeaking : resumeSpeaking}
                      className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        isSpeaking
                          ? "bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 border-2 border-red-300"
                          : isPaused
                            ? "bg-gradient-to-r from-green-100 to-emerald-200 hover:from-green-200 hover:to-emerald-300 text-green-700 border-2 border-green-300"
                            : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-2 border-gray-300"
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <MicOff className="w-4 h-4" />
                          <span>Pause Speaking</span>
                        </>
                      ) : isPaused ? (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Resume Speaking</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>Play Question</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={nextQuestion}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ml-auto"
                    >
                      <span>{currentIndex === questions.length - 1 ? "Finish Interview" : "Next Question"}</span>
                      <div className="p-1 bg-white/20 rounded-lg">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                  </div>

                  {/* Live Transcript */}
                  {voiceBot.transcript && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                          <div
                            className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-yellow-800 uppercase tracking-wide">
                          Live Answer Transcript
                        </span>
                      </div>
                      <div className="bg-white/60 rounded-xl p-4 border border-yellow-200">
                        <p className="text-gray-800 text-lg italic leading-relaxed">"{voiceBot.transcript}"</p>
                      </div>
                    </div>
                  )}

                  {/* Saved Answer */}
                  {answers[currentIndex] && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-bold text-blue-800 uppercase tracking-wide">Your Answer</h4>
                      </div>
                      <div className="bg-white/70 rounded-xl p-6 border border-blue-200">
                        <p className="text-gray-800 text-lg leading-relaxed">{answers[currentIndex]}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {evaluationLoading && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-16">
              <div className="text-center">
                <div className="relative mb-12">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-full mb-8 shadow-2xl">
                    <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award className="w-12 h-12 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">Evaluating Your Performance</h3>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Our advanced AI is carefully analyzing your responses across multiple dimensions to provide
                  comprehensive feedback and calculate your interview score.
                </p>
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <span className="font-medium">Analyzing technical responses</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
                    <div
                      className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="font-medium">Evaluating communication skills</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
                    <div
                      className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <span className="font-medium">Calculating overall performance</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 rounded-2xl p-4 shadow-sm">
                    <div
                      className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                    <span className="font-medium">Finalizing your score</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {evaluated && (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 shadow-2xl">
                  <Award className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">Interview Complete!</h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Congratulations on completing your AI interview. Here's your comprehensive performance evaluation.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-green-200 shadow-xl mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  <h4 className="text-2xl font-bold text-gray-900">Your Results</h4>
                </div>
                <div className="bg-white/80 rounded-xl p-6 shadow-sm">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium text-lg">
                    {evaluated}
                  </pre>
                </div>
              </div>
              <div className="text-center">
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
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  <span>Start New Interview</span>
                </button>
                <p className="mt-4 text-gray-600">Ready for another round? Practice makes perfect!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Interview
