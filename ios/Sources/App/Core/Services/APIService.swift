import Foundation

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
        case .invalidURL:
            return "Invalid URL"
        case .invalidResponse:
            return "Invalid response from server"
        case .decodingError:
            return "Failed to decode response"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .serverError(let code, let message):
            return "Server error (\(code)): \(message)"
        case .unauthorized:
            return "Unauthorized. Please log in again."
        case .notFound:
            return "Resource not found"
        case .custom(let message):
            return message
        }
    }
}

class APIService {
    static let shared = APIService()

    private let baseURL = URL(string: "http://localhost:3001/api")! // Change to production URL
    private var accessToken: String?
    private var refreshToken: String?

    func setTokens(access: String, refresh: String) {
        self.accessToken = access
        self.refreshToken = refresh
    }

    func getAccessToken() -> String? {
        return accessToken
    }

    func clearTokens() {
        self.accessToken = nil
        self.refreshToken = nil
    }

    // MARK: - Authentication

    func login(email: String, password: String) async throws -> AuthResponse {
        let request = LoginRequest(email: email, password: password)
        return try await post("/auth/login", body: request)
    }

    func signup(email: String, password: String, userType: String, firstName: String, lastName: String) async throws -> AuthResponse {
        let request = SignupRequest(email: email, password: password, userType: userType, firstName: firstName, lastName: lastName)
        return try await post("/auth/signup", body: request)
    }

    func getCurrentUser() async throws -> User {
        return try await get("/auth/me")
    }

    func logout() async throws {
        try await post("/auth/logout", body: [:] as [String: String])
        clearTokens()
    }

    func refreshAccessToken() async throws -> AuthResponse {
        return try await post("/auth/refresh", body: [:] as [String: String])
    }

    func deleteAccount(password: String) async throws {
        try await delete("/auth/account", body: ["password": password])
    }

    // MARK: - Dashboard

    func getDashboardSummary() async throws -> DashboardSummary {
        return try await get("/dashboard/summary")
    }

    // MARK: - Platforms

    func getPlatforms() async throws -> [Platform] {
        let response: PaginatedResponse<Platform> = try await get("/platforms")
        return response.items
    }

    func connectPlatform(type: String, handle: String) async throws -> Platform {
        let body = ["type": type, "handle": handle]
        return try await post("/platforms/connect", body: body)
    }

    func syncPlatform(id: String) async throws -> Platform {
        return try await post("/platforms/\(id)/sync", body: [:] as [String: String])
    }

    func getPlatformSyncHistory() async throws -> [PlatformSyncHistory] {
        let response: PaginatedResponse<PlatformSyncHistory> = try await get("/platforms/sync/history")
        return response.items
    }

    // MARK: - Wallet

    func getWalletSummary() async throws -> WalletSummary {
        return try await get("/wallet/summary")
    }

    func getBankAccounts() async throws -> [BankAccount] {
        let response: PaginatedResponse<BankAccount> = try await get("/wallet/bank-accounts")
        return response.items
    }

    func addBankAccount(accountHolderName: String, accountNumber: String, bankName: String) async throws -> BankAccount {
        let body = [
            "accountHolderName": accountHolderName,
            "accountNumber": accountNumber,
            "bankName": bankName
        ]
        return try await post("/wallet/bank-accounts", body: body)
    }

    func setDefaultBankAccount(id: String) async throws -> BankAccount {
        return try await patch("/wallet/bank-accounts/\(id)/default", body: [:] as [String: String])
    }

    func getTransactions() async throws -> [Transaction] {
        let response: PaginatedResponse<Transaction> = try await get("/wallet/transactions")
        return response.items
    }

    func requestPayout(bankAccountId: String, amount: Double) async throws -> Transaction {
        let body = ["bankAccountId": bankAccountId, "amount": amount] as [String: Any]
        return try await post("/wallet/payouts", body: body)
    }

    // MARK: - Sponsorships (Creator)

    func getSponsorships(page: Int = 1, limit: Int = 20) async throws -> [Sponsorship] {
        let response: PaginatedResponse<Sponsorship> = try await get("/sponsorships?page=\(page)&limit=\(limit)")
        return response.items
    }

    func getSponsorship(id: String) async throws -> Sponsorship {
        return try await get("/sponsorships/\(id)")
    }

    func applySponsorshipApplication(sponsorshipId: String, response: String) async throws -> SponsorshipApplication {
        let body = ["sponsorshipId": sponsorshipId, "response": response]
        return try await post("/sponsorships/\(sponsorshipId)/apply", body: body)
    }

    func getMyApplications(page: Int = 1, limit: Int = 20) async throws -> [SponsorshipApplication] {
        let response: PaginatedResponse<SponsorshipApplication> = try await get("/sponsorships/applications/me?page=\(page)&limit=\(limit)")
        return response.items
    }

    // MARK: - Sponsor

    func getSponsorDashboard() async throws -> SponsorDashboard {
        return try await get("/sponsor/dashboard")
    }

