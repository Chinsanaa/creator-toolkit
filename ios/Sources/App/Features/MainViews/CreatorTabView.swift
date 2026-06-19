import SwiftUI

struct CreatorTabView: View {
    @State private var selectedTab = 0

    var body: some View {
        AuthenticatedShell {
            TabView(selection: $selectedTab) {
                CreatorDashboardView()
                    .tabItem { Label("Dashboard", systemImage: "chart.pie.fill") }
                    .tag(0)

                PlatformsView()
                    .tabItem { Label("Platforms", systemImage: "link") }
                    .tag(1)

                WalletView()
                    .tabItem { Label("Wallet", systemImage: "wallet.pass.fill") }
                    .tag(2)

                SponsorshipsView()
                    .tabItem { Label("Deals", systemImage: "star.fill") }
                    .tag(3)

                SettingsView()
                    .tabItem { Label("Settings", systemImage: "gear") }
                    .tag(4)
            }
            .tint(EarnioTheme.brandBlue)
        }
    }
}

#Preview {
    CreatorTabView()
        .environmentObject(AuthContext())
}
