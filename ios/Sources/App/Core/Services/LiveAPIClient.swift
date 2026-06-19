import Foundation

final class LiveAPIClient: EarnioAPI {
    private let baseURL: URL
    private var accessToken: String?
    private let decoder: JSONDecoder
    private let encoder: JSONEncoder

    init(baseURL: URL = AppConfig.apiBaseURL) {
        self.baseURL = baseURL
        self.decoder = JSONDecoder()
        self.decoder.keyDecodingStrategy = .convertFromSnakeCase
        self.encoder = JSONEncoder()
        self.encoder.keyEncodingStrategy = .convertToSnakeCase
    }

    func setAccessToken(_ token: String?) {
        accessToken = token
    }

    // MARK: - Auth

    func login(email: String, password: String) async throws -> AuthSession {
        let body = LoginRequest(email: email, password: password)
        let response: LoginResponse = try await request("/auth/login", method: "POST", body: body)
        accessToken = response.accessToken
        return AuthSession(accessToken: response.accessToken, user: response.user)
    }

    func signup(email: String, password: String, name: String, username: String, userType: String) async throws -> AuthSession {
        let body = SignupRequest(
            email: email,
            password: password,
            name: name,
            username: username,
            userType: userType,
            acceptedTerms: true
        )
        let response: LoginResponse = try await request("/auth/signup", method: "POST", body: body)
        accessToken = response.accessToken
        return AuthSession(accessToken: response.accessToken, user: response.user)
    }

    func getCurrentUser() async throws -> User {
        let response: MeResponse = try await request("/auth/me", method: "GET")
        return response.user
    }

    func logout() async throws {
        let _: MessageResponse = try await request("/auth/logout", method: "POST", body: EmptyBody())
        accessToken = nil
    }

    func refreshAccessToken() async throws -> String {
        let response: RefreshResponse = try await request("/auth/refresh", method: "POST", body: EmptyBody())
        accessToken = response.accessToken
        return response.accessToken
    }

    func deleteAccount(password: String) async throws {
        struct DeleteBody: Encodable { let password: String }
        let _: MessageResponse = try await request("/auth/account", method: "DELETE", body: DeleteBody(password: password))
        accessToken = nil
    }

    // MARK: - Dashboard

    func getDashboardSummary() async throws -> DashboardSummary {
        try await request("/dashboard/summary", method: "GET")
    }

    // MARK: - Platforms

    func getPlatforms() async throws -> [PlatformAccount] {
        struct Response: Decodable { let accounts: [PlatformAccount] }
        let response: Response = try await request("/platforms", method: "GET")
        return response.accounts
    }

    func connectPlatform(platform: String, username: String) async throws -> PlatformAccount {
        struct Response: Decodable { let account: PlatformAccount }
        let body = ConnectPlatformRequest(platform: platform, platformUsername: username)
        let response: Response = try await request("/platforms/connect", method: "POST", body: body)
        return response.account
    }

    func syncPlatform(id: String) async throws -> PlatformAccount {
        struct Response: Decodable { let account: PlatformAccount? }
        let response: Response = try await request("/platforms/\(id)/sync", method: "POST", body: EmptyBody())
        if let account = response.account { return account }
        return try await getPlatforms().first { $0.id == id } ?? MockData.platforms[0]
    }

    func getPlatformSyncHistory() async throws -> [PlatformSyncHistory] {
        struct Response: Decodable { let history: [PlatformSyncHistory] }
        let response: Response = try await request("/platforms/sync/history", method: "GET")
        return response.history
    }

    // MARK: - Wallet

    func getWalletSummary() async throws -> WalletSummary {
        try await request("/wallet/summary", method: "GET")
    }

    func getBankAccounts() async throws -> [BankAccount] {
        struct Response: Decodable { let bankAccounts: [BankAccount] }
        let response: Response = try await request("/wallet/bank-accounts", method: "GET")
        return response.bankAccounts
    }

    func addBankAccount(accountHolderName: String, accountNumber: String, bankName: String) async throws -> BankAccount {
        struct Response: Decodable { let bankAccount: BankAccount }
        let body = AddBankAccountRequest(
            bankName: bankName,
            accountNumber: accountNumber,
            accountHolderName: accountHolderName,
            setAsDefault: false
        )
        let response: Response = try await request("/wallet/bank-accounts", method: "POST", body: body)
        return response.bankAccount
    }

    func setDefaultBankAccount(id: String) async throws {
        let _: MessageResponse = try await request("/wallet/bank-accounts/\(id)/default", method: "PATCH", body: EmptyBody())
    }

    func getTransactions() async throws -> [WalletTransaction] {
        struct Response: Decodable { let transactions: [WalletTransaction] }
        let response: Response = try await request("/wallet/transactions", method: "GET")
        return response.transactions
    }

