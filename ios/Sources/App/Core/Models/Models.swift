import Foundation

// MARK: - Auth

struct LoginRequest: Encodable {
    let email: String
    let password: String
}

struct SignupRequest: Encodable {
    let email: String
    let password: String
    let name: String
    let username: String
    let userType: String
    let acceptedTerms: Bool
}

struct AuthSession: Codable {
    let accessToken: String
    let user: User
}

struct User: Codable, Identifiable, Equatable {
    let id: String
    let email: String
    let name: String
    let username: String
    let userType: String

    var displayName: String { name.isEmpty ? username : name }
    var isCreator: Bool { userType == "creator" }
    var isSponsor: Bool { userType == "sponsor" }
}

private struct LoginResponse: Decodable {
    let user: User
    let accessToken: String
}

private struct MeResponse: Decodable {
    let user: User
}

private struct RefreshResponse: Decodable {
    let accessToken: String
}

// MARK: - Dashboard

struct DashboardSummary: Codable {
    let totalEarningsMnt: Double
    let earningsThisMonth: Double
    let monthOverMonthChange: Double?
    let connectedPlatforms: Int
    let byPlatform: [PlatformEarning]
    let monthlyTrend: [MonthlyTrendPoint]

    var totalEarnings: Double { totalEarningsMnt }
    var monthlyEarnings: Double { earningsThisMonth }
    var monthChange: Double { monthOverMonthChange ?? 0 }
    var platformBreakdown: [PlatformEarning] { byPlatform }
    var monthlyTrends: [MonthlyTrend] {
        monthlyTrend.map { MonthlyTrend(id: $0.month, month: $0.label ?? $0.month, earnings: $0.amountMnt) }
    }
}

struct PlatformEarning: Codable, Identifiable {
    let platform: String
    let totalMnt: Double
    let share: Double

    var id: String { platform }
    var earningsMnt: Double { totalMnt }
    var percentage: Double { share }
    var earnings: Double { totalMnt }
}

struct MonthlyTrendPoint: Codable {
    let month: String
    let label: String?
    let amountMnt: Double
}

struct MonthlyTrend: Codable, Identifiable {
    let id: String
    let month: String
    let earnings: Double
}

// MARK: - Platforms

struct PlatformAccount: Codable, Identifiable {
    let id: String
    let platform: String
    let platformUsername: String
    let followerCount: Int
    let status: String
    let lastSyncedAt: String?

    var type: String { platform }
    var handle: String { platformUsername.replacingOccurrences(of: "@", with: "") }
    var lastSync: String { lastSyncedAt.map { EarnioFormat.shortDate($0) } ?? "Never" }
    var syncStatus: String { status }
}

typealias Platform = PlatformAccount

struct PlatformSyncHistory: Codable, Identifiable {
    let id: String
    let platform: String
    let syncedAt: String
    let status: String
    let recordsSynced: Int?
}

struct ConnectPlatformRequest: Encodable {
    let platform: String
    let platformUsername: String
}

// MARK: - Wallet

struct WalletSummary: Codable {
    let availableBalanceMnt: Double
    let pendingPayoutMnt: Double
    let totalEarnedMnt: Double
    let totalFeesMnt: Double
    let totalPaidOutMnt: Double
    let platformFeeRate: Double
    let minPayoutMnt: Double

    var availableBalance: Double { availableBalanceMnt }
    var pendingPayouts: Double { pendingPayoutMnt }
    var totalEarned: Double { totalEarnedMnt }
    var minimumPayout: Double { minPayoutMnt }
}

struct BankAccount: Codable, Identifiable {
    let id: String
    let accountHolderName: String
    let accountNumber: String
    let bankName: String
    let isDefault: Bool
    let verified: Bool

    var verificationStatus: String { verified ? "verified" : "pending" }
}

struct WalletTransaction: Codable, Identifiable {
    let id: String
    let type: String
    let amountMnt: Double
    let status: String
    let description: String?
    let createdAt: String

    var amount: Double { amountMnt }
    var timestamp: String { createdAt }
}

typealias Transaction = WalletTransaction

struct PayoutRequestBody: Encodable {
    let bankAccountId: String
    let amountMnt: Int
}

// MARK: - Sponsorships

