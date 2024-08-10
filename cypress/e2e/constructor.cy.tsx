import Cypress from 'cypress';

const baseUrl = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
    cy.intercept('GET', `${baseUrl}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', `${baseUrl}/auth/user`, { fixture: 'user.json' });
    cy.intercept('POST', `${baseUrl}/auth/login`, { fixture: 'user.json' });
    cy.intercept('POST', `${baseUrl}/orders`, { fixture: 'order.json' }).as('postOrder');

    window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
    cy.setCookie('accessToken', 'accessToken');
    cy.visit('/');
});

afterEach(() => {
    cy.clearAllCookies();
    window.localStorage.clear();
});

describe('Тестим работу ингридиентов', () => {
    it('Добавление ингредиента из списка в конструктор', () => {
        cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]')
            .children('button')
            .contains('Добавить')
            .click();
    });
    it('Тестим модалку', () => {
        cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').click();
        cy.get('#modals').should('be.not.empty');
        cy.get('#modals').find('button').click();
    });
});
describe('Тестим заказ', () => {
    it('Накидываем ингридиенты и и оформляем', () => {
        cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]')
            .children('button')
            .contains('Добавить')
            .click();
        cy.get(`[data-cy="643d69a5c3f7b9001cfa0941"]`)
            .children('button')
            .contains('Добавить')
            .click();
        cy.visit('/feed/49120');
    })
});