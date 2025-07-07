import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, DollarSign, Briefcase, Clock, Users, X, Plus, Shield } from "lucide-react";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { AnimatedCard } from "@/components/ui/animated-card";
import { GradientButton } from "@/components/ui/gradient-button";

const AdminCreateJob = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const stepTitles = [
    "Basic Information",
    "Job Details", 
    "Requirements",
    "Client Assignment",
    "Review & Publish"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <FadeInSection>
        <div className="text-center mb-8">
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <motion.h1 
            className="text-4xl font-display font-bold text-gradient mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Admin Job Creation
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Create and manage job postings on behalf of clients with full administrative control.
          </motion.p>
        </div>
      </FadeInSection>

      {/* Progress Bar */}
      <FadeInSection delay={0.4}>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    index + 1 <= step 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                  }`}
                  animate={{ 
                    scale: index + 1 === step ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {index + 1}
                </motion.div>
                {index < stepTitles.length - 1 && (
                  <div className="w-12 h-1 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: index + 1 < step ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Step {step} of {totalSteps}: {stepTitles[step - 1]}
            </p>
          </div>
        </div>
      </FadeInSection>

      <AnimatedCard delay={0.5} className="card-hover">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900/20">
          <CardTitle className="font-display text-2xl flex items-center">
            <Shield className="w-6 h-6 mr-3 text-blue-600" />
            {stepTitles[step - 1]}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {step === 4 && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Admin Control</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  As an admin, you can assign this job to any client and manage it on their behalf.
                </p>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-medium">Assign to Client</Label>
                <Select>
                  <SelectTrigger className="focus-ring">
                    <SelectValue placeholder="Select client company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                    <SelectItem value="innovate">Innovate Labs</SelectItem>
                    <SelectItem value="startup">Startup Ventures</SelectItem>
                    <SelectItem value="enterprise">Enterprise Systems</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This job will appear in the selected client's dashboard and they will receive applications.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-lg font-medium">Admin Settings</Label>
                <div className="space-y-3">
                  <motion.label
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input type="checkbox" defaultChecked className="rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="font-medium">Auto-approve posting</p>
                      <p className="text-sm text-muted-foreground">Job goes live immediately without client review</p>
                    </div>
                  </motion.label>
                  <motion.label
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input type="checkbox" className="rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="font-medium">Featured listing</p>
                      <p className="text-sm text-muted-foreground">Promote this job for better visibility</p>
                    </div>
                  </motion.label>
                  <motion.label
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input type="checkbox" defaultChecked className="rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="font-medium">Send admin notifications</p>
                      <p className="text-sm text-muted-foreground">Get updates on applications and client activity</p>
                    </div>
                  </motion.label>
                </div>
              </div>
            </motion.div>
          )}

          {step !== 4 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Step {step} content would be similar to client create job form...</p>
            </div>
          )}

          <div className="flex justify-between pt-8">
            <motion.button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={step > 1 ? { scale: 1.02 } : undefined}
              whileTap={step > 1 ? { scale: 0.98 } : undefined}
            >
              Previous
            </motion.button>
            
            {step < totalSteps ? (
              <GradientButton
                onClick={() => setStep(Math.min(totalSteps, step + 1))}
                variant="primary"
              >
                Next Step
              </GradientButton>
            ) : (
              <GradientButton variant="success">
                Create Job (Admin)
              </GradientButton>
            )}
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  );
};

export default AdminCreateJob;