    func requestPayout(bankAccountId: String, amountMnt: Int) async throws -> WalletTransaction {
        struct Response: Decodable { let transaction: WalletTransaction }
        let body = PayoutRequestBody(bankAccountId: bankAccountId, amountMnt: amountMnt)
        let response: Response = try await request("/wallet/payouts", method: "POST", body: body)
        return response.transaction
    }

    // MARK: - Sponsorships

    func getSponsorships() async throws -> [SponsorshipListing] {
        struct Response: Decodable { let sponsorships: [SponsorshipListing] }
        let response: Response = try await request("/sponsorships", method: "GET")
        return response.sponsorships
    }

    func getSponsorship(id: String) async throws -> SponsorshipListing {
        try await request("/sponsorships/\(id)", method: "GET")
    }

    func applySponsorship(sponsorshipId: String, responseText: String) async throws -> SponsorshipApplication {
        struct Response: Decodable { let application: SponsorshipApplication }
        let body = ApplySponsorshipRequest(sponsorshipId: sponsorshipId, responseText: responseText)
        let response: Response = try await request("/sponsorships/\(sponsorshipId)/apply", method: "POST", body: body)
        return response.application
    }

    func getMyApplications() async throws -> [SponsorshipApplication] {
        struct Response: Decodable { let applications: [SponsorshipApplication] }
        let response: Response = try await request("/sponsorships/applications/me", method: "GET")
        return response.applications
    }

    // MARK: - Sponsor

    func getSponsorDashboard() async throws -> SponsorDashboardStats {
        try await request("/sponsor/dashboard", method: "GET")
    }

    func getCampaigns() async throws -> [Campaign] {
        struct Response: Decodable { let campaigns: [Campaign] }
        let response: Response = try await request("/sponsor/campaigns", method: "GET")
        return response.campaigns
    }

    func createCampaign(_ request: CreateCampaignRequest) async throws -> Campaign {
        struct Response: Decodable { let campaign: Campaign }
        let response: Response = try await self.request("/sponsor/campaigns", method: "POST", body: request)
        return response.campaign
    }

    func getCampaignDetail(id: String) async throws -> CampaignDetailResponse {
        try await request("/sponsor/campaigns/\(id)", method: "GET")
    }

    func updateCampaignStatus(id: String, status: String) async throws {
        let body = UpdateCampaignStatusRequest(status: status)
        let _: MessageResponse = try await request("/sponsor/campaigns/\(id)/status", method: "PATCH", body: body)
    }

    func deleteCampaign(id: String) async throws {
        let _: MessageResponse = try await request("/sponsor/campaigns/\(id)", method: "DELETE", body: EmptyBody())
    }

    func updateApplicationStatus(applicationId: String, status: String, notes: String?) async throws {
        let body = UpdateApplicationRequest(status: status, sponsorNotes: notes)
        let _: MessageResponse = try await request("/sponsor/applications/\(applicationId)", method: "PATCH", body: body)
    }

    // MARK: - Notifications

    func getNotifications() async throws -> [AppNotification] {
        let response: NotificationsListResponse = try await request("/notifications", method: "GET")
        return response.notifications
    }

    func markNotificationAsRead(id: String) async throws {
        let _: MessageResponse = try await request("/notifications/\(id)/read", method: "PATCH", body: EmptyBody())
    }

    func markAllNotificationsAsRead() async throws {
        let _: MessageResponse = try await request("/notifications/read-all", method: "POST", body: EmptyBody())
    }

    // MARK: - HTTP

    private struct EmptyBody: Encodable {}

    private func request<T: Decodable>(_ endpoint: String, method: String) async throws -> T {
        try await request(endpoint, method: method, body: Optional<EmptyBody>.none)
    }

    private func request<T: Decodable, B: Encodable>(_ endpoint: String, method: String, body: B?) async throws -> T {
        var url = baseURL
        for component in endpoint.split(separator: "/") {
            url.appendPathComponent(String(component))
        }

        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = method
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.setValue("application/json", forHTTPHeaderField: "Accept")

        if let accessToken {
            urlRequest.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }

        if let body {
            urlRequest.httpBody = try encoder.encode(body)
        }

        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        try validateResponse(response, data: data)

        do {
            return try decoder.decode(T.self, from: data)
        } catch {
            throw APIError.decodingError
        }
    }

    private func validateResponse(_ response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }

        switch http.statusCode {
        case 200...299:
            return
        case 401:
            accessToken = nil
            throw APIError.unauthorized
        case 404:
            throw APIError.notFound
        case 400...499:
            if let body = try? decoder.decode(APIErrorBody.self, from: data), let error = body.error {
                throw APIError.custom(error)
            }
            throw APIError.custom("Request failed (\(http.statusCode))")
        case 500...599:
            throw APIError.serverError(http.statusCode, "Server error")
        default:
            throw APIError.custom("Unexpected status \(http.statusCode)")
        }
    }
}

private struct LoginResponse: Decodable {
    let user: User
    let accessToken: String
}
