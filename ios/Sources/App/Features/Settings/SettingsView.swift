import SwiftUI

struct SettingsView: View {
    @EnvironmentObject var authContext: AuthContext
    @State private var showDeleteConfirmation = false
    @State private var deletePassword = ""
    @State private var deleteError = ""

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemBackground).ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 20) {
                        // Header
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Settings")
                                .font(.system(size: 28, weight: .bold))

                            Text("Manage your account")
                                .font(.system(size: 14))
                                .foregroundColor(.secondary)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal)

                        // Account Section
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Account")
                                .font(.system(size: 16, weight: .semibold))
                                .padding(.horizontal)

                            VStack(spacing: 0) {
                                if let user = authContext.user {
                                    SettingsRow(
                                        icon: "person.circle.fill",
                                        label: "Name",
                                        value: "\(user.firstName) \(user.lastName)"
                                    )

                                    Divider()
                                        .padding(.horizontal)

                                    SettingsRow(
                                        icon: "envelope.fill",
                                        label: "Email",
                                        value: user.email
                                    )

                                    Divider()
                                        .padding(.horizontal)

                                    SettingsRow(
                                        icon: "badge.fill",
                                        label: "Account Type",
                                        value: user.userType.capitalized
                                    )
                                }
                            }
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                            .padding(.horizontal)
                        }

                        // Preferences Section
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Preferences")
                                .font(.system(size: 16, weight: .semibold))
                                .padding(.horizontal)

                            VStack(spacing: 0) {
                                NavigationLink(destination: Text("Theme Settings")) {
                                    SettingsButton(
                                        icon: "paintbrush.fill",
                                        label: "Theme",
                                        value: "Light"
                                    )
                                }

                                Divider()
                                    .padding(.horizontal)

                                NavigationLink(destination: Text("Language Settings")) {
                                    SettingsButton(
                                        icon: "globe",
                                        label: "Language",
                                        value: "English"
                                    )
                                }
                            }
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                            .padding(.horizontal)
                        }

                        // Security Section
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Security")
                                .font(.system(size: 16, weight: .semibold))
                                .padding(.horizontal)

                            VStack(spacing: 0) {
                                NavigationLink(destination: Text("Change Password")) {
                                    SettingsButton(
                                        icon: "lock.fill",
                                        label: "Change Password",
                                        arrow: true
                                    )
                                }
                            }
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                            .padding(.horizontal)
                        }

                        // Information Section
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Information")
                                .font(.system(size: 16, weight: .semibold))
                                .padding(.horizontal)

                            VStack(spacing: 0) {
                                NavigationLink(destination: Text("Terms of Service")) {
                                    SettingsButton(
                                        icon: "doc.fill",
                                        label: "Terms of Service",
                                        arrow: true
                                    )
                                }

                                Divider()
                                    .padding(.horizontal)

                                NavigationLink(destination: Text("Privacy Policy")) {
                                    SettingsButton(
                                        icon: "shield.fill",
                                        label: "Privacy Policy",
                                        arrow: true
                                    )
                                }
                            }
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                            .padding(.horizontal)
                        }

                        // Danger Zone
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Danger Zone")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundColor(.red)
                                .padding(.horizontal)

                            Button(action: {
                                showDeleteConfirmation = true
                            }) {
                                HStack(spacing: 12) {
                                    Image(systemName: "trash.fill")
                                        .font(.system(size: 16))
                                        .foregroundColor(.red)

                                    Text("Delete Account")
                                        .font(.system(size: 16))
                                        .foregroundColor(.red)

                                    Spacer()

                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 14))
                                        .foregroundColor(.gray)
                                }
                                .padding()
                                .background(Color.red.opacity(0.1))
                                .cornerRadius(12)
                            }
                            .padding(.horizontal)
                        }

                        // Logout Button
                        Button(action: {
                            Task {
                                await authContext.logout()
                            }
                        }) {
                            Text("Log Out")
                                .font(.system(size: 16, weight: .semibold))
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(Color.blue)
                                .foregroundColor(.white)
                                .cornerRadius(8)
                        }
                        .padding()

                        Spacer(minLength: 30)
                    }
                    .padding(.vertical)
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .alert("Delete Account", isPresented: $showDeleteConfirmation) {
                SecureField("Password", text: $deletePassword)
                Button("Cancel", role: .cancel) { }
                Button("Delete", role: .destructive) {
                    Task {
                        await authContext.deleteAccount(password: deletePassword)
                    }
                }
            } message: {
                Text("This action cannot be undone. Please enter your password to confirm.")
            }
        }
    }
}

struct SettingsRow: View {
    let icon: String
    let label: String
    let value: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 18))
                .foregroundColor(.blue)
                .frame(width: 30)

            VStack(alignment: .leading, spacing: 4) {
                Text(label)
                    .font(.system(size: 14))
                    .foregroundColor(.secondary)

                Text(value)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.primary)
            }

            Spacer()
        }
        .padding()
    }
}

struct SettingsButton: View {
    let icon: String
    let label: String
    let value: String?
    let arrow: Bool

    init(icon: String, label: String, value: String? = nil, arrow: Bool = false) {
        self.icon = icon
        self.label = label
        self.value = value
        self.arrow = arrow
    }

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 18))
                .foregroundColor(.blue)
                .frame(width: 30)

            Text(label)
                .font(.system(size: 16))
                .foregroundColor(.primary)

            Spacer()

            if let value = value {
                Text(value)
                    .font(.system(size: 14))
                    .foregroundColor(.secondary)
            }

            if arrow {
                Image(systemName: "chevron.right")
                    .font(.system(size: 14))
                    .foregroundColor(.gray)
            }
        }
        .padding()
    }
}

#Preview {
    SettingsView()
        .environmentObject(AuthContext())
}
