# Authentication Flow

## Login
1. User accesses login page
2. System checks existing session
   - If session exists → Redirect to dashboard
   - If no session → Display login form
3. User enters credentials
4. System validates credentials
   - If invalid → Show error with attempts counter
   - If valid → Redirect to dashboard

## Registration
1. User opens registration page
2. User enters name, email, password
3. System validates input
   - If invalid → Show error
   - If valid → Create account and redirect to login page

## Logout
1. User clicks "Logout"
2. System clears session
3. Redirects to login page
