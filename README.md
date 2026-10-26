# BulkRate-FarmBureau

## Project Overview
A browser automation testing project built with Playwright and JavaScript to test insurance quote workflows in the InsureHub practice application.

## Technologies Used
- JavaScript
- Playwright
- Node.js and npm
- Git and GitHub

## Test Coverage
- Positive insurance quote workflows
- Five insurance types: Health, Car, Term Life, Travel, and Home
- Plan name and premium validation
- Empty-form submission testing
- Negative-age testing
- Boundary Value Analysis (BVA)
- Browser input validity assertions

## Project Structure
- `pages/` — Page Object Model files
- `test-data/` — Test data
- `tests/` — Automated test cases
- `playwright.config.js` — Playwright configuration

## Setup
Install dependencies:

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
npx playwright test --workers=1 --reporter=list
```

## View HTML Report

```bash
npx playwright show-report
```

## Application Under Test
InsureHub practice application:  
https://jstestingacademy.co.in/qa-apps/insurehub/index.html

## Test Results
The project previously completed 40 automated tests successfully. Run the latest suite to confirm the current results.

## Author
Sree Charan
