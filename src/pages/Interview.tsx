
import React, { useState } from "react";
import axios from "axios";
import { useInterviewVoiceBot } from "@/hooks/useInterviewVoiceBot";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

const Interview = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [evaluated, setEvaluated] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  console.log('the answers are')
  console.log(answers)

  const voiceBot = useInterviewVoiceBot();

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

const listen = () => {
  if (!voiceBot.isListening) {
    voiceBot.startListening();
  }
};



  const generateQuestions = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert("Paste resume and job description first.");
      return;
    }

    setLoading(true);
    try {
      const prompt = `
You are an AI interviewer.

Using the following resume and job description, generate exactly 3 interview questions that assess technical and behavioral fit.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return only the 3 questions in a numbered list from 1 to 3. Do NOT include any introduction, explanation, or summary.
Only output the numbered questions. No heading, no conclusion, no other text.
`;

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
        }
      );

      const content = response.data.choices[0]?.message?.content ?? "";
      const extracted = content
        .split(/\n(?=\d+\.)/)
        .map((line: string) => line.trim())
        .filter(Boolean);

      setQuestions(extracted);
      setInterviewStarted(true);
      speak(extracted[0]);
    } catch (err: any) {
      console.error("❌ Error generating questions:", err.response?.data || err.message);
      alert("Failed to generate questions. Check console or API key.");
    }
    setLoading(false);
  };

  const nextQuestion = () => {
  const currentTranscript = voiceBot.transcript.trim();

  if (currentTranscript) {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = currentTranscript;
    setAnswers(updatedAnswers);
  }

  voiceBot.clearTranscript?.(); 

  if (currentIndex < questions.length - 1) {
    setCurrentIndex((prev) => prev + 1);
    speak(questions[currentIndex + 1]);
  } else {
    alert("Interview complete! Evaluating...");
    evaluateInterview();
  }
};



  const evaluateInterview = async () => {
    const QnA = questions.map((q, i) => `Q: ${q}\nA: ${answers[i] || "(no answer)"}`).join("\n\n");

    const prompt = `Evaluate this candidate based on their answers to the interview questions below. Provide only:
1. A score out of 100
2. A brief summary of their overall performance.

${QnA}`;

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
        }
      );

      const evaluation = response.data.choices[0]?.message?.content;
      setEvaluated(evaluation);
    } catch (err) {
      console.error("❌ Evaluation Error:", err);
      alert("Evaluation failed. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">AI Interview</h2>

      {!interviewStarted && (
        <>
          <div className="mb-4">
            <label className="font-medium">Resume Text:</label>
            <textarea
              rows={5}
              className="w-full mt-2 p-2 border rounded"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="font-medium">Job Description:</label>
            <textarea
              rows={5}
              className="w-full mt-2 p-2 border rounded"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            onClick={generateQuestions}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Interview & Start"}
          </button>
        </>
      )}

      {interviewStarted && questions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Q{currentIndex + 1}: {questions[currentIndex]}</h3>

          <div className="space-x-2 mb-2">
            <button
              onClick={listen}
              className={`px-3 py-1 rounded ${voiceBot.isListening ? "bg-red-500" : "bg-yellow-500"} text-white`}
              disabled={voiceBot.isListening}
            >
              {voiceBot.isListening ? "🎙️ Listening..." : "🎤 Answer"}
            </button>

            <button
              onClick={nextQuestion}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            //   disabled={voiceBot.isListening}
            >
              Next
            </button>
          </div>

          {voiceBot.transcript && (
            <p className="text-sm text-gray-600 italic mt-1">
              (Live transcript: "{voiceBot.transcript}")
            </p>
          )}

          <div className="mb-4">
            <label className="text-sm text-gray-500">Answer:</label>
            <p className="border p-2 rounded bg-gray-100 min-h-[60px]">{answers[currentIndex]}</p>
          </div>
        </div>
      )}

      {evaluated && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h3 className="font-bold mb-2">Interview Evaluation</h3>
          <pre className="whitespace-pre-wrap text-sm">{evaluated}</pre>
        </div>
      )}
    </div>
  );
};

export default Interview;



// import React, { useState } from "react";
// import axios from "axios";
// // import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
// // import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

// // pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;



// const Interview = () => {
//   const [resumeText, setResumeText] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

// // const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //   const file = e.target.files?.[0];
// //   if (!file) return;

// //   const reader = new FileReader();
// //   reader.onload = async () => {
// //     try {
// //       const typedArray = new Uint8Array(reader.result as ArrayBuffer);
// //       const loadingTask = pdfjsLib.getDocument({ data: typedArray });
// //       const pdf = await loadingTask.promise;

