import SwiftUI

struct PlatformsView: View {
    @State private var platforms: [Platform] = []
    @State private var isLoading = false
    @State private var error: String?
    @State private var showAddPlatformSheet = false
    @State private var showSyncHistory = false
    private let apiService = APIService.shared

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemBackground).ignoresSafeArea()

                if isLoading && platforms.isEmpty {
                    ProgressView()
                } else {
                    ScrollView {
                        VStack(spacing: 20) {
                            // Header
                            VStack(alignment: .leading, spacing: 8) {
                                Text("Connected Platforms")
                                    .font(.system(size: 28, weight: .bold))

                                Text("Manage your social accounts")
                                    .font(.system(size: 14))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.horizontal)

                            if platforms.isEmpty {
                                VStack(spacing: 16) {
                                    Image(systemName: "link.circle.fill")
                                        .font(.system(size: 48))
                                        .foregroundColor(.blue)

                                    Text("No platforms connected")
                                        .font(.system(size: 16, weight: .semibold))

                                    Text("Connect your social media accounts to start earning")
                                        .font(.system(size: 14))
                                        .foregroundColor(.secondary)
                                        .multilineTextAlignment(.center)

                                    Button("Connect Platform") {
                                        showAddPlatformSheet = true
                                    }
                                    .buttonStyle(.borderedProminent)
                                }
                                .frame(maxWidth: .infinity)
                                .padding(40)
                            } else {
                                VStack(spacing: 12) {
                                    ForEach(platforms) { platform in
                                        PlatformCard(platform: platform, onSync: syncPlatform)
                                    }
                                }
                                .padding(.horizontal)

                                Button("Add Another Platform") {
                                    showAddPlatformSheet = true
                                }
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(Color.blue.opacity(0.1))
                                .foregroundColor(.blue)
                                .cornerRadius(8)
                                .padding(.horizontal)
                            }

                            Spacer(minLength: 30)
                        }
                        .padding(.vertical)
                    }
                }

                if let error = error {
                    VStack {
                        Spacer()
                        HStack {
                            Image(systemName: "exclamationmark.circle")
                            Text(error)
                            Button("Dismiss") {
                                self.error = nil
                            }
                        }
                        .padding()
                        .background(Color.red.opacity(0.1))
                        .cornerRadius(8)
                        .padding()
                    }
                }
            }
            .navigationTitle("Platforms")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button("Sync") {
                        loadPlatforms()
                    }
                }
            }
            .sheet(isPresented: $showAddPlatformSheet) {
                AddPlatformSheet(isPresented: $showAddPlatformSheet, onAdd: addPlatform)
            }
        }
        .onAppear {
            loadPlatforms()
        }
    }

    private func loadPlatforms() {
        isLoading = true
        error = nil

        Task {
            do {
                let platforms = try await apiService.getPlatforms()
                self.platforms = platforms
                self.isLoading = false
            } catch {
                self.error = error.localizedDescription
                self.isLoading = false
            }
        }
    }

    private func addPlatform(type: String, handle: String) {
        Task {
            do {
                let platform = try await apiService.connectPlatform(type: type, handle: handle)
                self.platforms.append(platform)
                self.error = "Platform connected successfully!"
            } catch {
                self.error = error.localizedDescription
            }
        }
    }

    private func syncPlatform(id: String) {
        Task {
            do {
                let updated = try await apiService.syncPlatform(id: id)
                if let index = platforms.firstIndex(where: { $0.id == id }) {
                    platforms[index] = updated
                }
            } catch {
                self.error = error.localizedDescription
            }
        }
    }
}

struct PlatformCard: View {
    let platform: Platform
    let onSync: (String) -> Void
    @State private var isSyncing = false

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                HStack(spacing: 12) {
                    Image(systemName: platformIcon)
                        .font(.system(size: 24))
                        .foregroundColor(.white)
                        .frame(width: 40, height: 40)
                        .background(platformColor)
                        .cornerRadius(10)

                    VStack(alignment: .leading, spacing: 4) {
                        Text(platform.type.capitalized)
                            .font(.system(size: 16, weight: .semibold))

                        Text("@\(platform.handle)")
                            .font(.system(size: 13))
                            .foregroundColor(.secondary)
                    }
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 4) {
                    Text(formatNumber(platform.followerCount))
                        .font(.system(size: 16, weight: .semibold))

                    Text("followers")
                        .font(.system(size: 11))
                        .foregroundColor(.secondary)
                }
            }

            HStack(spacing: 8) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Last Sync")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)

                    Text(formatDate(platform.lastSync))
                        .font(.system(size: 13))
                        .foregroundColor(.primary)
                }

                Spacer()

                Button(action: {
                    isSyncing = true
                    onSync(platform.id)
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                        isSyncing = false
                    }
                }) {
                    if isSyncing {
                        ProgressView()
                            .progressViewStyle(.circular)
                    } else {
                        Image(systemName: "arrow.clockwise")
                    }
                }
                .buttonStyle(.bordered)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }

    private var platformIcon: String {
        switch platform.type.lowercased() {
        case "tiktok": return "music.note"
        case "youtube": return "play.rectangle.fill"
        case "instagram": return "camera.fill"
        default: return "square.fill"
        }
    }

    private var platformColor: Color {
        switch platform.type.lowercased() {
        case "tiktok": return .black
        case "youtube": return .red
        case "instagram": return Color(red: 0.9, green: 0.1, blue: 0.6)
        default: return .blue
        }
    }
}

struct AddPlatformSheet: View {
    @Binding var isPresented: Bool
    let onAdd: (String, String) -> Void
    @State private var selectedPlatform = "tiktok"
    @State private var handle = ""

    let platforms = ["TikTok": "tiktok", "YouTube": "youtube", "Instagram": "instagram"]

    var body: some View {
        NavigationStack {
            Form {
                Section("Platform") {
                    Picker("Select Platform", selection: $selectedPlatform) {
                        ForEach(Array(platforms.keys), id: \.self) { platform in
                            Text(platform).tag(platforms[platform]!)
                        }
                    }
                }

                Section("Handle") {
                    TextField("Username", text: $handle)
                }

                Section {
                    Button("Connect") {
                        onAdd(selectedPlatform, handle)
                        isPresented = false
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                }
            }
            .navigationTitle("Add Platform")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        isPresented = false
                    }
                }
            }
        }
    }
}

func formatNumber(_ number: Int) -> String {
    if number >= 1_000_000 {
        return String(format: "%.1fM", Double(number) / 1_000_000)
    } else if number >= 1_000 {
        return String(format: "%.1fK", Double(number) / 1_000)
    }
    return String(number)
}

func formatDate(_ dateString: String) -> String {
    let formatter = ISO8601DateFormatter()
    if let date = formatter.date(from: dateString) {
        let now = Date()
        let calendar = Calendar.current
        let components = calendar.dateComponents([.day, .hour], from: date, to: now)

        if components.day ?? 0 > 0 {
            return "\(components.day ?? 0)d ago"
        } else if components.hour ?? 0 > 0 {
            return "\(components.hour ?? 0)h ago"
        } else {
            return "Just now"
        }
    }
    return dateString
}

#Preview {
    PlatformsView()
}
