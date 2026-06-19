import SwiftUI

struct AuthView: View {
    @State private var showLoginTab = true
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        ZStack {
            EarnioTheme.authGradient.ignoresSafeArea()

            ScrollView {
                VStack(spacing: 24) {
                    VStack(spacing: 8) {
                        Text("Earnio")
                            .font(.system(size: 42, weight: .bold, design: .rounded))
                            .foregroundStyle(.white)
                        Text("Earn more, create more.")
                            .font(.subheadline.weight(.medium))
                            .foregroundStyle(.white.opacity(0.85))
                    }
                    .padding(.top, 48)

                    demoSection

                    Picker("Auth Type", selection: $showLoginTab) {
                        Text("Login").tag(true)
                        Text("Sign Up").tag(false)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal, 24)

                    if showLoginTab {
                        LoginFormView()
                    } else {
                        SignupFormView()
                    }
                }
                .padding(.bottom, 32)
            }
        }
    }

    private var demoSection: some View {
        VStack(spacing: 12) {
            Text("Try without a server")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.white.opacity(0.7))

            HStack(spacing: 12) {
                Button("Demo Creator") {
                    authContext.enterDemo(asCreator: true)
                }
                .buttonStyle(EarnioSecondaryButtonStyle())

                Button("Demo Sponsor") {
                    authContext.enterDemo(asCreator: false)
                }
                .buttonStyle(EarnioSecondaryButtonStyle())
            }
            .padding(.horizontal, 24)

            Text("Uses sample MNT data — ideal for UI testing before App Store.")
                .font(.caption2)
                .foregroundStyle(.white.opacity(0.65))
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
        }
    }
}

struct LoginFormView: View {
    @State private var email = ""
    @State private var password = ""
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        VStack(spacing: 16) {
            authField(title: "Email", content: {
                TextField("your@email.com", text: $email)
                    .keyboardType(.emailAddress)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
            })

            authField(title: "Password", content: {
                SecureField("••••••••", text: $password)
            })

            if let error = authContext.error {
                errorBanner(error)
            }

            Button {
                Task { await authContext.login(email: email, password: password) }
            } label: {
                if authContext.isLoading {
                    ProgressView().tint(.white)
                } else {
                    Text("Log in with API")
                }
            }
            .buttonStyle(EarnioPrimaryButtonStyle(isDisabled: authContext.isLoading))
            .disabled(authContext.isLoading)
        }
        .padding(.horizontal, 24)
    }
}

struct SignupFormView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var name = ""
    @State private var username = ""
    @State private var selectedUserType = "creator"
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        VStack(spacing: 16) {
            Picker("Account Type", selection: $selectedUserType) {
                Text("Creator").tag("creator")
                Text("Sponsor").tag("sponsor")
            }
            .pickerStyle(.segmented)

            authField(title: "Full name", content: { TextField("Bold Erdene", text: $name) })
            authField(title: "Username", content: {
                TextField("bold_erdene", text: $username)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
            })
            authField(title: "Email", content: {
                TextField("your@email.com", text: $email)
                    .keyboardType(.emailAddress)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
            })
            authField(title: "Password", content: { SecureField("••••••••", text: $password) })

            if let error = authContext.error {
                errorBanner(error)
            }

            Button {
                Task {
                    await authContext.signup(
                        email: email,
                        password: password,
                        userType: selectedUserType,
                        name: name,
                        username: username
                    )
                }
            } label: {
                if authContext.isLoading {
                    ProgressView().tint(.white)
                } else {
                    Text("Create account")
                }
            }
            .buttonStyle(EarnioPrimaryButtonStyle(isDisabled: authContext.isLoading))
            .disabled(authContext.isLoading)
        }
        .padding(.horizontal, 24)
    }
}

@ViewBuilder
private func authField<Content: View>(title: String, @ViewBuilder content: () -> Content) -> some View {
    VStack(alignment: .leading, spacing: 6) {
        Text(title)
            .font(.caption.weight(.semibold))
            .foregroundStyle(.white.opacity(0.9))
        content()
            .padding(12)
            .background(Color.white.opacity(0.12))
            .cornerRadius(EarnioTheme.buttonRadius)
            .foregroundStyle(.white)
    }
}

private func errorBanner(_ message: String) -> some View {
    Text(message)
        .font(.caption)
        .foregroundStyle(EarnioTheme.dangerRed)
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.white.opacity(0.95))
        .cornerRadius(8)
}

#Preview {
    AuthView().environmentObject(AuthContext())
}
