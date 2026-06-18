import SwiftUI

@main
struct EarnioApp: App {
    @StateObject private var authContext = AuthContext()

    var body: some Scene {
        WindowGroup {
            if authContext.isAuthenticated {
                if authContext.user?.userType == "creator" {
                    CreatorTabView()
                        .environmentObject(authContext)
                } else {
                    SponsorTabView()
                        .environmentObject(authContext)
                }
            } else {
                AuthView()
                    .environmentObject(authContext)
            }
        }
    }
}
