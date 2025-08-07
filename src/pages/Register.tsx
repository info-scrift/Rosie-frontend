
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from "lucide-react";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     acceptTerms: false
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate registration
//     setTimeout(() => {
//       console.log("Registration attempt:", formData);
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="text-center mb-8">
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
//           <p className="mt-2 text-gray-600">
//             Join thousands of professionals finding their dream jobs
//           </p>
//         </motion.div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
//             <Input
//               id="firstName"
//               type="text"
//               required
//               value={formData.firstName}
//               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//               placeholder="John"
//               className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
//             <Input
//               id="lastName"
//               type="text"
//               required
//               value={formData.lastName}
//               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//               placeholder="Doe"
//               className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="email" className="text-gray-700">Email address</Label>
//           <Input
//             id="email"
//             type="email"
//             required
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             placeholder="john.doe@example.com"
//             className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <Label htmlFor="password" className="text-gray-700">Password</Label>
//           <div className="relative mt-1">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               placeholder="Create a strong password"
//               className="pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
//           <div className="relative mt-1">
//             <Input
//               id="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               required
//               value={formData.confirmPassword}
//               onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//               placeholder="Confirm your password"
//               className="pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//             >
//               {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="terms"
//             checked={formData.acceptTerms}
//             onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
//           />
//           <Label htmlFor="terms" className="text-sm text-gray-700">
//             I agree to the{" "}
//             <Link to="/terms" className="text-blue-600 hover:text-blue-500 transition-colors">
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link to="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors">
//               Privacy Policy
//             </Link>
//           </Label>
//         </div>

//         <Button 
//           type="submit" 
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//           disabled={isLoading || !formData.acceptTerms}
//         >
//           {isLoading ? "Creating Account..." : "Create Account"}
//         </Button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
//             Sign in
//           </Link>
//         </p>
//       </div>

//       <div className="mt-6">
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300" />
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">Or continue with</span>
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-2 gap-3">
//           <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
//             Google
//           </Button>
//           <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
//             LinkedIn
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, User, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getApiUrl } from "@/utils/getUrl"

interface CompanyFormData {
  email: string
  password: string
  confirmPassword: string
  company_name: string
  industry: string
  company_size: string
  website: string
  description: string
  contact_person: string
  phone: string
  address: string
  acceptTerms: boolean
}

interface UserFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: string
  acceptTerms: boolean
}

