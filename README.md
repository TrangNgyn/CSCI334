# Getting Started with Trace Response

This project was created using the MERN stack and hosted on AWS

## Demo Link

<a href="http://csci334.s3-website-ap-southeast-2.amazonaws.com/" target="_blank" rel="noopener">View Here.</a>

## About the project

The focus of this project is to develop a web-based COVID-19 contact-tracing and vaccine-rollout support system.

Trace Response is a simulation web app that supports the following key aspects:

1. Support and manage different types of users and user profiles.
2. Support and manage contact tracing.
3. Support and manage alerts.
4. Support and manage vaccine rolling out.
5. Support and manage vaccine certifications.
6. Manage and generate various relevant reports and statistics.

## Targetted Users

1. Civilians: A diverse group of people with enough expertise in technology to use the Internet to access the system.
2. Businesses: Commercial enterprises offering their services or products to the public who have enough technical skills to utilize the system.
3. Healthcare Professionals: Trained experts who are knowledgeable about contact tracing and vaccination processes. A healthcare professional is also a Civilian so he/she has all functionalities of a Civilian.
4. Organisations (Healthcare Organisation): People who have authority to issue important information to the public and manage healthcare professionals. An Organisation can promote/demote a Civilian to a Healthcare Professional.
5. Admin: There is one and only one Admin account in the system. This account is used to verify Organisation accounts.

## Key Functionalities

<table>
    <thead>
        <tr>
            <th>Actor</th>
            <th>Product Functions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Civilian</td>
            <td>
                <ul>
                    <li>Register for an account</li>
                    <li>Sign in/sign out</li>
                    <li>Check in to a location</li>
                    <li>Check in dependents</li>
                    <li>View COVID-19 case information Australia-wide</li>
                    <li>View Australia-wide Hotspot Map</li>
                    <li>View their vaccine certification</li>
                    <li>View vaccine rollout information</li>
                    <li>Receive contact-tracing alert</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Healthcare Professional</td>
            <td>
                <ul>
                    <li>All Civilian's functionalities</li>
                    <li>Add/Update a Civilian's vaccination certificate by email</li>
                    <li>Flag a Civilian as infected</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Business</td>
            <td>
                <ul>
                    <li>Register for an Account</li>
                    <li>Sign in/sign out</li>
                    <li>Receive and View a QR code</li>
                    <li>Print the QR code</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Organisation</td>
            <td>
                <ul>
                    <li>Request to Register for an Account</li>
                    <li>Sign in/sign out (when verified)</li>
                    <li>Add an employee (Promote a Civilian account)</li>
                    <li>Remove an employee (Demote a Healthcare Professional account)</li>
                    <li>View overall employee statistics</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Admin</td>
            <td>
                <ul>
                    <li>View Organisations' Registration Requests</li>
                    <li>Verify an Organisation</li>
                    <li>Search for an Organisation by email</li>
                    <li>View all verified Organisation</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

<ins>Note: </ins>

- To register for an Organisation account, the user needs to make a request through the Login page, then wait for confirmation from the root account (Admin account).
- A user cannot sign up as a Healthcare Professional. However, they can request an Organisation to promote their account to have Healthcare Professional access, or demote their account to a Civilian account.

## Data Sources

### User Profile Test Cases

- To test the web app and simulate how Trace Response will be used, the test data was generated and imported into the database using the data scripts located in server/data_scripts
- Emails, names and passwords are generated randomly from a pool as located in folder server/data_scripts/random_files
- Generated logins are recorded in bus-logins (Business users), civ-logins (Civilian users), and org-logins (Organisation users).
- Generated users include:
  - 500 Civilian accounts
  - 500 verified Healthcare Professional accounts
  - 1000 Business accounts
  - 100 verified Organisation accounts
  - 1 Admin account

### Australia-wide COVID-19 Case and Vaccination Datasets

The datasets for the number of cases in Australia by states, the number of vaccinations, and vaccination rollout information are retreived from the following sources:

1. Australia OWID COVID-19 Data : https://github.com/owid/covid-19-data/tree/master/public/data
2. ESRI Australia COVID-19 Cases : https://covid19-esriau.hub.arcgis.com/datasets/esriau::historical-cases-deaths-tests-by-state/about
3. Confirmed cases by locations : https://data.nsw.gov.au/search/dataset/ds-nsw-ckan-aefcde60-3b0c-4bc0-9af1-6fe652944ec2/details?q=
4. victoria's Confirmed Cases : https://www.dhhs.vic.gov.au/ncov-covid-cases-by-lga-source-csv

<ins>Note:</ins>

- For the owid dataset you need to manually remove all rows that are not from Australia and you need to change the date format from the default "/" to "YYYY-MM-DD" inside the csv document.

## Some In-app Screenshots

1. Log-in Page
   ![Login Page](https://github.com/TrangNgyn/CSCI334/blob/main/screenshots/Login.png?raw=true)

2. Healthcare Worker's Homepage
   ![Healthcare Worker's Homepage](https://github.com/TrangNgyn/CSCI334/blob/main/screenshots/HealthcareHomepage.png?raw=true)

3. Healthcare Tools
   ![Healthcare Tools](https://github.com/TrangNgyn/CSCI334/blob/main/screenshots/HealthcareTools.png?raw=true)

4. Business' QR Code
   ![QR Code](https://github.com/TrangNgyn/CSCI334/blob/main/screenshots/QRCode.png?raw=true)

5. Dependant Check-in Page
   ![Dependant Check-in](https://github.com/TrangNgyn/CSCI334/blob/main/screenshots/CheckinDependants.png?raw=true)

6. Roll Out Information
   ![Roll Out Information](https://github.com/TrangNgyn/CSCI334/blob/main/screenshots/RolloutInfo.png?raw=true)

7. Demoting Healthcare Account / Remove Employee from Organisation
   ![Remove Employee](https://github.com/TrangNgyn/CSCI334/blob/main/screenshots/OrgRemoveEmp.png?raw=true)
