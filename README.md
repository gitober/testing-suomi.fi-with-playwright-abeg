## Suomi.fi Website Testing with Playwright
Group project for the User-Centered Design course at Metropolia University of Applied Sciences. The project involves testing the Suomi.fi website using Playwright.

### Group Members
- Anni Kannisto
- Birgitta Öberg
- Eetu Mäntylä
- George Chirikov


### Follow these steps to set up and run tests on the Suomi.fi website using Playwright:

## 1. Clone this Repository
First, clone this repository to your local machine with the following command:

```sh
git clone https://gitlab.metropolia.fi/user-centered-design/2024-autumn/testing-suomi.fi-with-playwright-abeg
```

## 2. Navigate to the Project Folder
Move into the project directory:

```sh
cd testing-suomi.fi-with-playwright-abeg
```

## 3. Install Required npm Packages
Install the necessary npm packages:

```sh
npm install
```

## 4. Install Playwright Browsers
Install the required browsers for Playwright (specifically Firefox, in this project):

```sh
npx playwright install
```

## 5. Update Snapshot Images
To update the snapshot images used in visual regression testing, run:

```sh
npx playwright test --update-snapshots --project firefox
```

## 6. Run the Tests
You can now run the tests with one of the following options:

### Run All Tests

```sh
npx playwright test
```

### Run Individual Tests
- **Navigation Visual Regression**:

  ```sh
  npx playwright test tests/navigation-visual-regression.spec.js
  ```

- **Address Validation**:

  ```sh
  npx playwright test tests/address-validation.spec.js
  ```

- **Expander Elements**:

  ```sh
  npx playwright test tests/expander-elements.spec.js
  ```

### Alternatively, You Can Use the Simpler Command

```sh
npm test
```

The program will now execute the tests on the Suomi.fi website using Playwright, with results displayed in the terminal.

