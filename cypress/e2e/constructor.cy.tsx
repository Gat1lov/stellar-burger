import Cypress from 'cypress';

const notbaseUrl = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
    cy.intercept('GET', `${notbaseUrl}/ingredients`, { fixture: 'ingredients.json' });
    cy.intercept('GET', `${notbaseUrl}/auth/user`, { fixture: 'user.json' });
    cy.intercept('POST', `${notbaseUrl}/auth/login`, { fixture: 'user.json' });
    cy.intercept('POST', `${notbaseUrl}/orders`, { fixture: 'order.json' });

    // Установка состояния пользователя
    window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
    cy.setCookie('accessToken', 'accessToken');
    cy.visit('/');
});

afterEach(() => {
    cy.clearAllCookies();
    window.localStorage.clear();
});

describe('Оформление заказа', () => {
    it('Пользователь может оформить заказ', () => {
        cy.get('[data-cy="ingredient"]');
    });
});
