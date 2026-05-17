export interface SponsorDashboardStats {
  activeCampaigns: number;
  totalCampaigns: number;
  pendingApplications: number;
  totalApplications: number;
  totalBudgetMnt: number;
}

export interface SponsorCampaign {
  id: string;
  title: string;
  description: string;
  payment_amount_mnt: number;
  content_type: string | null;
  required_followers_min: number | null;
  required_followers_max: number | null;
  engagement_rate_min: number | null;
  status: string;
  deadline_apply: string | null;
  deadline_complete: string | null;
  created_at: string | null;
  applicationCount: number;
  pendingCount: number;
}

export interface SponsorApplication {
  id: string;
  sponsorship_id: string;
  status: string;
  response_text: string | null;
  sponsor_notes: string | null;
  applied_at: string | null;
  creator: {
    id: string;
    name: string;
    username: string;
  } | null;
}
