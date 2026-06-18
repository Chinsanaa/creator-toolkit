import SwiftUI

@MainActor
class AuthContext: ObservableObject {
    @Published var user: User?
    @Published var isAuthenticated = false
    @Published var isLoading = false
    @Published var error: String?

    private let apiService = APIService.shared
    private let keychainService = KeychainService.shared

    init() {
        restoreSession()
    }

    func login(email: String, password: String) async {
        isLoading = true
        error = nil

        do {
            let response = try await apiService.login(email: email, password: password)
            apiService.setTokens(access: response.accessToken, refresh: response.refreshToken)
            try keychainService.saveTokens(access: response.accessToken, refresh: response.refreshToken)

            self.user = response.user
            self.isAuthenticated = true
        } catch {
            self.error = error.localizedDescription
        }

        isLoading = false
    }

    func signup(email: String, password: String, userType: String, firstName: String, lastName: String) async {
        isLoading = true
        error = nil

        do {
            let response = try await apiService.signup(
                email: email,
                password: password,
                userType: userType,
                firstName: firstName,
                lastName: lastName
            )
            apiService.setTokens(access: response.accessToken, refresh: response.refreshToken)
            try keychainService.saveTokens(access: response.accessToken, refresh: response.refreshToken)

            self.user = response.user
            self.isAuthenticated = true
        } catch {
            self.error = error.localizedDescription
        }

        isLoading = false
    }

    func logout() async {
        do {
            try await apiService.logout()
            try keychainService.deleteTokens()
            self.user = nil
            self.isAuthenticated = false
        } catch {
            self.error = error.localizedDescription
        }
    }

    func refreshSession() async {
        do {
            let response = try await apiService.refreshAccessToken()
            apiService.setTokens(access: response.accessToken, refresh: response.refreshToken)
            try keychainService.saveTokens(access: response.accessToken, refresh: response.refreshToken)
            self.user = response.user
            self.isAuthenticated = true
        } catch {
            logout()
        }
    }

    func deleteAccount(password: String) async {
        isLoading = true
        error = nil

        do {
            try await apiService.deleteAccount(password: password)
            logout()
        } catch {
            self.error = error.localizedDescription
        }

        isLoading = false
    }

    private func restoreSession() {
        if let tokens = try? keychainService.getTokens() {
            apiService.setTokens(access: tokens.access, refresh: tokens.refresh)
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
    private let refreshTokenKey = "earnio_refresh_token"

    func saveTokens(access: String, refresh: String) throws {
        try save(access, forKey: accessTokenKey)
        try save(refresh, forKey: refreshTokenKey)
    }

    func getTokens() throws -> (access: String, refresh: String)? {
        guard let access = try retrieve(forKey: accessTokenKey),
              let refresh = try retrieve(forKey: refreshTokenKey) else {
            return nil
        }
        return (access, refresh)
    }

    func deleteTokens() throws {
        try delete(forKey: accessTokenKey)
        try delete(forKey: refreshTokenKey)
    }

    private func save(_ value: String, forKey key: String) throws {
        guard let data = value.data(using: .utf8) else {
            throw NSError(domain: "KeychainError", code: -1, userInfo: nil)
        }

        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]

        SecItemDelete(query as CFDictionary)
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw NSError(domain: "KeychainError", code: Int(status), userInfo: nil)
        }
    }

    private func retrieve(forKey key: String) throws -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true
        ]

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)

        guard status == errSecSuccess else {
            return nil
        }

        guard let data = result as? Data else {
            return nil
        }

        return String(data: data, encoding: .utf8)
    }

    private func delete(forKey key: String) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key
        ]

        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw NSError(domain: "KeychainError", code: Int(status), userInfo: nil)
        }
    }
}
