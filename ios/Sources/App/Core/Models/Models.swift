import Foundation

// MARK: - Authentication Models

struct LoginRequest: Codable {
    let email: String
    let password: String
}

struct SignupRequest: Codable {
    let email: String
    let password: String
    let userType: String // "creator" or "sponsor"
    let firstName: String
    let lastName: String
}

struct AuthResponse: Codable {
    let accessToken: String
    let refreshToken: String
    let user: User
}

struct User: Codable, Identifiable {
    let id: String
    let email: String
    let firstName: String
    let lastName: String
    let userType: String // "creator" or "sponsor"
    let avatar: String?
    let createdAt: String
}

// MARK: - Dashboard Models

struct DashboardSummary: Codable {
    let totalEarnings: Double
    let monthlyEarnings: Double
    let monthChange: Double
    let connectedPlatforms: Int
    let platformBreakdown: [PlatformEarning]
    let monthlyTrends: [MonthlyTrend]
}

struct PlatformEarning: Codable, Identifiable {
    let id: String
    let platform: String // "tiktok", "youtube", "instagram"
    let earnings: Double
    let percentage: Double
}

struct MonthlyTrend: Codable, Identifiable {
    let id: String
    let month: String
    let earnings: Double
}

// MARK: - Platform Models

struct Platform: Codable, Identifiable {
    let id: String
    let type: String // "tiktok", "youtube", "instagram"
    let handle: String
    let followerCount: Int
    let lastSync: String
    let syncStatus: String // "synced", "syncing", "failed"
}

struct PlatformSyncHistory: Codable, Identifiable {
    let id: String
    let platform: String
    let timestamp: String
    let status: String
    let followerCount: Int
}

// MARK: - Wallet Models

struct WalletSummary: Codable {
    let availableBalance: Double
    let pendingPayouts: Double
    let totalEarned: Double
    let platformFeeRate: Double
    let minimumPayout: Double
}

struct BankAccount: Codable, Identifiable {
    let id: String
    let accountHolderName: String
    let accountNumber: String
    let bankName: String
    let isDefault: Bool
    let verificationStatus: String // "pending", "verified", "failed"
}

struct Transaction: Codable, Identifiable {
    let id: String
    let type: String // "sponsorship_credit", "earning_credit", "payout", "adjustment"
    let amount: Double
    let status: String // "pending", "completed", "failed"
    let description: String
    let timestamp: String
    let relatedId: String?
}

struct PayoutRequest: Codable {
    let bankAccountId: String
    let amount: Double
}

// MARK: - Sponsorship Models

struct Sponsorship: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let amount: Double
    let contentType: String
    let minFollowers: Int
    let maxFollowers: Int
    let minEngagementRate: Double
    let applicationDeadline: String
    let completionDeadline: String
    let sponsorId: String
    let applicantCount: Int
    let createdAt: String
    var applicationStatus: String? // "pending", "approved", "rejected", "completed", "paid"
}

struct SponsorshipApplication: Codable, Identifiable {
    let id: String
    let sponsorshipId: String
    let creatorId: String
    let response: String
    let status: String // "pending", "approved", "rejected", "completed", "paid"
    let appliedAt: String
    let sponsorship: Sponsorship?
}

// MARK: - Campaign Models

struct Campaign: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let amountPerCreator: Double
    let contentType: String
    let minFollowers: Int
    let maxFollowers: Int
    let minEngagementRate: Double
    let applicationDeadline: String
    let completionDeadline: String
    let status: String // "draft", "published", "closed"
    let createdAt: String
    let applications: [CampaignApplication]?
}

struct CampaignApplication: Codable, Identifiable {
    let id: String
    let creatorId: String
    let campaignId: String
    let creatorName: String
    let creatorHandle: String
    let followerCount: Int
    let engagementRate: Double
    let response: String
    let status: String // "pending", "approved", "rejected"
    let appliedAt: String
}

struct SponsorDashboard: Codable {
    let activeCampaigns: Int
    let totalCampaigns: Int
    let pendingApplications: Int
    let activeBudget: Double
}

// MARK: - Notification Models

struct Notification: Codable, Identifiable {
    let id: String
    let type: String
    let title: String
    let message: String
    let read: Bool
    let relatedId: String?
    let createdAt: String
}

// MARK: - Documentation Models

struct DocPage: Codable, Identifiable {
    let id: String
    let slug: String
    let title: String
    let content: String
    let category: String
}

// MARK: - API Response Models

struct ApiResponse<T: Codable>: Codable {
    let success: Bool
    let data: T?
    let message: String?
    let error: String?
}

struct PaginatedResponse<T: Codable>: Codable {
    let items: [T]
    let total: Int
    let page: Int
    let pageSize: Int
}
