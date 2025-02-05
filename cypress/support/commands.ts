Cypress.Commands.add('checkAnalytics', (fixture: string, replacementValues) => {
  cy.loadFixtureWithReplacements(`analytics${fixture}`, replacementValues).then(
    finalExpectData => {
      cy.get('@dataL').should('be.calledWithMatch', finalExpectData);
    },
  );
});

Cypress.Commands.add('clearSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then(win => {
    win.sessionStorage.clear();
  });
});

Cypress.Commands.add('hideFetch', () => {
  cy.intercept({ resourceType: /fetch/ }, { log: false });
});

/* eslint-disable @typescript-eslint/default-param-last */
Cypress.Commands.add(
  'interceptWithFixture',
  (
    method: string,
    urlPattern: string | RegExp,
    fixturePath: string,
    alias: string,
    regexp = false,
    statusCode?: number,
    replacementArray?: Array<Record<string, string>>,
  ) => {
    const urlMatcher = regexp ? new RegExp(urlPattern) : urlPattern;

    cy.fixture(`/intercept${fixturePath}`).then(fixtureData => {
      let modifiedData = JSON.stringify(fixtureData);

      if (replacementArray) {
        replacementArray.forEach(replacement => {
          const key = Object.keys(replacement)[0];
          const value = replacement[key];
          modifiedData = modifiedData.replace(new RegExp(key, 'g'), value);
        });
      }

      const finalData = JSON.parse(modifiedData);

      cy.intercept(
        {
          method,
          url: urlMatcher,
          headers: {},
        },
        req => {
          req.reply(res => {
            if (statusCode) {
              res.send(statusCode, finalData);
            } else {
              res.send(finalData);
            }
          });
        },
      ).as(alias);
    });
  },
);
/* eslint-enable @typescript-eslint/default-param-last */

Cypress.Commands.add(
  'loadFixtureWithReplacements',
  (fixturePath, replacementsArray) => {
    const applyReplacements = (obj, replacements) => {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
          applyReplacements(obj[key], replacements);
        } else {
          const replacement = replacements.find(
            ({ key: rKey }) => rKey === obj[key],
          );
          if (replacement) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = replacement.value;
          }
        }
      });
    };

    return cy.fixture(fixturePath).then(fixtureData => {
      const updatedFixtureData = { ...fixtureData };

      if (replacementsArray) {
        const replacements = replacementsArray
          .map(Object.entries)
          .map(([[key, value]]) => ({
            key,
            value: typeof value === 'string' ? value.trim() : value,
          }));

        applyReplacements(updatedFixtureData, replacements);
      }

      cy.log(`***Loaded JSON file: ${JSON.stringify(updatedFixtureData)}***`);

      return cy.wrap(updatedFixtureData);
    });
  },
);

Cypress.Commands.add('pushDataLayer', { prevSubject: true }, subject => {
  cy.wrap(subject)
    .its('dataLayer')
    .should('respondTo', 'push')
    .then(dataLayer => {
      cy.spy(dataLayer, 'push').as('dataL');
    });
});

Cypress.Commands.add('replaceText', (selector, text) => {
  cy.get(selector).each(element => {
    cy.wrap(element).invoke('text', text);
  });
});

Cypress.Commands.add('setCookies', (cookies: Array<Cypress.Cookie>) => {
  cookies.forEach(cookie => {
    cy.setCookie(cookie.name, cookie.value, {
      path: cookie.path,
      domain: cookie.domain,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
      expiry: cookie.expiry,
      sameSite: cookie.sameSite,
    });
  });
});
