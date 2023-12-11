<h2 align="center">
DOCCURE  - Diagnostic Center Management System<br/>
  <a href="https://doccure-38b2f.web.app" target="_blank">Demo Link - - -</a>
</h2>
<div align="center">
  <img alt="Demo" src="./public/home.png" />
</div>

<h2 align="center">
 <img alt="Demo" src="./src/assets/logo (1).png" />
</h2>

DOCCURE is a robust and user-friendly healthcare management system designed to streamline the user experience for both healthcare professionals and patients. This system leverages Firebase Authentication for secure login and user profile management, ensuring data integrity and confidentiality.

## Key Features

### User Authentication and Profile Management

- Firebase Authentication for secure email/password login
- User registration with detailed profile information (name, avatar, blood group, location, etc.)
- User status management (default: active, with the ability for admin to block users)

### User Dashboard

- Private user dashboard with sections for profile management, upcoming appointments, and test results
- Upcoming Appointments: View, cancel, and manage upcoming appointments
- Test Results: Access and download test results for records

### Homepage

- Dynamic banner management by admin with properties such as title, image, text, coupon code, and discount rate
- Navigation based on user roles (user dashboard or admin dashboard)
- Display of featured tests, promotions, and personalized recommendations

### All Tests Page

- Display of all available tests with relevant information
- Search feature to filter tests by date
- Detailed view with the ability to book tests

### Details Page

- View detailed information about a specific test
- Book tests, reducing available slots upon booking
- Payment integration using Stripe with the option to apply promo codes

### Admin Dashboard

- All Users Route: View and manage user details, change user status, and assign admin roles
- Add a Test Route: Admin can add new tests with details
- All Tests Route: View, update, and delete test/service data
- Reservation Route: Manage user reservations, search reservations by email, and submit test results
- Add Banner: Admin can upload banner data with options to activate or deactivate
- All Banners: View and manage all banners, selecting one for display in the homepage banner

## Technologies Used

- React.js for the frontend
- Firebase Authentication for user authentication
- Stripe for payment integration
- Node.js and Express for the backend
- MongoDB for data storage