const Register = () => {
  const [activeTab, setActiveTab] = useState("user")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [userFormData, setUserFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    acceptTerms: false,
  })

  const baseURL=getApiUrl()

  const [companyFormData, setCompanyFormData] = useState<CompanyFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    company_name: "",
    industry: "",
    company_size: "",
    website: "",
    description: "",
    contact_person: "",
    phone: "",
    address: "",
    acceptTerms: false,
  })

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (userFormData.password !== userFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${baseURL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userFormData.email,
          password: userFormData.password,
          // role: userFormData.role,
          role: 'applicant',

        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: data.message,
        })
        // Reset form
        setUserFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          acceptTerms: false,
        })
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (companyFormData.password !== companyFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
    const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: companyFormData.email,
          password: companyFormData.password,
          company_name: companyFormData.company_name,
          industry: companyFormData.industry,
          company_size: companyFormData.company_size,
          website: companyFormData.website,
          description: companyFormData.description,
          contact_person: companyFormData.contact_person,
          phone: companyFormData.phone,
          address: companyFormData.address,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: data.message,
        })
        // Reset form
        setCompanyFormData({
          email: "",
          password: "",
          confirmPassword: "",
          company_name: "",
          industry: "",
          company_size: "",
          website: "",
          description: "",
          contact_person: "",
          phone: "",
          address: "",
          acceptTerms: false,
        })
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join thousands of professionals and companies finding success</p>
        </motion.div>
      </div>

     
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger style={{backgroundColor:activeTab=="user"?'black':'white',color:activeTab=="user"?'white':'black'}} value="user" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Sign Up as User
          </TabsTrigger>
          <TabsTrigger style={{backgroundColor:activeTab!="user"?'black':'white',color:activeTab!="user"?'white':'black'}} value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Register Company
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user">
          <form onSubmit={handleUserSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={userFormData.firstName}
                  onChange={(e) => setUserFormData({ ...userFormData, firstName: e.target.value })}
                  placeholder="John"
                  className="mt-1 bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  value={userFormData.lastName}
                  onChange={(e) => setUserFormData({ ...userFormData, lastName: e.target.value })}
                  placeholder="Doe"
                  className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="user-email" className="text-gray-700">
                Email address
              </Label>
              <Input
                id="user-email"
                type="email"
                required
                value={userFormData.email}
                onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                placeholder="john.doe@example.com"
                className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-gray-700">
                Role
              </Label>
              <Select onValueChange={(value) => setUserFormData({ ...userFormData, role: value })}>
                <SelectTrigger className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job_seeker">Job Seeker</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="hr_manager">HR Manager</SelectItem>
                  <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="user-password" className="text-gray-700">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="user-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                  placeholder="Create a strong password"
                  className="pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="user-confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="user-confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={userFormData.confirmPassword}
                  onChange={(e) => setUserFormData({ ...userFormData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="user-terms"
                checked={userFormData.acceptTerms}
                onCheckedChange={(checked) => setUserFormData({ ...userFormData, acceptTerms: checked as boolean })}
              />
              <Label htmlFor="user-terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading || !userFormData.acceptTerms}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="company">
          <form onSubmit={handleCompanySubmit} className="space-y-6">
            <div>
              <Label htmlFor="company-name" className="text-gray-700">
                Company Name *
              </Label>
              <Input
                id="company-name"
                type="text"
                required
                value={companyFormData.company_name}
                onChange={(e) => setCompanyFormData({ ...companyFormData, company_name: e.target.value })}
                placeholder="Your Company Name"
                className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-email" className="text-gray-700">
                  Email address *
                </Label>
                <Input
                  id="company-email"
                  type="email"
                  required
                  value={companyFormData.email}
                  onChange={(e) => setCompanyFormData({ ...companyFormData, email: e.target.value })}
                  placeholder="company@example.com"
                  className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="contact-person" className="text-gray-700">
                  Contact Person
                </Label>
                <Input
                  id="contact-person"
                  type="text"
                  value={companyFormData.contact_person}
                  onChange={(e) => setCompanyFormData({ ...companyFormData, contact_person: e.target.value })}
                  placeholder="John Doe"
                  className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry" className="text-gray-700">
                  Industry
                </Label>
                <Select onValueChange={(value) => setCompanyFormData({ ...companyFormData, industry: value })}>
                  <SelectTrigger className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="company-size" className="text-gray-700">
                  Company Size
                </Label>
                <Select onValueChange={(value) => setCompanyFormData({ ...companyFormData, company_size: value })}>
                  <SelectTrigger className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website" className="text-gray-700">
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={companyFormData.website}
                  onChange={(e) => setCompanyFormData({ ...companyFormData, website: e.target.value })}
                  placeholder="https://yourcompany.com"
                  className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={companyFormData.phone}
                  onChange={(e) => setCompanyFormData({ ...companyFormData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-700">
                Address
              </Label>
              <Input
                id="address"
                type="text"
                value={companyFormData.address}
                onChange={(e) => setCompanyFormData({ ...companyFormData, address: e.target.value })}
                placeholder="123 Business St, City, State"
                className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-700">
                Company Description
              </Label>
              <Textarea
                id="description"
                value={companyFormData.description}
                onChange={(e) => setCompanyFormData({ ...companyFormData, description: e.target.value })}
                placeholder="Tell us about your company..."
                className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="company-password" className="text-gray-700">
                Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="company-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={companyFormData.password}
                  onChange={(e) => setCompanyFormData({ ...companyFormData, password: e.target.value })}
                  placeholder="Create a strong password"
                  className="pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="company-confirmPassword" className="text-gray-700">
                Confirm Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="company-confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={companyFormData.confirmPassword}
                  onChange={(e) => setCompanyFormData({ ...companyFormData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="company-terms"
                checked={companyFormData.acceptTerms}
                onCheckedChange={(checked) =>
                  setCompanyFormData({ ...companyFormData, acceptTerms: checked as boolean })
                }
              />
              <Label htmlFor="company-terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading || !companyFormData.acceptTerms}
            >
              {isLoading ? "Registering Company..." : "Register Company"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      {/* <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            Google
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            LinkedIn
          </Button>
        </div>
      </div> */}
    </div>
  )
}

export default Register
