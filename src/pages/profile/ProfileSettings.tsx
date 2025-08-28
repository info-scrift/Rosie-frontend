
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { changeApplicantPassword, getApplicantProfile, deleteApplicantProfileApi } from "@/services/userservice/applicant";
import { SweetAlert } from "@/components/ui/SweetAlert";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [canConfirm, setCanConfirm] = useState(false);

  const navigate = useNavigate();

  // open/close helpers
  const openDeleteModal = () => {
    setDeleteOpen(true);
    setSecondsLeft(10);
    setCanConfirm(false);
  };
  const closeDeleteModal = () => setDeleteOpen(false);

  // countdown effect
  useEffect(() => {
    if (!deleteOpen) return;
    setSecondsLeft(10);
    setCanConfirm(false);

    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setCanConfirm(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [deleteOpen]);

  const [emailSettings, setEmailSettings] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    newsletter: false,
    marketingEmails: false
  });

  const [alert, setAlert] = useState<{
    open: boolean;
    title: string;
    message?: string;
    variant?: "success" | "error" | "info" | "warning";
  }>({ open: false, title: "", message: "", variant: "info" });

  const closeAlert = () => setAlert((a) => ({ ...a, open: false }));
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false
  });
  const handleConfirmDelete = async () => {
    try {
      // call backend
      await deleteApplicantProfileApi();
      setAlert({
        open: true,
        title: "Account deleted",
        message: "Your profile was deleted successfully.",
        variant: "success",
      });
      setDeleteOpen(false);

      // Optionally: clear auth state here if you store tokens somewhere

      // Send them away (home or login)
      navigate("/login");
    } catch (err: any) {
      console.error(err);

      if (err.message?.includes("401")) {
        setAlert({
          open: true,
          title: "Session expired",
          message: "Please log in again.",
          variant: "error",
        });
      } else {
        // Try to show a clean message if backend included JSON
        let cleanMessage = "Failed to delete profile.";
        try {
          const raw = err?.message || "";
          const start = raw.indexOf("{");
          const end = raw.lastIndexOf("}");
          if (start !== -1 && end !== -1 && end > start) {
            const parsed = JSON.parse(raw.slice(start, end + 1));
            if (parsed?.message) cleanMessage = parsed.message;
          }
        } catch { }
        setAlert({
          open: true,
          title: "Error",
          message: cleanMessage,
          variant: "error",
        });
      }
    }
  };

  const handleUpdateAccount = async () => {
    if (passwordError) return; // stop if mismatch

    try {
      setSaving(true);
      await changeApplicantPassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setAlert({
        open: true,
        title: "Success",
        message: "Password updated successfully!",
        variant: "success",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    catch (err: any) {
      console.error(err);

      if (err.message?.includes("401")) {
        setAlert({
          open: true,
          title: "Session expired",
          message: "Please log in again.",
          variant: "error",
        });
      } else if (err.message?.toLowerCase().includes("current password")) {
        setAlert({
          open: true,
          title: "Wrong password",
          message: "Your current password is incorrect.",
          variant: "error",
        });
      } else {
        setAlert({
          open: true,
          title: "Error",
          message: err?.message || "Failed to update password.",
          variant: "error",
        });
      }
    }
    finally {
      setSaving(false);
    }
  };


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
  const validatePasswords = (np: string, cp: string) => {
    if (!np || !cp) return setPasswordError(null);
    setPasswordError(np === cp ? null : "Passwords do not match");
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
                disabled
                defaultValue="john.doe@example.com"
                className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              {/* Current Password */}
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700"
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>


              {/* New Password */}
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    const v = e.target.value;
                    setNewPassword(v);
                    validatePasswords(v, confirmPassword);
                  }}
                  className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700"
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>


              {/* Confirm New Password */}
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    const v = e.target.value;
                    setConfirmPassword(v);
                    validatePasswords(newPassword, v);
                  }}
                  className="mt-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>


            </div>

            {passwordError && (
              <p className="text-sm text-red-600 mt-1">{passwordError}</p>
            )}
            {/* <Button className="bg-blue-600 hover:bg-blue-700">Update Account Information</Button> */}
            <Button
              onClick={handleUpdateAccount}
              disabled={
                saving || !currentPassword || !newPassword || !confirmPassword || !!passwordError
              }
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Updating…" : "Update Account Information"}
            </Button>

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
        <SweetAlert
          open={alert.open}
          title={alert.title}
          message={alert.message}
          variant={alert.variant}
          confirmText="OK"
          onConfirm={closeAlert}
          onClose={closeAlert}
        />
        {/* Delete confirmation modal */}
        {deleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={closeDeleteModal}
              aria-hidden="true"
            />
            {/* Dialog */}
            <div className="relative z-50 w-[90%] max-w-md rounded-xl bg-white shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Delete Account</h2>
              <p className="text-slate-600">
                Are you sure you want to delete your profile? This action cannot be undone.
              </p>

              {!canConfirm ? (
                <p className="mt-4 text-sm text-slate-500">
                  You can confirm in <span className="font-semibold">{secondsLeft}</span> second{secondsLeft === 1 ? "" : "s"}…
                </p>
              ) : (
                <p className="mt-4 text-sm text-red-600">
                  You can confirm now. This will permanently delete your profile.
                </p>
              )}

              <div className="mt-6 flex items-center justify-end gap-2">
                <Button variant="outline" onClick={closeDeleteModal}>
                  No, keep it
                </Button>
                <Button
                  variant="destructive"
                  disabled={!canConfirm}
                  onClick={handleConfirmDelete}
                >
                  {canConfirm ? "Yes, delete" : `Please wait (${secondsLeft})`}
                </Button>
              </div>
            </div>
          </div>
        )}

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
              <Button variant="destructive" onClick={openDeleteModal}>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
