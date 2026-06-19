import Foundation

final class MockAPIClient: EarnioAPI {
    private var currentUser: User = MockData.creator
    private var accessToken = "demo-token"

    func login(email: String, password: String) async throws -> AuthSession {
        try await delay()
        if password.count < 4 {
            throw APIError.custom("Invalid email or password")
        }
        currentUser = email.contains("sponsor") ? MockData.sponsor : MockData.creator
        return AuthSession(accessToken: accessToken, user: currentUser)
    }

    func signup(email: String, password: String, name: String, username: String, userType: String) async throws -> AuthSession {
        try await delay()
        currentUser = User(
            id: UUID().uuidString,
            email: email,
            name: name,
            username: username,
            userType: userType
        )
        return AuthSession(accessToken: accessToken, user: currentUser)
    }

    func getCurrentUser() async throws -> User {
        try await delay(short: true)
        return currentUser
    }

    func logout() async throws {
        try await delay(short: true)
    }

    func refreshAccessToken() async throws -> String {
        try await delay(short: true)
        return accessToken
    }

    func deleteAccount(password: String) async throws {
        try await delay()
        guard !password.isEmpty else { throw APIError.custom("Password required") }
    }

    func getDashboardSummary() async throws -> DashboardSummary {
        try await delay()
        return MockData.dashboard
    }

    func getPlatforms() async throws -> [PlatformAccount] {
        try await delay()
        return MockData.platforms
    }

    func connectPlatform(platform: String, username: String) async throws -> PlatformAccount {
        try await delay()
        return PlatformAccount(
            id: UUID().uuidString,
            platform: platform,
            platformUsername: username.hasPrefix("@") ? username : "@\(username)",
            followerCount: 5_000,
            status: "connected",
            lastSyncedAt: ISO8601DateFormatter().string(from: Date())
        )
    }

    func syncPlatform(id: String) async throws -> PlatformAccount {
        try await delay()
        return MockData.platforms.first { $0.id == id } ?? MockData.platforms[0]
    }

    func getPlatformSyncHistory() async throws -> [PlatformSyncHistory] {
        try await delay()
        return [
            PlatformSyncHistory(id: "h1", platform: "tiktok", syncedAt: "2026-06-18T10:00:00Z", status: "ok", recordsSynced: 3),
        ]
    }

    func getWalletSummary() async throws -> WalletSummary {
        try await delay()
        return MockData.wallet
    }

    func getBankAccounts() async throws -> [BankAccount] {
        try await delay()
        return MockData.bankAccounts
    }

    func addBankAccount(accountHolderName: String, accountNumber: String, bankName: String) async throws -> BankAccount {
        try await delay()
        return BankAccount(
            id: UUID().uuidString,
            accountHolderName: accountHolderName,
            accountNumber: "•••• \(accountNumber.suffix(4))",
            bankName: bankName,
            isDefault: MockData.bankAccounts.isEmpty,
            verified: false
        )
    }

    func setDefaultBankAccount(id: String) async throws {
        try await delay(short: true)
    }

    func getTransactions() async throws -> [WalletTransaction] {
        try await delay()
        return MockData.transactions
    }

    func requestPayout(bankAccountId: String, amountMnt: Int) async throws -> WalletTransaction {
        try await delay()
        guard amountMnt >= 50_000 else { throw APIError.custom("Minimum payout is ₮50,000") }
        return WalletTransaction(
            id: UUID().uuidString,
            type: "payout",
            amountMnt: Double(amountMnt),
            status: "pending",
            description: "Payout requested",
            createdAt: ISO8601DateFormatter().string(from: Date())
        )
    }

    func getSponsorships() async throws -> [SponsorshipListing] {
        try await delay()
        return MockData.sponsorships
    }

    func getSponsorship(id: String) async throws -> SponsorshipListing {
        try await delay()
        guard let item = MockData.sponsorships.first(where: { $0.id == id }) else {
            throw APIError.notFound
        }
        return item
    }

    func applySponsorship(sponsorshipId: String, responseText: String) async throws -> SponsorshipApplication {
        try await delay()
        return SponsorshipApplication(
            id: UUID().uuidString,
            sponsorshipId: sponsorshipId,
            status: "pending",
            responseText: responseText,
            appliedAt: ISO8601DateFormatter().string(from: Date()),
            sponsorship: MockData.sponsorships.first { $0.id == sponsorshipId }
        )
    }

    func getMyApplications() async throws -> [SponsorshipApplication] {
        try await delay()
        return MockData.myApplications
    }

    func getSponsorDashboard() async throws -> SponsorDashboardStats {
        try await delay()
        return MockData.sponsorDashboard
    }

    func getCampaigns() async throws -> [Campaign] {
        try await delay()
        return MockData.campaigns
    }

    func createCampaign(_ request: CreateCampaignRequest) async throws -> Campaign {
        try await delay()
        return Campaign(
            id: UUID().uuidString,
            title: request.title,
            description: request.description,
            paymentAmountMnt: Double(request.paymentAmountMnt),
            contentType: request.contentType,
            requiredFollowersMin: request.requiredFollowersMin,
            requiredFollowersMax: request.requiredFollowersMax,
            engagementRateMin: request.engagementRateMin,
            status: "active",
            deadlineApply: request.deadlineApply,
            deadlineComplete: request.deadlineComplete,
            createdAt: ISO8601DateFormatter().string(from: Date()),
            applicationCount: 0,
            pendingCount: 0
        )
    }

    func getCampaignDetail(id: String) async throws -> CampaignDetailResponse {
        try await delay()
        let campaign = MockData.campaigns.first { $0.id == id } ?? MockData.campaigns[0]
        return CampaignDetailResponse(campaign: campaign, applications: MockData.campaignApplications)
    }

    func updateCampaignStatus(id: String, status: String) async throws {
        try await delay(short: true)
    }

    func deleteCampaign(id: String) async throws {
        try await delay(short: true)
    }

    func updateApplicationStatus(applicationId: String, status: String, notes: String?) async throws {
        try await delay()
    }

    func getNotifications() async throws -> [AppNotification] {
        try await delay()
        return MockData.notifications
    }

    func markNotificationAsRead(id: String) async throws {
        try await delay(short: true)
    }

    func markAllNotificationsAsRead() async throws {
        try await delay(short: true)
    }

    private func delay(short: Bool = false) async throws {
        try await Task.sleep(nanoseconds: short ? 150_000_000 : 350_000_000)
    }
}
