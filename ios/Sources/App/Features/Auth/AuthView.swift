import SwiftUI

struct AuthView: View {
    @State private var showLoginTab = true
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [Color(#colorLiteral(red: 0.2, green: 0.1, blue: 0.5, alpha: 1)), Color(#colorLiteral(red: 0.1, green: 0.2, blue: 0.4, alpha: 1))]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            VStack(spacing: 0) {
                // Header with Logo
                VStack(spacing: 20) {
                    Text("earnio")
                        .font(.system(size: 44, weight: .bold, design: .rounded))
                        .foregroundColor(.white)

                    Text("Connect. Create. Earn.")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.white.opacity(0.8))
                }
                .padding(.top, 60)
                .padding(.bottom, 40)

                // Tab Selection
                Picker("Auth Type", selection: $showLoginTab) {
                    Text("Login").tag(true)
                    Text("Sign Up").tag(false)
                }
                .pickerStyle(.segmented)
                .padding(.horizontal, 30)
                .padding(.bottom, 30)

                // Content
                if showLoginTab {
                    LoginFormView()
                } else {
                    SignupFormView()
                }

                Spacer()
            }
        }
    }
}

struct LoginFormView: View {
    @State private var email = ""
    @State private var password = ""
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        VStack(spacing: 20) {
            // Email Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Email")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)

                TextField("your@email.com", text: $email)
                    .textContentType(.emailAddress)
                    .keyboardType(.emailAddress)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .padding(12)
                    .background(Color.white.opacity(0.1))
                    .cornerRadius(10)
                    .foregroundColor(.white)
            }

            // Password Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Password")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)

                SecureField("••••••••", text: $password)
                    .textContentType(.password)
                    .padding(12)
                    .background(Color.white.opacity(0.1))
                    .cornerRadius(10)
                    .foregroundColor(.white)
            }

            // Error Message
            if let error = authContext.error {
                Text(error)
                    .font(.system(size: 13))
                    .foregroundColor(.red)
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.red.opacity(0.1))
                    .cornerRadius(8)
            }

            // Login Button
            Button(action: {
                Task {
                    await authContext.login(email: email, password: password)
                }
            }) {
                if authContext.isLoading {
                    ProgressView()
                        .progressViewStyle(.circular)
                        .tint(.white)
                } else {
                    Text("Login")
                        .font(.system(size: 16, weight: .semibold))
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
            .background(Color.white)
            .foregroundColor(.black)
            .cornerRadius(10)
            .disabled(authContext.isLoading)

            Spacer()
        }
        .padding(.horizontal, 30)
    }
}

struct SignupFormView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var firstName = ""
    @State private var lastName = ""
    @State private var selectedUserType = "creator"
    @EnvironmentObject var authContext: AuthContext

    var body: some View {
        VStack(spacing: 20) {
            // User Type Selection
            Picker("Account Type", selection: $selectedUserType) {
                Text("Creator").tag("creator")
                Text("Sponsor").tag("sponsor")
            }
            .pickerStyle(.segmented)
            .padding(.horizontal, 10)

            // First Name Field
            VStack(alignment: .leading, spacing: 8) {
                Text("First Name")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)

                TextField("John", text: $firstName)
                    .textContentType(.givenName)
                    .textInputAutocapitalization(.words)
                    .padding(12)
                    .background(Color.white.opacity(0.1))
                    .cornerRadius(10)
                    .foregroundColor(.white)
            }

            // Last Name Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Last Name")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)

                TextField("Doe", text: $lastName)
                    .textContentType(.familyName)
                    .textInputAutocapitalization(.words)
                    .padding(12)
                    .background(Color.white.opacity(0.1))
                    .cornerRadius(10)
                    .foregroundColor(.white)
            }

            // Email Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Email")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)

                TextField("your@email.com", text: $email)
                    .textContentType(.emailAddress)
                    .keyboardType(.emailAddress)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .padding(12)
                    .background(Color.white.opacity(0.1))
                    .cornerRadius(10)
                    .foregroundColor(.white)
            }

            // Password Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Password")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)

                SecureField("••••••••", text: $password)
                    .textContentType(.newPassword)
                    .padding(12)
                    .background(Color.white.opacity(0.1))
                    .cornerRadius(10)
                    .foregroundColor(.white)
            }

            // Error Message
            if let error = authContext.error {
                Text(error)
                    .font(.system(size: 13))
                    .foregroundColor(.red)
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.red.opacity(0.1))
                    .cornerRadius(8)
            }

            // Signup Button
            Button(action: {
                Task {
                    await authContext.signup(
                        email: email,
                        password: password,
                        userType: selectedUserType,
                        firstName: firstName,
                        lastName: lastName
                    )
                }
            }) {
                if authContext.isLoading {
                    ProgressView()
                        .progressViewStyle(.circular)
                        .tint(.white)
                } else {
                    Text("Create Account")
                        .font(.system(size: 16, weight: .semibold))
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
            .background(Color.white)
            .foregroundColor(.black)
            .cornerRadius(10)
            .disabled(authContext.isLoading)

            Spacer()
        }
        .padding(.horizontal, 30)
    }
}

#Preview {
    AuthView()
        .environmentObject(AuthContext())
}
