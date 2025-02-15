# Jira Clone Demo 📋

🚀 **Welcome to the Jira Clone Demo repository!**  
This project is a fork of [daniserrano7/jira-clone](https://github.com/daniserrano7/jira-clone), enhanced with:

- **End-to-End Tests** using [Playwright](https://playwright.dev/) and **TypeScript**
- **Performance Tests** using [JMeter](https://jmeter.apache.org/)

> 🛠️ **Work in Progress**:

- Testing features for issues are currently being developed and will be added soon for both API and UI tests, starting with API tests.
- Expand performance tests using k6, which looks interesting and can be maintained in the same codebase. 🤔
- Fix GitHub Actions artifact: The Playwright report is inaccurate, showing failed tests even though the test logs indicate passing results.

---

## 🚀 Running the Application

This project runs in a **Dockerized environment**, ensuring a consistent setup across all machines.

### **Using Docker Compose (Recommended)**

To start the full environment, including the application, database, and tests, run:

```sh
docker-compose up --build
```

This will:
✅ Start **PostgreSQL** as the database.
✅ Start the **Jira Clone App**.
✅ Run **Playwright tests**.
✅ Persist **Playwright reports** for test results.

To stop the environment:

```sh
docker-compose down
```

### **Pulling and Running the Docker Image**

If you prefer to **pull the prebuilt image** from Docker Hub, use:

```sh
docker pull dramos84/jira-clone-tests:latest
```

If you already have a `.env` file with credentials, run:

```sh
docker run --env-file .env dramos84/jira-clone-tests:latest
```

**Important:** Running `docker run` alone will not start the database. You need to ensure PostgreSQL is running separately or use `docker-compose`.

---

## 🎯 GitHub Actions & CI/CD Workflow

Whenever code is merged into the `master` branch, **GitHub Actions** automatically:

1. **Builds and pushes the Docker image** to Docker Hub.
2. **Runs Playwright tests** inside a container.
3. **Uses GitHub Secrets** to inject environment variables securely.

This setup ensures **automated testing** and **secure deployments** without exposing sensitive credentials.

---

## 🛠️ Configuration

This project uses two Playwright configuration files:

- **UI Tests Configuration**: `playwright.config.ts`

  - Runs UI tests in all major browsers (Chromium, Firefox, WebKit).
  - Run the UI tests with the command `npx playwright test` as this will read the default `playwright.config.ts` file automatically executing the tests under the folder `tests/ui-tests` or by executing the script defined in `package.json`:
    ```sh
    npm run test-ui
    ```
    This script starts the application (if it's not started) and executes the tests.

- **API Tests Configuration**: `api.config.ts`
  - Runs API tests only in Chromium.
  - Run the API tests with the command `npx playwright test tests/api-tests --config=api.config.ts` or using the script defined in `package.json`:
    ```sh
    npm run test-api
    ```

---

## 🌟 Features

### **End-to-End Tests**

The tests are written in **TypeScript** and follow the **Page Object Model (POM)** for better maintainability and reusability.

#### **🔑 Login Tests**

- **Login as Default User**:
  - Verifies login page elements.
  - Logs in as the default user.
  - Asserts redirection to the Projects Page.

#### **📂 Projects Tests**

- Tests utilize stored API authentication state for efficiency.
- **User Can Add a Project**:
  - Adds a new project using randomly generated titles and descriptions (via `faker.js`).
  - Confirms the project appears in the Projects Page.
- **Default User Can Create a Project**:
  - Verifies that a user can create a project by submitting the project form.
- **Create a Project with Multiple Owners**:
  - Creates a project with multiple owners.
  - Logs in as assigned users to verify access.
  - Confirms assigned users can view the project in their project list.
- **Project Restriction Deletion**
  - Verifies that default application projects can't be deleted.

#### **🚪 Logout Tests**

- Tests utilize stored API authentication state for efficiency.
- **User Can Log Out**:
  - Confirms a logged-in user can log out successfully.
  - Asserts redirection to the login page.

### **API Tests**

The API tests are written in **TypeScript** and cover various scenarios for the projects feature.

#### **📂 Projects API Tests**

- **Create New Project**:
  - Verifies that a new project can be created with a valid title and description.
- **Create New Project with No Description**:
  - Verifies that a new project can be created with a valid title but no description.
- **Create New Project with Long Title**:
  - Verifies that a new project can be created with a title containing 30 or 31 characters.
- **Create New Project with No Title**:
  - Verifies that creating a project without a title returns a 400 status code.

#### **🔑 Login API Tests**

- **Visit Login Page**:
  - Verifies that the login page can be accessed and returns a 200 status code.
- **Login as Valid User**:
  - Verifies that a valid user can log in and returns a 200 status code.
- **Login as Invalid User**:
  - Verifies that logging in with an invalid user returns a 404 status code.
- **Visit Non-Existing Page**:
  - Verifies that visiting a non-existing page returns a 404 status code.

---

## 📈 Performance Tests

[Performance tests](https://github.com/DanielRamos84/jira-clone-testing-playwright-jmeter/blob/master/jmeter/README.md) are implemented using JMeter to analyze and validate the system's performance under various load conditions.

---

## 🎯 Project Highlights

- **Testing Frameworks**:
  - End-to-End Testing: [Playwright](https://playwright.dev/) with **TypeScript**
  - Performance Testing: [JMeter](https://jmeter.apache.org/)
- **Testing Design**:
  - Organized using the **Page Object Model (POM)** for scalability.
  - Incorporates **API-driven tests** for efficiency.
  - Utilizes `faker.js` for generating dynamic test data.


