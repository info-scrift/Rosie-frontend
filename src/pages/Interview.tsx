"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { useInterviewVoiceBot } from "@/hooks/useInterviewVoiceBot"
import { Mic, MicOff, ArrowRight, FileText, Briefcase, MessageSquare, Award, Loader2, Play, Volume2, Sparkles, Clock, CheckCircle, User, Brain } from 'lucide-react'
import { getApiUrl } from "@/utils/getUrl"
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "@/services/userservice/auth";

const baseURL = getApiUrl()


const Interview = () => {
  const [restarting, setRestarting] = useState(false);
  const [restartMsg, setRestartMsg] = useState("Wrapping up…");
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
  const [preparing, setPreparing] = useState(true);
  const [prepStatus, setPrepStatus] = useState("Loading your profile…");

  const voiceBot = useInterviewVoiceBot()
  const navigate = useNavigate();
  const location = useLocation();
  const job = (location.state as { job?: any })?.job;

  // bounce if no job came via state (optional)
  useEffect(() => {
    if (!job) navigate("/jobs");
  }, [job, navigate]);
  const handleRestartToJob = async () => {
    // show loader and step messages
    setRestarting(true);
    setRestartMsg("Wrapping up…");

    // clear local state
    setInterviewStarted(false);
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setEvaluated(null);
    setEvaluationLoading(false);
    setResumeText("");
    setJobDescription("");

    // fun little staged messages (optional)
    await new Promise(r => setTimeout(r, 350));
    setRestartMsg("Saving your session…");
    await new Promise(r => setTimeout(r, 350));
    setRestartMsg("Taking you back to the job…");

    // go back to the job posting; fallback to /jobs if id missing
    const target = job?.id ? `/jobs/${job.id}` : "/jobs";
    await new Promise(r => setTimeout(r, 450)); // tiny pause so the last message is visible
    navigate(target);
  };

  // Auto-prepare: fetch profile, prefill resume & JD, then generate questions
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setPreparing(true);
        setPrepStatus("Loading your profile…");

        const token = getAccessToken();
        const profileRes = await axios.get(`${baseURL}/applicant/profile`, {
          headers: { Authorization: `Bearer ${token ?? ""}` },
          withCredentials: true,
        });
        if (!alive) return;

        const p = profileRes.data.profile;

        // Build resume text (local var)
        const resume = [
          `Name: ${p.first_name ?? ""} ${p.last_name ?? ""}`,
          p.email ? `Email: ${p.email}` : "",
          p.phone ? `Phone: ${p.phone}` : "",
          p.address ? `Address: ${p.address}` : "",
          p.date_of_birth ? `Date of Birth: ${p.date_of_birth}` : "",
          `Experience Years: ${p.experience_years ?? 0}`,
          p.skills?.length ? `Skills: ${p.skills.filter(Boolean).join(", ")}` : "",
          p.resume_url ? `Resume URL: ${p.resume_url}` : "",
          "",
          "=== Scraped Data from Resume ===",
          "(Data will be populated after backend parsing)",
        ]
          .filter(Boolean)
          .join("\n");

        setResumeText(resume);

        setPrepStatus("Parsing job details…");

        // Build JD into a local var (not state)
        let jdLocal = "";
        if (job) {
          jdLocal = [
            `Title: ${job.title ?? ""}`,
            `Company: ${job.company ?? ""}`,
            job.description ? `\n${job.description}` : "",
            job.requirements?.length ? `\nRequirements:\n- ${job.requirements.join("\n- ")}` : "",
            job.responsibilities?.length ? `\nResponsibilities:\n- ${job.responsibilities.join("\n- ")}` : "",
            job.tags?.length ? `\nSkills: ${job.tags.join(", ")}` : "",
          ]
            .filter(Boolean)
            .join("\n");
        }

        // Optional: keep UI state in sync, but don't rely on it for the POST
        setJobDescription(jdLocal);

        setPrepStatus("Generating personalized questions…");
        setLoading(true);

        // Use jdLocal directly so it’s never empty
        const response = await axios.post(
          `${baseURL}/interview/generate-questions`,
          { resumeText: resume, jobDescription: jdLocal },
          {
            headers: { Authorization: `Bearer ${token ?? ""}` },
            withCredentials: true,
          }
        );
        if (!alive) return;

        if (response.data.success) {
          setQuestions(response.data.questions);
          setInterviewStarted(true);
          speak(response.data.questions[0]);
          setPrepStatus("Ready!");
        } else {
          throw new Error(response.data.message || "Failed to generate questions");
        }
      } catch (err: any) {
        console.error("❌ Prep error:", err.response?.data || err.message);
        setPrepStatus("Something went wrong preparing your interview.");
      } finally {
        if (alive) {
          setLoading(false);
          setPreparing(false);
        }
      }
    })();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
      const response = await axios.post(`${baseURL}/interview/evaluate-interview`, {
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
          {preparing && !interviewStarted && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center shadow-2xl">
                    <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-10 h-10 text-blue-600 animate-pulse" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900">
                  Preparing your interview…
                </h3>

                <p className="text-lg text-gray-600">
                  {prepStatus}
                </p>

                <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mt-4">
                  <div className="p-4 rounded-xl border border-gray-200 bg-white/70">
                    <div className="text-sm text-gray-500">Step 1</div>
                    <div className="font-semibold text-gray-900">Load Profile</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 bg-white/70">
                    <div className="text-sm text-gray-500">Step 2</div>
                    <div className="font-semibold text-gray-900">Parse Job Details</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 bg-white/70">
                    <div className="text-sm text-gray-500">Step 3</div>
                    <div className="font-semibold text-gray-900">Generate Questions</div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  This usually takes just a moment.
                </div>
              </div>
            </div>
          )}

          {restarting && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-white/70 backdrop-blur-md">
              <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-8 w-full max-w-sm text-center">
                <div className="relative mx-auto mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center shadow-xl">
                    <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">Restarting interview</h4>
                <p className="text-slate-600">{restartMsg}</p>
                <p className="text-xs text-slate-400 mt-3">This won’t take long.</p>
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
                      className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${voiceBot.isListening
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
                      className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isSpeaking
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
                    onClick={handleRestartToJob}
                    disabled={restarting}                  
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