// //       let fullText = "";

// //       for (let i = 1; i <= pdf.numPages; i++) {
// //         const page = await pdf.getPage(i);
// //         const textContent = await page.getTextContent();
// //         const strings = textContent.items.map((item: any) => item.str);
// //         const pageText = strings.join(" ");
// //         fullText += pageText + "\n";
// //       }

// //       if (!fullText.trim()) {
// //         throw new Error("Parsed text is empty");
// //       }

// //       setResumeText(fullText);
// //       console.log("✅ Parsed Resume Text:", fullText);
// //     } catch (err) {
// //       console.error("❌ PDF Parsing Error:", err);
// //       alert("Failed to read the resume. Please try a different PDF.");
// //     }
// //   };

// //   reader.readAsArrayBuffer(file);
// // };



//   const generateQuestions = async () => {
//     console.log("Resume Text Length:", resumeText.length);
// console.log("Job Description Length:", jobDescription.length);

//  if (!resumeText.trim() || !jobDescription.trim()) {
//   alert("Upload resume and enter job description first.");
//   return;
// }


//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://api.deepseek.com/v1/chat/completions",
//         {
//           model: "deepseek-chat",
//           messages: [
//             {
//               role: "system",
//               content: "You are an expert technical interviewer.",
//             },
//             {
//               role: "user",
//               content: `
// Generate 10 interview questions based on the following:

// Job Description:
// ${jobDescription}

// Candidate Resume:
// ${resumeText}

// Return the questions in a numbered list.
//               `,
//             },
//           ],
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer sk-28d600697d934feab3ed39dddb105543`
//           },
//         }
//       );

//       const content = response.data.choices[0].message.content;
//       const lines = content.split("\n").filter((line: string) => line.trim());
//       setQuestions(lines);
//     } catch (err: any) {
//       console.error("Error generating questions:", err);
//       alert("Failed to generate questions. Check console for error.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">AI Interview Question Generator</h2>

//       {/* <div className="mb-4">
//         <label className="font-medium">Upload Resume (PDF only):</label>
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={handleResumeUpload}
//           className="block mt-2"
//         />
//       </div> */}
//        <div className="mb-4">
//         <label className="font-medium">Resume Text:</label>
//         <textarea
//           rows={5}
//           className="w-full mt-2 p-2 border rounded"
//           value={resumeText}
//           onChange={(e) => setResumeText(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="font-medium">Job Description:</label>
//         <textarea
//           rows={5}
//           className="w-full mt-2 p-2 border rounded"
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={generateQuestions}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Interview Questions"}
//       </button>

//       {questions.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Generated Questions:</h3>
//           <ul className="list-decimal ml-6 space-y-1">
//             {questions.map((q, idx) => (
//               <li key={idx}>{q}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Interview;





// import React, { useState } from "react";
// import axios from "axios";

// const GROQ_API_KEY = "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"

// const Interview = () => {
//   const [resumeText, setResumeText] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const generateQuestions = async () => {
//     console.log("Resume Text Length:", resumeText.length);
//     console.log("Job Description Length:", jobDescription.length);

//     if (!resumeText.trim() || !jobDescription.trim()) {
//       alert("Paste resume and job description first.");
//       return;
//     }

//     setLoading(true);
//     try {
//      const prompt = `
// You are an AI interviewer.

// Using the following resume and job description, generate exactly 10 interview questions that assess technical and behavioral fit.

// Resume:
// ${resumeText}

// Job Description:
// ${jobDescription}

// Return only the 10 questions in a numbered list from 1 to 10. Do NOT include any introduction, explanation, or summary.
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
//         .split(/\n(?=\d+\.)/) // split by lines starting with 1. 2. etc
//         .map((line: string) => line.trim())
//         .filter(Boolean);

//       setQuestions(extracted);
//     } catch (err: any) {
//   console.error("❌ Error generating questions:", err.response?.data || err.message);
//   console.log(err)
//   alert("Failed to generate questions. Check console or API key.");
// }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">AI Interview Question Generator</h2>

//       <div className="mb-4">
//         <label className="font-medium">Resume Text:</label>
//         <textarea
//           rows={5}
//           className="w-full mt-2 p-2 border rounded"
//           value={resumeText}
//           onChange={(e) => setResumeText(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="font-medium">Job Description:</label>
//         <textarea
//           rows={5}
//           className="w-full mt-2 p-2 border rounded"
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={generateQuestions}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Interview Questions"}
//       </button>

//       {questions.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Generated Questions:</h3>
//           <ul className="list-decimal ml-6 space-y-1">
//             {questions.map((q, idx) => (
//               <li key={idx}>{q}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Interview;


