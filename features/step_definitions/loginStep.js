const assert = require('assert');
const { Given, When, Then } = require('cucumber');


Given('I navigate to the login page', function () {
});

  Given('I enter the username as {string} and password as {string}', function (username, password) {
    
    console.log(username + password);
  });

  Given('I click login button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should see patientHome page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });