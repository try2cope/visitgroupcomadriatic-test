# visitgroupcomadriatic-test

PoC for VisitGroup.com Adriatic.

# Pre-requisites

1. Install Node.js [https://nodejs.org/en/download]
2. Install Visual Studio Code [https://code.visualstudio.com/download]
3. Install Docker [https://www.docker.com/get-started/]

# Setup

Run in VS Code terminal:

1. `npm install`
2. `npx playwright install`

# Run test

To run the test use the following command:
`npx playwright test`

# Run test with Docker

1. `docker build -t visitgroupcomadriatic-test .`
2. `docker run -it visitgroupcomadriatic-test:latest npm run test`
