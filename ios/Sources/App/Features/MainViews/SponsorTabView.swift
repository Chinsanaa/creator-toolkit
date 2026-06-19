import SwiftUI

struct SponsorTabView: View {
    @State private var selectedTab = 0

    var body: some View {
        AuthenticatedShell {
            TabView(selection: $selectedTab) {
                SponsorDashboardView()
                    .tabItem { Label("Dashboard", systemImage: "chart.pie.fill") }
                    .tag(0)

                CampaignsView()
                    .tabItem { Label("Campaigns", systemImage: "megaphone.fill") }
                    .tag(1)

                NotificationsView()
                    .tabItem { Label("Alerts", systemImage: "bell.fill") }
                    .tag(2)

                SettingsView()
                    .tabItem { Label("Settings", systemImage: "gear") }
                    .tag(3)
            }
            .tint(EarnioTheme.brandBlue)
        }
    }
}

#Preview {
    SponsorTabView()
        .environmentObject(AuthContext())
}
