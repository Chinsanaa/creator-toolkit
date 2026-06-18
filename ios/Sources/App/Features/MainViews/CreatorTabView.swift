import SwiftUI

struct CreatorTabView: View {
    @State private var selectedTab = 0
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        TabView(selection: $selectedTab) {
            // Dashboard
            CreatorDashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "chart.pie.fill")
                }
                .tag(0)

            // Platforms
            PlatformsView()
                .tabItem {
                    Label("Platforms", systemImage: "link")
                }
                .tag(1)

            // Wallet
            WalletView()
                .tabItem {
                    Label("Wallet", systemImage: "wallet.pass.fill")
                }
                .tag(2)

            // Sponsorships
            SponsorshipsView()
                .tabItem {
                    Label("Sponsorships", systemImage: "star.fill")
                }
                .tag(3)

            // Settings
            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
                .tag(4)
        }
        .tint(.blue)
    }
}

#Preview {
    CreatorTabView()
        .environmentObject(AuthContext())
}
