
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
  const [emailSettings, setEmailSettings] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    newsletter: false,
    marketingEmails: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false
  });

  const handleEmailChange = (key: string, value: boolean) => {
    setEmailSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-600">Manage your account preferences and privacy settings</p>
        </div>

        {/* Account Information */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="john.doe@example.com" 
                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input 
                id="currentPassword" 
                type="password" 
                placeholder="Enter current password" 
                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                type="password" 
                placeholder="Enter new password" 
                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm new password" 
                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Update Account Information</Button>
          </CardContent>
        </Card>

        {/* Email Preferences */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="jobAlerts">Job Alerts</Label>
                <p className="text-sm text-slate-600">Receive notifications about new job matches</p>
              </div>
              <Switch 
                id="jobAlerts" 
                checked={emailSettings.jobAlerts} 
                onCheckedChange={(checked) => handleEmailChange('jobAlerts', checked)} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="applicationUpdates">Application Updates</Label>
                <p className="text-sm text-slate-600">Get notified about your application status</p>
              </div>
              <Switch 
                id="applicationUpdates" 
                checked={emailSettings.applicationUpdates} 
                onCheckedChange={(checked) => handleEmailChange('applicationUpdates', checked)} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-slate-600">Receive our weekly job market insights</p>
              </div>
              <Switch 
                id="newsletter" 
                checked={emailSettings.newsletter} 
                onCheckedChange={(checked) => handleEmailChange('newsletter', checked)} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-slate-600">Promotional content and special offers</p>
              </div>
              <Switch 
                id="marketingEmails" 
                checked={emailSettings.marketingEmails} 
                onCheckedChange={(checked) => handleEmailChange('marketingEmails', checked)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profileVisible">Profile Visibility</Label>
                <p className="text-sm text-slate-600">Make your profile visible to employers</p>
              </div>
              <Switch 
                id="profileVisible" 
                checked={privacySettings.profileVisible} 
                onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showEmail">Show Email Address</Label>
                <p className="text-sm text-slate-600">Display email on your public profile</p>
              </div>
              <Switch 
                id="showEmail" 
                checked={privacySettings.showEmail} 
                onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showPhone">Show Phone Number</Label>
                <p className="text-sm text-slate-600">Display phone number on your public profile</p>
              </div>
              <Switch 
                id="showPhone" 
                checked={privacySettings.showPhone} 
                onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-red-600">Delete Account</h3>
                <p className="text-sm text-slate-600">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Link to="/profile/delete">
                <Button variant="destructive">Delete Account</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
