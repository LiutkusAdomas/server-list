/// <reference types="cypress" />

const selectors = {
    loginText: 'Sign in to your account',
    logoutText: 'When logged out',
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'Login',
    logoutButton: 'Logout',
    distanceSortButton: 'Distance',
    sortIndicator: 'img[alt="Direction"]'
}

describe('E2E test for the full flow of the app', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit(`localhost:5173`);
    })

    it('should run login, order the server list, logout', () => {
        cy.contains(selectors.loginText).should('be.visible');

        cy.get(selectors.usernameInput).type('tesonet');
        cy.get(selectors.passwordInput).type('partyanimal');
        cy.contains(selectors.loginButton).click();

        cy.contains(selectors.distanceSortButton).click();
        cy.contains('tr', selectors.distanceSortButton).find(selectors.sortIndicator).should('be.visible')
        cy.contains(selectors.logoutButton).scrollIntoView().click();

        cy.contains(selectors.logoutText).should('be.visible');
        cy.contains(selectors.logoutButton).click();

        cy.location('pathname').should('eq', '/login');
        cy.contains(selectors.loginText).should('be.visible');
    })
})