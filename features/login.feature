Feature: Login

    Scenario: valid_login
        Given I navigate to the login page
        And I enter the username as "12345678" and password as "test"
        And I click login button
        Then I should see patientHome page
