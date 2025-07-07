
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ProfessionalCard } from "@/components/ui/professional-card";

const QuickApply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    coverLetter: "",
    agreeToTerms: false
  });

  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitApplication = () => {
    console.log("Application submitted:", formData);
    setCurrentStep(totalSteps + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gradient">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className="professional-form-input"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className="professional-form-input"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="professional-form-input"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                className="professional-form-input"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm font-medium">Current Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, State"
                className="professional-form-input"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gradient">Work Experience</h3>
            <div>
              <Label htmlFor="experience" className="text-sm font-medium">Tell us about your relevant experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Describe your work experience, skills, and achievements..."
                rows={6}
                className="mt-2"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gradient">Cover Letter</h3>
            <div>
              <Label htmlFor="coverLetter" className="text-sm font-medium">Why are you interested in this position?</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                placeholder="Write a brief cover letter explaining your interest and fit for this role..."
                rows={6}
                className="mt-2"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gradient">Review & Submit</h3>
            <div className="bg-slate-50 p-6 rounded-xl space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</div>
                <div><span className="font-medium">Email:</span> {formData.email}</div>
                <div><span className="font-medium">Phone:</span> {formData.phone}</div>
                <div><span className="font-medium">Location:</span> {formData.location}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>
          </div>
        );
      
      default:
        return (
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-20 h-20 text-blue-600 mx-auto" />
            <h3 className="text-3xl font-semibold text-blue-800">Application Submitted!</h3>
            <p className="text-muted-foreground text-lg">
              Thank you for your application. We'll review it and get back to you soon.
            </p>
          </motion.div>
        );
    }
  };

  if (currentStep > totalSteps) {
    return (
      <div className="section-padding bg-gradient-mesh flex items-center justify-center min-h-screen">
        <ProfessionalCard variant="executive" className="max-w-md w-full">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </ProfessionalCard>
      </div>
    );
  }

  return (
    <div className="section-padding bg-gradient-mesh">
      <div className="max-w-4xl mx-auto container-padding">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
            Quick Apply
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete your application in just a few steps
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </motion.div>

        <ProfessionalCard variant="executive" delay={0.5}>
          <CardHeader>
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <CardDescription className="text-base">
              Fill out the information below to complete your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            {currentStep <= totalSteps && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep} className="executive-button-primary px-6">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={submitApplication}
                    disabled={!formData.agreeToTerms}
                    className="executive-button-primary px-8"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </ProfessionalCard>
      </div>
    </div>
  );
};

export default QuickApply;