    func getCampaigns(status: String? = nil, page: Int = 1, limit: Int = 20) async throws -> [Campaign] {
        var url = "/sponsor/campaigns?page=\(page)&limit=\(limit)"
        if let status = status {
            url += "&status=\(status)"
        }
        let response: PaginatedResponse<Campaign> = try await get(url)
        return response.items
    }

    func createCampaign(title: String, description: String, amountPerCreator: Double, contentType: String, minFollowers: Int, maxFollowers: Int, minEngagementRate: Double, applicationDeadline: String, completionDeadline: String) async throws -> Campaign {
        let body: [String: Any] = [
            "title": title,
            "description": description,
            "amountPerCreator": amountPerCreator,
            "contentType": contentType,
            "minFollowers": minFollowers,
            "maxFollowers": maxFollowers,
            "minEngagementRate": minEngagementRate,
            "applicationDeadline": applicationDeadline,
            "completionDeadline": completionDeadline
        ]
        return try await post("/sponsor/campaigns", body: body)
    }

    func getCampaign(id: String) async throws -> Campaign {
        return try await get("/sponsor/campaigns/\(id)")
    }

    func updateCampaignStatus(id: String, status: String) async throws -> Campaign {
        let body = ["status": status]
        return try await patch("/sponsor/campaigns/\(id)/status", body: body)
    }

    func deleteCampaign(id: String) async throws {
        try await delete("/sponsor/campaigns/\(id)", body: [:] as [String: String])
    }

    func updateApplicationStatus(applicationId: String, status: String, notes: String? = nil) async throws -> CampaignApplication {
        var body: [String: Any] = ["status": status]
        if let notes = notes {
            body["notes"] = notes
        }
        return try await patch("/sponsor/applications/\(applicationId)", body: body)
    }

    // MARK: - Notifications

    func getNotifications(page: Int = 1, limit: Int = 20) async throws -> [Notification] {
        let response: PaginatedResponse<Notification> = try await get("/notifications?page=\(page)&limit=\(limit)")
        return response.items
    }

    func markNotificationAsRead(id: String) async throws -> Notification {
        return try await patch("/notifications/\(id)/read", body: [:] as [String: String])
    }

    func markAllNotificationsAsRead() async throws {
        try await post("/notifications/read-all", body: [:] as [String: String])
    }

    // MARK: - Documentation

    func getDocPages() async throws -> [DocPage] {
        let response: PaginatedResponse<DocPage> = try await get("/docs")
        return response.items
    }

    func getDocPage(slug: String) async throws -> DocPage {
        return try await get("/docs/\(slug)")
    }

    // MARK: - Helper Methods

    private func get<T: Codable>(_ endpoint: String) async throws -> T {
        try await request(endpoint, method: "GET")
    }

    private func post<T: Codable, B: Encodable>(_ endpoint: String, body: B) async throws -> T {
        try await request(endpoint, method: "POST", body: body)
    }

    private func patch<T: Codable, B: Encodable>(_ endpoint: String, body: B) async throws -> T {
        try await request(endpoint, method: "PATCH", body: body)
    }

    private func delete<T: Codable, B: Encodable>(_ endpoint: String, body: B) async throws -> T {
        try await request(endpoint, method: "DELETE", body: body)
    }

    private func delete(_ endpoint: String, body: [String: String]) async throws {
        let url = baseURL.appendingPathComponent(endpoint)
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "DELETE"

        if let accessToken = accessToken {
            urlRequest.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }

        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.httpBody = try JSONEncoder().encode(body)

        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        try validateResponse(response, data: data)
    }

    private func request<T: Codable, B: Encodable>(_ endpoint: String, method: String, body: B? = nil) async throws -> T {
        let url = baseURL.appendingPathComponent(endpoint)
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = method

        if let accessToken = accessToken {
            urlRequest.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }

        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")

        if let body = body {
            urlRequest.httpBody = try JSONEncoder().encode(body)
        }

        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        try validateResponse(response, data: data)

        do {
            let decodedResponse = try JSONDecoder().decode(ApiResponse<T>.self, from: data)
            if let data = decodedResponse.data {
                return data
            } else if let error = decodedResponse.error {
                throw APIError.custom(error)
            } else {
                throw APIError.decodingError
            }
        } catch {
            throw APIError.decodingError
        }
    }

    private func validateResponse(_ response: URLResponse, data: Data) throws {
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }

        switch httpResponse.statusCode {
        case 200...299:
            return
        case 401:
            clearTokens()
            throw APIError.unauthorized
        case 404:
            throw APIError.notFound
        case 400...499:
            if let errorMessage = try? JSONDecoder().decode([String: String].self, from: data)["error"] {
                throw APIError.custom(errorMessage)
            }
            throw APIError.custom("Client error: \(httpResponse.statusCode)")
        case 500...599:
            throw APIError.serverError(httpResponse.statusCode, "Server error")
        default:
            throw APIError.custom("Unexpected status code: \(httpResponse.statusCode)")
        }
    }
}
