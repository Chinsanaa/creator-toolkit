import Foundation

/// Facade used by views. Switches between demo and live backend.
@MainActor
final class APIService {
    static let shared = APIService()

    private let liveClient = LiveAPIClient()
    private let mockClient = MockAPIClient()

    private var client: EarnioAPI {
        AppConfig.isDemoMode ? mockClient : liveClient
    }

    func setAccessToken(_ token: String?) {
        liveClient.setAccessToken(token)
    }

    func clearTokens() {
        liveClient.setAccessToken(nil)
    }

    // MARK: - Auth

    func login(email: String, password: String) async throws -> AuthSession {
        try await client.login(email: email, password: password)
    }

    func signup(email: String, password: String, name: String, username: String, userType: String) async throws -> AuthSession {
        try await client.signup(email: email, password: password, name: name, username: username, userType: userType)
    }

    func getCurrentUser() async throws -> User {
        try await client.getCurrentUser()
    }

    func logout() async throws {
        try await client.logout()
        clearTokens()
    }

    func refreshAccessToken() async throws -> String {
        try await client.refreshAccessToken()
    }

    func deleteAccount(password: String) async throws {
        try await client.deleteAccount(password: password)
    }

    // MARK: - Dashboard

    func getDashboardSummary() async throws -> DashboardSummary {
        try await client.getDashboardSummary()
    }

    // MARK: - Platforms

    func getPlatforms() async throws -> [PlatformAccount] {
        try await client.getPlatforms()
    }

    func connectPlatform(type: String, handle: String) async throws -> PlatformAccount {
        try await client.connectPlatform(platform: type, username: handle)
    }

    func syncPlatform(id: String) async throws -> PlatformAccount {
        try await client.syncPlatform(id: id)
    }

    func getPlatformSyncHistory() async throws -> [PlatformSyncHistory] {
        try await client.getPlatformSyncHistory()
    }

    // MARK: - Wallet

    func getWalletSummary() async throws -> WalletSummary {
        try await client.getWalletSummary()
    }

    func getBankAccounts() async throws -> [BankAccount] {
        try await client.getBankAccounts()
    }

    func addBankAccount(accountHolderName: String, accountNumber: String, bankName: String) async throws -> BankAccount {
        try await client.addBankAccount(accountHolderName: accountHolderName, accountNumber: accountNumber, bankName: bankName)
    }

    func setDefaultBankAccount(id: String) async throws {
        try await client.setDefaultBankAccount(id: id)
    }

    func getTransactions() async throws -> [WalletTransaction] {
        try await client.getTransactions()
    }

    func requestPayout(bankAccountId: String, amountMnt: Int) async throws -> WalletTransaction {
        try await client.requestPayout(bankAccountId: bankAccountId, amountMnt: amountMnt)
    }

    // MARK: - Sponsorships

    func getSponsorships(page: Int = 1, limit: Int = 20) async throws -> [SponsorshipListing] {
        _ = page
        _ = limit
        return try await client.getSponsorships()
    }

    func getSponsorship(id: String) async throws -> SponsorshipListing {
        try await client.getSponsorship(id: id)
    }

    func applySponsorshipApplication(sponsorshipId: String, response: String) async throws -> SponsorshipApplication {
        try await client.applySponsorship(sponsorshipId: sponsorshipId, responseText: response)
    }

    func getMyApplications(page: Int = 1, limit: Int = 20) async throws -> [SponsorshipApplication] {
        _ = page
        _ = limit
        return try await client.getMyApplications()
    }

    // MARK: - Sponsor

    func getSponsorDashboard() async throws -> SponsorDashboardStats {
        try await client.getSponsorDashboard()
    }

    func getCampaigns(status: String? = nil, page: Int = 1, limit: Int = 20) async throws -> [Campaign] {
        _ = status
        _ = page
        _ = limit
        return try await client.getCampaigns()
    }

    func createCampaign(title: String, description: String, amountPerCreator: Double, contentType: String, minFollowers: Int, maxFollowers: Int, minEngagementRate: Double, applicationDeadline: String, completionDeadline: String) async throws -> Campaign {
        let request = CreateCampaignRequest(
            title: title,
            description: description,
            paymentAmountMnt: Int(amountPerCreator),
            contentType: contentType,
            requiredFollowersMin: minFollowers,
            requiredFollowersMax: maxFollowers,
            engagementRateMin: minEngagementRate,
            deadlineApply: applicationDeadline.isEmpty ? nil : applicationDeadline,
            deadlineComplete: completionDeadline.isEmpty ? nil : completionDeadline
        )
        return try await client.createCampaign(request)
    }

    func getCampaign(id: String) async throws -> Campaign {
        let detail = try await client.getCampaignDetail(id: id)
        return detail.campaign
    }

    func getCampaignDetail(id: String) async throws -> CampaignDetailResponse {
        try await client.getCampaignDetail(id: id)
    }

    func updateCampaignStatus(id: String, status: String) async throws -> Campaign {
        try await client.updateCampaignStatus(id: id, status: status)
        return try await getCampaign(id: id)
    }

    func deleteCampaign(id: String) async throws {
        try await client.deleteCampaign(id: id)
    }

    func updateApplicationStatus(applicationId: String, status: String, notes: String? = nil) async throws -> CampaignApplication {
        try await client.updateApplicationStatus(applicationId: applicationId, status: status, notes: notes)
        return CampaignApplication(
            id: applicationId,
            sponsorshipId: "",
            status: status,
            responseText: nil,
            sponsorNotes: notes,
            appliedAt: nil,
            creator: nil
        )
    }

    // MARK: - Notifications

    func getNotifications(page: Int = 1, limit: Int = 20) async throws -> [AppNotification] {
        _ = page
        _ = limit
        return try await client.getNotifications()
    }

    func markNotificationAsRead(id: String) async throws -> AppNotification {
        try await client.markNotificationAsRead(id: id)
        let list = try await client.getNotifications()
        return list.first { $0.id == id } ?? AppNotification(
            id: id, type: "info", title: "", body: "", readAt: ISO8601DateFormatter().string(from: Date()), createdAt: ""
        )
    }

    func markAllNotificationsAsRead() async throws {
        try await client.markAllNotificationsAsRead()
    }
}

enum APIError: LocalizedError {
    case invalidURL
    case invalidResponse
    case decodingError
    case networkError(Error)
    case serverError(Int, String)
    case unauthorized
    case notFound
    case custom(String)

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "Invalid URL"
        case .invalidResponse: return "Invalid response from server"
        case .decodingError: return "Failed to decode response"
        case .networkError(let error): return "Network error: \(error.localizedDescription)"
        case .serverError(let code, let message): return "Server error (\(code)): \(message)"
        case .unauthorized: return "Unauthorized. Please log in again."
        case .notFound: return "Resource not found"
        case .custom(let message): return message
        }
    }
}
