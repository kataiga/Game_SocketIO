const UserManagement = require('./UserManagement');

test('Login with email=johangaudisson@epitech.eu + password=azerty123!', () => {
    expect(UserManagement.login("johan.gaudisson@epitech.eu", "azerty123!")).toBe("OK");
});