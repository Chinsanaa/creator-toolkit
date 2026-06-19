import SwiftUI

struct NotificationsView: View {
    @State private var notifications: [Notification] = []
    @State private var isLoading = false
    @State private var error: String?
    private let apiService = APIService.shared

    var unreadCount: Int {
        notifications.filter { !$0.read }.count
    }

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemBackground).ignoresSafeArea()

                VStack(spacing: 0) {
                    // Header
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            VStack(alignment: .leading, spacing: 8) {
                                Text("Notifications")
                                    .font(.system(size: 28, weight: .bold))

                                if unreadCount > 0 {
                                    Text("\(unreadCount) unread")
                                        .font(.system(size: 14))
                                        .foregroundColor(.blue)
                                }
                            }

                            Spacer()

                            if unreadCount > 0 {
                                Button(action: {
                                    markAllAsRead()
                                }) {
                                    Text("Mark all as read")
                                        .font(.system(size: 12))
                                        .foregroundColor(.blue)
                                }
                            }
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    .padding(.vertical, 16)

                    // Content
                    if isLoading {
                        ProgressView()
                    } else if notifications.isEmpty {
                        VStack(spacing: 16) {
                            Image(systemName: "bell.fill")
                                .font(.system(size: 48))
                                .foregroundColor(.gray)

                            Text("No notifications")
                                .font(.system(size: 16, weight: .semibold))

                            Text("You're all caught up!")
                                .font(.system(size: 14))
                                .foregroundColor(.secondary)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(40)
                    } else {
                        ScrollView {
                            VStack(spacing: 0) {
                                ForEach(notifications) { notification in
                                    NotificationCard(
                                        notification: notification,
                                        onTap: {
                                            markAsRead(notification.id)
                                        }
                                    )
                                    Divider()
                                }
                            }
                        }
                    }
                }
            }
            .navigationTitle("Notifications")
            .navigationBarTitleDisplayMode(.inline)
        }
        .onAppear {
            loadNotifications()
        }
    }

    private func loadNotifications() {
        isLoading = true
        error = nil

        Task {
            do {
                let notifications = try await apiService.getNotifications()
                self.notifications = notifications
                self.isLoading = false
            } catch {
                self.error = error.localizedDescription
                self.isLoading = false
            }
        }
    }

    private func markAsRead(_ id: String) {
        Task {
            do {
                let notification = try await apiService.markNotificationAsRead(id: id)
                if let index = notifications.firstIndex(where: { $0.id == id }) {
                    notifications[index] = notification
                }
            } catch {
                self.error = error.localizedDescription
            }
        }
    }

    private func markAllAsRead() {
        Task {
            do {
                try await apiService.markAllNotificationsAsRead()
                loadNotifications()
            } catch {
                self.error = error.localizedDescription
            }
        }
    }
}

struct NotificationCard: View {
    let notification: Notification
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 12) {
                // Icon
                Image(systemName: notificationIcon)
                    .font(.system(size: 20))
                    .foregroundColor(.white)
                    .frame(width: 40, height: 40)
                    .background(notificationColor)
                    .cornerRadius(10)

                // Content
                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Text(notification.title)
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(.primary)

                        Spacer()

                        if !notification.read {
                            Circle()
                                .fill(Color.blue)
                                .frame(width: 8, height: 8)
                        }
                    }

                    Text(notification.message)
                        .font(.system(size: 13))
                        .foregroundColor(.secondary)
                        .lineLimit(2)

                    Text(formatDate(notification.createdAt))
                        .font(.system(size: 11))
                        .foregroundColor(.secondary)
                }

                Spacer()

                Image(systemName: "chevron.right")
                    .font(.system(size: 14))
                    .foregroundColor(.gray)
            }
            .padding()
            .contentShape(Rectangle())
        }
    }

    private var notificationIcon: String {
        switch notification.type.lowercased() {
        case "application": return "envelope.fill"
        case "approval": return "checkmark.circle.fill"
        case "rejection": return "xmark.circle.fill"
        case "payout": return "dollarsign.circle.fill"
        case "message": return "message.fill"
        default: return "bell.fill"
        }
    }

    private var notificationColor: Color {
        switch notification.type.lowercased() {
        case "application": return .blue
        case "approval": return .green
        case "rejection": return .red
        case "payout": return .green
        case "message": return .purple
        default: return .gray
        }
    }
}

#Preview {
    NotificationsView()
}
