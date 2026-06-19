import SwiftUI

@MainActor
public class AuthContext: ObservableObject {
    @Published public var user: User?
    @Published public var isAuthenticated = false
    @Published public var isLoading = false
    @Published public var error: String?
    @Published public var isDemoMode = AppConfig.isDemoMode

    private let apiService = APIService.shared
    private let keychainService = KeychainService.shared

    public init() {
        if !AppConfig.isDemoMode {
            restoreSession()
        }
    }

    public func enterDemo(asCreator: Bool) {
        AppConfig.mode = .demo
        isDemoMode = true
        user = asCreator ? MockData.creator : MockData.sponsor
        isAuthenticated = true
        error = nil
    }

    func login(email: String, password: String) async {
        isLoading = true
        error = nil
        AppConfig.mode = .live
        isDemoMode = false

        do {
            let session = try await apiService.login(email: email, password: password)
            apiService.setAccessToken(session.accessToken)
            try keychainService.saveAccessToken(session.accessToken)
            user = session.user
            isAuthenticated = true
        } catch {
            self.error = error.localizedDescription
        }

        isLoading = false
    }

    func signup(email: String, password: String, userType: String, name: String, username: String) async {
        isLoading = true
        error = nil
        AppConfig.mode = .live
        isDemoMode = false

        do {
            let session = try await apiService.signup(
                email: email,
                password: password,
                name: name,
                username: username,
                userType: userType
            )
            apiService.setAccessToken(session.accessToken)
            try keychainService.saveAccessToken(session.accessToken)
            user = session.user
            isAuthenticated = true
        } catch {
            self.error = error.localizedDescription
        }

        isLoading = false
    }

    func logout() async {
        if isDemoMode {
            user = nil
            isAuthenticated = false
            isDemoMode = false
            return
        }

        do {
            try await apiService.logout()
            try keychainService.deleteTokens()
            user = nil
            isAuthenticated = false
        } catch {
            self.error = error.localizedDescription
        }
    }

    func refreshSession() async {
        guard !isDemoMode else { return }

        do {
            let token = try await apiService.refreshAccessToken()
            apiService.setAccessToken(token)
            try keychainService.saveAccessToken(token)
            let user = try await apiService.getCurrentUser()
            self.user = user
            isAuthenticated = true
        } catch {
            await logout()
        }
    }

    func deleteAccount(password: String) async {
        isLoading = true
        error = nil

        do {
            if !isDemoMode {
                try await apiService.deleteAccount(password: password)
            }
            await logout()
        } catch {
            self.error = error.localizedDescription
        }

        isLoading = false
    }

    private func restoreSession() {
        if let access = try? keychainService.getAccessToken() {
            apiService.setAccessToken(access)
            Task {
                do {
                    let user = try await apiService.getCurrentUser()
                    self.user = user
                    self.isAuthenticated = true
                } catch {
                    self.error = error.localizedDescription
                    try? keychainService.deleteTokens()
                }
            }
        }
    }
}

// MARK: - Keychain Service

class KeychainService {
    static let shared = KeychainService()

    private let accessTokenKey = "earnio_access_token"

    func saveAccessToken(_ access: String) throws {
        try save(access, forKey: accessTokenKey)
    }

    func getAccessToken() throws -> String? {
        try retrieve(forKey: accessTokenKey)
    }

    func saveTokens(access: String, refresh: String) throws {
        try save(access, forKey: accessTokenKey)
        try save(refresh, forKey: "earnio_refresh_token")
    }

    func getTokens() throws -> (access: String, refresh: String)? {
        guard let access = try retrieve(forKey: accessTokenKey),
              let refresh = try retrieve(forKey: "earnio_refresh_token") else {
            return nil
        }
        return (access, refresh)
    }

    func deleteTokens() throws {
        try delete(forKey: accessTokenKey)
        try delete(forKey: "earnio_refresh_token")
    }

    private func save(_ value: String, forKey key: String) throws {
        guard let data = value.data(using: .utf8) else {
            throw NSError(domain: "KeychainError", code: -1)
        }

        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data,
        ]

        SecItemDelete(query as CFDictionary)
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw NSError(domain: "KeychainError", code: Int(status))
        }
    }

    private func retrieve(forKey key: String) throws -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
        ]

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        guard status == errSecSuccess, let data = result as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }

    private func delete(forKey key: String) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
        ]
        SecItemDelete(query as CFDictionary)
    }
}
