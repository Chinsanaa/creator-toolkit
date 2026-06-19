import Foundation

enum AppMode: String {
    case demo
    case live
}

enum AppConfig {
    /// Toggle at launch via Auth screen, or set for development.
    static var mode: AppMode = .demo

    /// Simulator: localhost. Device on same Wi‑Fi: your Mac's LAN IP (e.g. 192.168.1.10).
    static var apiBaseURL: URL {
        if let override = ProcessInfo.processInfo.environment["EARNIO_API_URL"],
           let url = URL(string: override) {
            return url
        }
        return URL(string: "http://127.0.0.1:3001/api")!
    }

    static var isDemoMode: Bool { mode == .demo }
}
