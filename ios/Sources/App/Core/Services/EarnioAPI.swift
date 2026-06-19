import Foundation

protocol EarnioAPI {
    func login(email: String, password: String) async throws -> AuthSession
    func signup(email: String, password: String, name: String, username: String, userType: String) async throws -> AuthSession
    func getCurrentUser() async throws -> User
    func logout() async throws
    func refreshAccessToken() async throws -> String
    func deleteAccount(password: String) async throws

    func getDashboardSummary() async throws -> DashboardSummary
    func getPlatforms() async throws -> [PlatformAccount]
    func connectPlatform(platform: String, username: String) async throws -> PlatformAccount
    func syncPlatform(id: String) async throws -> PlatformAccount
    func getPlatformSyncHistory() async throws -> [PlatformSyncHistory]

    func getWalletSummary() async throws -> WalletSummary
    func getBankAccounts() async throws -> [BankAccount]
    func addBankAccount(accountHolderName: String, accountNumber: String, bankName: String) async throws -> BankAccount
    func setDefaultBankAccount(id: String) async throws
    func getTransactions() async throws -> [WalletTransaction]
    func requestPayout(bankAccountId: String, amountMnt: Int) async throws -> WalletTransaction

    func getSponsorships() async throws -> [SponsorshipListing]
    func getSponsorship(id: String) async throws -> SponsorshipListing
    func applySponsorship(sponsorshipId: String, responseText: String) async throws -> SponsorshipApplication
    func getMyApplications() async throws -> [SponsorshipApplication]

    func getSponsorDashboard() async throws -> SponsorDashboardStats
    func getCampaigns() async throws -> [Campaign]
    func createCampaign(_ request: CreateCampaignRequest) async throws -> Campaign
    func getCampaignDetail(id: String) async throws -> CampaignDetailResponse
    func updateCampaignStatus(id: String, status: String) async throws
    func deleteCampaign(id: String) async throws
    func updateApplicationStatus(applicationId: String, status: String, notes: String?) async throws

    func getNotifications() async throws -> [AppNotification]
    func markNotificationAsRead(id: String) async throws
    func markAllNotificationsAsRead() async throws
}
