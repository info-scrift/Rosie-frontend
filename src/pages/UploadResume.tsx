import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Brain, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ProfessionalCard } from "@/components/ui/professional-card";
const UploadResume = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  const handleFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > maxSize) {
      alert('File size must be less than 10MB.');
      return;
    }
    setFile(file);
    setIsUploaded(true);
  };
  const analyzeResume = () => {
    setTimeout(() => {
      navigate('/job-matches');
    }, 2000);
  };
  return <div className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto container-padding">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">
            Upload Your{" "}
            <span className="text-gradient-primary">Resume</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Let our AI analyze your resume and find perfect job matches for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <ProfessionalCard variant="executive" delay={0.2}>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-slate-900">
                <Upload className="w-6 h-6 mr-3 text-primary-600" />
                Upload Resume
              </CardTitle>
              <CardDescription className="text-base text-slate-600">
                Drag and drop your resume or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive ? 'border-primary-500 bg-primary-50' : isUploaded ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                {isUploaded ? <motion.div className="space-y-6" initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.4
              }}>
                    <CheckCircle className="w-16 h-16 text-primary-600 mx-auto" />
                    <div>
                      <p className="text-xl font-semibold text-primary-800 mb-2">File Uploaded Successfully!</p>
                      <p className="text-sm text-slate-600 mb-1">{file?.name}</p>
                      <p className="text-sm text-slate-600">
                        Size: {file ? (file.size / 1024 / 1024).toFixed(2) : '0'}MB
                      </p>
                    </div>
                    <Button onClick={analyzeResume} className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 shadow-blue-soft">
                      <Brain className="w-5 h-5 mr-2" />
                      Analyze Resume & Find Matches
                    </Button>
                  </motion.div> : <div className="space-y-6">
                    <FileText className="w-16 h-16 text-slate-400 mx-auto" />
                    <div>
                      <p className="text-xl font-semibold text-slate-900 mb-2">
                        Drop your resume here
                      </p>
                      <p className="text-sm text-slate-600">
                        Supports PDF, DOC, DOCX (Max 10MB)
                      </p>
                    </div>
                    <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleChange} />
                    <label htmlFor="resume-upload">
                      <Button variant="outline" className="cursor-pointer border-primary-300 text-primary-600 bg-sidebar-accent">
                        Choose File
                      </Button>
                    </label>
                  </div>}
              </div>
            </CardContent>
          </ProfessionalCard>

          {/* Benefits Section */}
          <ProfessionalCard variant="executive" delay={0.4}>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-slate-900">
                <Brain className="w-6 h-6 mr-3 text-primary-600" />
                AI Resume Analysis
              </CardTitle>
              <CardDescription className="text-base text-slate-600">
                What happens after you upload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[{
                step: "1",
                title: "Skills Analysis",
                description: "AI extracts and categorizes your skills, experience, and qualifications"
              }, {
                step: "2",
                title: "Job Matching",
                description: "Intelligent matching with jobs across all industries based on your profile"
              }, {
                step: "3",
                title: "Personalized Results",
                description: "Get ranked job recommendations with match scores and reasoning"
              }].map((item, index) => <motion.div key={item.step} className="flex items-start space-x-4" initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.6 + index * 0.1
              }}>
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>)}
              </div>
            </CardContent>
          </ProfessionalCard>
        </div>
      </div>
    </div>;
};
export default UploadResume;