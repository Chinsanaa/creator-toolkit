import SwiftUI

struct SponsorTabView: View {
    @State private var selectedTab = 0
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        TabView(selection: $selectedTab) {
            // Dashboard
            SponsorDashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "chart.pie.fill")
                }
                .tag(0)

            // Campaigns
            CampaignsView()
                .tabItem {
                    Label("Campaigns", systemImage: "megaphone.fill")
                }
                .tag(1)

            // Notifications
            NotificationsView()
                .tabItem {
                    Label("Notifications", systemImage: "bell.fill")
                }
                .tag(2)

            // Settings
            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
                .tag(3)
        }
        .tint(.blue)
    }
}

#Preview {
    SponsorTabView()
        .environmentObject(AuthContext())
}
