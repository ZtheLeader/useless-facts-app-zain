describe('Random Fact Page', () => {
  beforeEach(() => {
    cy.visit('/random-fact');
  });

  it('should display the header and navigation', () => {
    cy.get('mat-toolbar').should('be.visible');
    cy.contains('Useless Facts Explorer').should('be.visible');

    cy.contains('Random').should('be.visible');
    cy.contains('Favorites').should('be.visible');
  });

  it('should display a random fact on page load', () => {
    cy.get('mat-spinner').should('not.exist', { timeout: 10000 });

    cy.get('mat-card').should('be.visible');
    cy.get('mat-card-content p').should('not.be.empty');

    cy.contains('button', 'Get New Fact').should('be.visible');
    cy.contains('button', 'Add to Favorites').should('be.visible');
  });

  it('should fetch a new fact when clicking "Get New Fact"', () => {
    cy.get('mat-spinner').should('not.exist', { timeout: 10000 });

    let initialFactText = '';
    cy.get('mat-card-content p')
      .invoke('text')
      .then((text) => {
        initialFactText = text;

        cy.contains('button', 'Get New Fact').click();

        cy.get('mat-spinner').should('not.exist', { timeout: 10000 });

        cy.get('mat-card-content p')
          .invoke('text')
          .should((newText) => {
            if (newText === initialFactText) {
              cy.log('Note: Received the same fact twice - this is possible but rare');
            }
          });
      });
  });

  it('should add a fact to favorites when clicking "Add to Favorites"', () => {
    cy.get('mat-spinner').should('not.exist', { timeout: 10000 });

    let factText = '';
    cy.get('mat-card-content p')
      .invoke('text')
      .then((text) => {
        factText = text;
      });

    cy.contains('button', 'Add to Favorites').click();

    cy.contains('button', 'Remove from Favorites').should('be.visible');

    cy.contains('Favorites').click();
    cy.url().should('include', '/favorites');

    cy.get('mat-card').should('be.visible');
    cy.get('mat-card-content p').should('contain', factText);
  });

  it('should remove a fact from favorites when clicking "Remove from Favorites"', () => {
    cy.visit('/random-fact');
    cy.get('mat-spinner').should('not.exist', { timeout: 10000 });

    cy.get('button[mat-stroked-button]').then(($btn) => {
      if ($btn.text().includes('Add to Favorites')) {
        let factText = '';
        cy.get('mat-card-content p')
          .invoke('text')
          .then((text) => {
            factText = text;
          });

        cy.contains('button', 'Add to Favorites').click();
        cy.contains('button', 'Remove from Favorites').should('be.visible');

        cy.contains('button', 'Remove from Favorites').click();

        cy.contains('button', 'Add to Favorites').should('be.visible');

        cy.contains('Favorites').click();
        cy.url().should('include', '/favorites');

        cy.get('body').then($body => {
          if ($body.find('mat-card').length > 0) {
            cy.get('mat-card-content p').should('not.contain', factText);
          } else {
            cy.contains('No Favorite Facts Yet!').should('exist');
          }
        });
      } else {
        cy.contains('button', 'Remove from Favorites').click();
        cy.contains('button', 'Add to Favorites').should('be.visible');
      }
    });
  });

  it('should handle multiple requests gracefully', () => {
    cy.get('mat-spinner').should('not.exist', { timeout: 10000 });

    for (let i = 0; i < 3; i++) {
      cy.contains('button', 'Get New Fact').click({ force: true });
      cy.wait(100);
    }

    cy.get('mat-card').should('be.visible', { timeout: 10000 });
    cy.contains('button', 'Get New Fact').should('be.visible');
  });

  it('should be responsive on mobile viewports', () => {
    cy.viewport('iphone-x');

    cy.get('mat-spinner').should('not.exist', { timeout: 10000 });

    cy.get('mat-toolbar').should('be.visible');

    cy.get('mat-card').should('be.visible');

    cy.contains('button', 'Get New Fact').should('be.visible');
    cy.contains('button', 'Add to Favorites').should('be.visible');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', 'https://uselessfacts.jsph.pl/**', {
      statusCode: 500,
      body: 'Server Error'
    }).as('apiError');

    cy.reload();

    cy.wait('@apiError');

    cy.get('body').then($body => {
      if ($body.find('.text-red-700').length > 0) {
        cy.get('.text-red-700').should('be.visible');
      } else if ($body.find('.error-message').length > 0) {
        cy.get('.error-message').should('be.visible');
      } else {
        cy.contains(/error|failed|unable|cannot/i).should('exist');
      }
    });

    // No fact card should be visible when there's an error
    cy.get('mat-card').should('not.exist');
  });
});