struct SponsorshipListing: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let paymentAmountMnt: Double
    let contentType: String?
    let requiredFollowersMin: Int?
    let requiredFollowersMax: Int?
    let engagementRateMin: Double?
    let deadlineApply: String?
    let deadlineComplete: String?
    let sponsorUserId: String?
    let applicationCount: Int?
    let applicationStatus: String?

    var amount: Double { paymentAmountMnt }
    var minFollowers: Int { requiredFollowersMin ?? 0 }
    var maxFollowers: Int { requiredFollowersMax ?? 0 }
    var minEngagementRate: Double { engagementRateMin ?? 0 }
    var applicationDeadline: String { deadlineApply ?? "" }
    var completionDeadline: String { deadlineComplete ?? "" }
    var applicantCount: Int { applicationCount ?? 0 }
}

typealias Sponsorship = SponsorshipListing

struct SponsorshipApplication: Codable, Identifiable {
    let id: String
    let sponsorshipId: String
    let status: String
    let responseText: String?
    let appliedAt: String?
    let sponsorship: SponsorshipListing?

    var response: String { responseText ?? "" }
}

struct ApplySponsorshipRequest: Encodable {
    let sponsorshipId: String
    let responseText: String
}

// MARK: - Sponsor

struct SponsorDashboardStats: Codable {
    let activeCampaigns: Int
    let totalCampaigns: Int
    let pendingApplications: Int
    let totalApplications: Int
    let totalBudgetMnt: Double

    var activeBudget: Double { totalBudgetMnt }
}

typealias SponsorDashboard = SponsorDashboardStats

struct Campaign: Codable, Identifiable {
    let id: String
    let title: String
    let description: String
    let paymentAmountMnt: Double
    let contentType: String?
    let requiredFollowersMin: Int?
    let requiredFollowersMax: Int?
    let engagementRateMin: Double?
    let status: String
    let deadlineApply: String?
    let deadlineComplete: String?
    let createdAt: String?
    let applicationCount: Int?
    let pendingCount: Int?

    var amountPerCreator: Double { paymentAmountMnt }
    var minFollowers: Int { requiredFollowersMin ?? 0 }
    var maxFollowers: Int { requiredFollowersMax ?? 0 }
    var minEngagementRate: Double { engagementRateMin ?? 0 }
    var applicationDeadline: String { deadlineApply ?? "" }
    var completionDeadline: String { deadlineComplete ?? "" }
    var applications: [CampaignApplication]? { nil }
}

struct CreateCampaignRequest: Encodable {
    let title: String
    let description: String
    let paymentAmountMnt: Int
    let contentType: String
    let requiredFollowersMin: Int?
    let requiredFollowersMax: Int?
    let engagementRateMin: Double?
    let deadlineApply: String?
    let deadlineComplete: String?
}

struct CampaignDetailResponse: Decodable {
    let campaign: Campaign
    let applications: [CampaignApplication]
}

struct CampaignApplicationCreator: Codable {
    let id: String
    let name: String
    let username: String
}

struct CampaignApplication: Codable, Identifiable {
    let id: String
    let sponsorshipId: String
    let status: String
    let responseText: String?
    let sponsorNotes: String?
    let appliedAt: String?
    let creator: CampaignApplicationCreator?

    var campaignId: String { sponsorshipId }
    var creatorId: String { creator?.id ?? "" }
    var creatorName: String { creator?.name ?? "Creator" }
    var creatorHandle: String { creator?.username ?? "" }
    var response: String { responseText ?? "" }
    var followerCount: Int { 0 }
    var engagementRate: Double { 0 }
}

struct UpdateApplicationRequest: Encodable {
    let status: String
    let sponsorNotes: String?
}

struct UpdateCampaignStatusRequest: Encodable {
    let status: String
}

struct AddBankAccountRequest: Encodable {
    let bankName: String
    let accountNumber: String
    let accountHolderName: String
    let setAsDefault: Bool
}

// MARK: - Notifications

struct AppNotification: Codable, Identifiable {
    let id: String
    let type: String
    let title: String
    let body: String
    let readAt: String?
    let createdAt: String

    var message: String { body }
    var read: Bool { readAt != nil }
    var relatedId: String? { nil }
}

typealias Notification = AppNotification

struct NotificationsListResponse: Decodable {
    let notifications: [AppNotification]
    let unreadCount: Int
}

// MARK: - API envelope helpers

struct MessageResponse: Decodable {
    let message: String
}

struct APIErrorBody: Decodable {
    let error: String?
}
