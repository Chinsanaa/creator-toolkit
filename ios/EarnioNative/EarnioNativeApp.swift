import SwiftUI
import Earnio

@main
struct EarnioNativeApp: App {
    @StateObject private var authContext = AuthContext()

    var body: some Scene {
        WindowGroup {
            EarnioRootView()
                .environmentObject(authContext)
        }
    }
}
