export type ApplicantProfile = {
    id: string;
    user_id?: string | null;
  
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  
    date_of_birth?: string | null;
    phone?: string | null;
    address?: string | null;
  
    skills: string[] | null;
    experience_years: number | null;
  
    resume_url?: string | null;
    resume_data?: unknown;
  
    Professional_Bio?: string | null;
    Curent_Job_Title?: string | null;
    Portfolio_link?: string | null;
    Linkedin_Profile?: string | null;
    photo_url?: string | null;
  
    created_at?: string | null;
  };
  