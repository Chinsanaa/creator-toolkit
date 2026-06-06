export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing-page auth-layout flex min-h-full flex-1 items-center justify-center px-5 py-16">
      {children}
    </div>
  );
}
