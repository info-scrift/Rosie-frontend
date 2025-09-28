import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MapPin, DollarSign, Briefcase, Save } from "lucide-react";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { AnimatedCard } from "@/components/ui/animated-card";
import { getOwnJobById, updateJob, type CreateOrUpdateJobPayload } from "@/services/companyservice";

const EMPLOYMENT_TYPES: Array<CreateOrUpdateJobPayload["employment_type"]> = ["Onsite", "Hybrid", "Remote"];
const JOB_TYPES: Array<CreateOrUpdateJobPayload["job_type"]> = ["Full-time", "Part-time", "Internship", "Contract"];

const toArray = (v: unknown): string[] => {
  if (v == null) return [];
  if (Array.isArray(v)) return v.map(String).map(s => s.trim()).filter(Boolean);
  return String(v).split(/\r?\n|,|;|•|-/g).map(s => s.trim()).filter(Boolean);
};

export default function EditJob(): JSX.Element {
  const { jobId = "" } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<CreateOrUpdateJobPayload>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Textareas want strings; we memoize joins from arrays
  const requirementsText = useMemo(() => (form.requirements ?? []).join("\n"), [form.requirements]);
  const responsibilitiesText = useMemo(() => (form.responsibilities ?? []).join("\n"), [form.responsibilities]);
  const benefitsText = useMemo(() => (form.benefits ?? []).join("\n"), [form.benefits]);
  const tagsText = useMemo(() => (form.tags ?? []).join(", "), [form.tags]);

  useEffect(() => {
    if (!jobId) return;
    (async () => {
      try {
        setLoading(true);
        const j = await getOwnJobById(jobId);
        setForm({
          title: j.title,
          description: j.description,
          location: j.location,
          employment_type: j.employment_type,
          job_type: j.job_type,
          salary_min: j.salary_min ?? undefined,
          salary_max: j.salary_max ?? undefined,
          industry: j.industry ?? undefined,
          requirements: j.requirements ?? [],
          responsibilities: j.responsibilities ?? [],
          benefits: j.benefits ?? [],
          tags: j.tags ?? [],
          featured: !!j.featured,
          urgent: !!j.urgent,
        });
      } catch (e: any) {
        setErr(e?.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);

  async function onSave() {
    try {
      setSaving(true);
      // Normalize text inputs → payload shape
      const payload: CreateOrUpdateJobPayload = {
        ...form,
        salary_min: form.salary_min != null ? Number(form.salary_min) : null,
        salary_max: form.salary_max != null ? Number(form.salary_max) : null,
      };
      await updateJob(jobId, payload);
      // optionally toast
      navigate(`/client/portal/jobs/${jobId}`);
    } catch (e: any) {
      setErr(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!jobId) {
    return <div className="text-sm text-red-600">Missing job id in route.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <FadeInSection>
        <div className="flex justify-between items-start mb-2">
          <div>
            <motion.h1
              className="text-4xl font-display font-bold text-gradient mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Edit Job Posting
            </motion.h1>
            {err && <div className="text-sm text-red-600">{err}</div>}
          </div>
          <div className="flex space-x-3">
            <Button onClick={onSave} disabled={saving || loading} className="bg-gradient-primary hover:shadow-lg">
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          <FadeInSection delay={0.1}>
            <AnimatedCard className="card-hover">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardTitle className="font-display flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={form.title ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={form.industry ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location *
                    </Label>
                    <Input
                      id="location"
                      value={form.location ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Employment Type *
                    </Label>
                    <Select
                      value={form.employment_type ?? undefined}
                      onValueChange={(v) => setForm((f) => ({ ...f, employment_type: v as any }))}
                    >
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>
                        {EMPLOYMENT_TYPES.map((t) => (
                          <SelectItem key={t} value={t!}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Job Type *</Label>
                    <Select
                      value={form.job_type ?? undefined}
                      onValueChange={(v) => setForm((f) => ({ ...f, job_type: v as any }))}
                    >
                      <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                      <SelectContent>
                        {JOB_TYPES.map((t) => (
                          <SelectItem key={t} value={t!}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Salary Range (Annual)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Min"
                        inputMode="numeric"
                        value={form.salary_min ?? ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, salary_min: e.target.value === "" ? undefined : Number(e.target.value) }))
                        }
                      />
                      <Input
                        placeholder="Max"
                        inputMode="numeric"
                        value={form.salary_max ?? ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, salary_max: e.target.value === "" ? undefined : Number(e.target.value) }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={form.description ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  />
                </div>
              </CardContent>
            </AnimatedCard>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <AnimatedCard className="card-hover">
              <CardHeader>
                <CardTitle className="font-display">Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Requirements (one per line)</Label>
                  <Textarea
                    rows={4}
                    value={requirementsText}
                    onChange={(e) => setForm((f) => ({ ...f, requirements: toArray(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Responsibilities (one per line)</Label>
                  <Textarea
                    rows={4}
                    value={responsibilitiesText}
                    onChange={(e) => setForm((f) => ({ ...f, responsibilities: toArray(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Benefits (one per line)</Label>
                  <Textarea
                    rows={3}
                    value={benefitsText}
                    onChange={(e) => setForm((f) => ({ ...f, benefits: toArray(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tags (comma separated)</Label>
                  <Textarea
                    rows={2}
                    value={tagsText}
                    onChange={(e) => setForm((f) => ({ ...f, tags: toArray(e.target.value) }))}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured</Label>
                    <Switch
                      id="featured"
                      checked={!!form.featured}
                      onCheckedChange={(v) => setForm((f) => ({ ...f, featured: v }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="urgent">Urgent</Label>
                    <Switch
                      id="urgent"
                      checked={!!form.urgent}
                      onCheckedChange={(v) => setForm((f) => ({ ...f, urgent: v }))}
                    />
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </FadeInSection>
        </div>

        {/* Sidebar (optional metrics slot kept empty for now) */}
        <div className="space-y-6" />
      </div>
    </div>
  );
}
