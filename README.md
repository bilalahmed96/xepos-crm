# XEPOS CRM

XEPOS CRM is a Customer Relationship Management system built with Laravel 8 and Vue 2. It helps manage your company's customer interactions, sales, and data efficiently.

## Features

- **Company Management:** Manage company profiles, including names, emails, logos, and websites.
- **Employee Management:** Track employee details, including names, companies, emails, and contact information.
- **User Authentication:** Secure login and logout functionality.
- **Email Notifications:** Receive email notifications when a new company is added.
- **Pagination:** Easily browse through large datasets.
- **Responsive Design:** Works on various devices and screen sizes.

## Installation

1. **Clone Repository:**
git clone https://github.com/yourusername/xepos-crm.git

2. **Install Composer Dependencies:**
composer install

3. **Install NPM Dependencies:**
npm install

4. **Create a Copy of Your `.env` File:**
cp .env.example .env

5. **Generate Application Key:**
php artisan key:generate

6. **Database Setup:**
- Create a MySQL database.
- Update the `.env` file with your database credentials.
- Run migrations and seeders:
  ```
  php artisan migrate --seed
  ```

7. **Start Development Server:**
php artisan serve

8. **Access Application:**
Open your web browser and navigate to `http://localhost:8000`.

## Usage

- **Login:** Visit the login page to access the CRM system.
- **Company Management:** Add, update, or remove company profiles.
- **Employee Management:** Manage employee information and assign them to companies.
- **Pagination:** Efficiently browse through the list of companies and employees.
- **Logout:** Safely log out of the system.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Author

- [Bilal Ahmed](https://github.com/bilalahmed96)

For more information and support, visit the [XEPOS CRM Repository](https://github.com/bilalahmed96/xepos-crm).
