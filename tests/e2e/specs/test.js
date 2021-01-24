describe("[MOBILE] Validate visible elements", () => {
  before(() => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("Ensures logo is visible", () => {
    cy.get('[data-role="logo"]').should("be.visible");
  });

  it("Ensures search is visible", () => {
    cy.get('[data-role="search"]').should("be.visible");
  });

  it("Ensures grid is not visible", () => {
    cy.get('[data-role="grid"]').should("not.be.visible");
  });

  it("Ensures carousel is visible", () => {
    cy.get('[data-role="carousel"]').should("be.visible");
  });
});

describe("[MOBILE] Validate actions", () => {
  before(() => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("Ensures search action", () => {
    cy.get('[data-role="search"]').type("arcanine break");
    cy.contains('[data-role="carousel-card-name"] span', "Arcanine BREAK");
    cy.contains('[data-role="carousel-card-id"] span', "xyp-XY180");
    cy.get('[data-role="search"]').clear();
  });

  it("Ensures empty search action", () => {
    cy.get('[data-role="search"]').type("arcanine break");
    cy.get('[data-role="search"]').clear();
    cy.get('[data-role="carousel-card"]').should("have.length", 4);
  });

  it("Ensures pagination to next", () => {
    cy.get('[data-role="carousel"]').scrollTo("right");
    cy.get('[data-role="carousel-card"]').should("have.length", 8);
  });

  it("Ensures navigation", () => {
    cy.contains('[data-role="carousel-card"]', "swsh4-177").click();
    cy.url().should("include", "/detail/swsh4-177");
  });
});

describe("[MOBILE] Validate detail", () => {
  before(() => {
    cy.visit("/#/detail/swsh4-177");
  });

  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("Ensures detail data", () => {
    cy.contains('[data-role="detail-id"]', "swsh4-177");
    cy.contains('[data-role="detail-types"]', "Metal");
    cy.contains('[data-role="detail-resistances"]', "Grass (-30)");
    cy.contains('[data-role="detail-weaknesses"]', "Fire (×2)");
    cy.contains('[data-role="detail-attacks"]', "Slash");
    cy.contains('[data-role="detail-attacks"]', "Sonic Edge");
  });

  it("Ensures attack modal data", () => {
    cy.contains('[data-role="detail-attacks"] li', "Slash").click();
    cy.get('[data-role="detail-attack-modal"]').should("be.visible");
    cy.get('[data-role="attack-modal-name"]').should("be.visible");
    cy.get('[data-role="attack-modal-cost"]').should("be.visible");
    cy.get('[data-role="attack-modal-damage"]').should("be.visible");
    cy.get('[data-role="attack-modal-desc"]').should("be.visible");
    cy.get('[data-role="attack-modal-close"]').should("be.visible");

    cy.contains('[data-role="attack-modal-name"]', "Slash");
    cy.contains('[data-role="attack-modal-cost"] span', "Metal");
    cy.contains('[data-role="attack-modal-cost"] span', "Colorless");
    cy.contains('[data-role="attack-modal-damage"] span', "50");
    cy.contains('[data-role="attack-modal-desc"] span', "-");
    cy.get('[data-role="attack-modal-close"]').click();
  });

  it("Ensures attack modal close", () => {
    cy.contains('[data-role="detail-attacks"] li', "Slash").click();
    cy.get('[data-role="detail-attack-modal"]').should("be.visible");

    cy.get('[data-role="attack-modal-close"]').click();
    cy.get('[data-role="detail-attack-modal"]').should("not.be.visible");
  });
});

describe("[MOBILE/DESKTOP] Validate visible elements (Detail)", () => {
  before(() => {
    cy.visit("/#/detail/swsh4-177");
  });

  it("Ensures detail logo is visible", () => {
    cy.get('[data-role="logo"]').should("be.visible");
  });

  it("Ensures detail image is visible", () => {
    cy.get('[data-role="detail-img"]').should("be.visible");
  });

  it("Ensures detail data is visible", () => {
    cy.get('[data-role="detail-id"]').should("be.visible");
    cy.get('[data-role="detail-types"]').should("be.visible");
    cy.get('[data-role="detail-resistances"]').should("be.visible");
    cy.get('[data-role="detail-weaknesses"]').should("be.visible");
    cy.get('[data-role="detail-attacks"]').should("be.visible");
  });

  it("Ensures detail attack modal is not visible", () => {
    cy.get('[data-role="detail-attack-modal"]').should("not.be.visible");
  });
});

describe("[DESKTOP] Validate visible elements (Home)", () => {
  before(() => {
    cy.visit("/");
  });

  it("Ensures logo is visible", () => {
    cy.get('[data-role="logo"]').should("be.visible");
  });

  it("Ensures search is visible", () => {
    cy.get('[data-role="search"]').should("be.visible");
  });

  it("Ensures grid is visible", () => {
    cy.get('[data-role="grid"]').should("be.visible");
    cy.get('[data-role="prev"]').should("be.visible");
    cy.get('[data-role="next"]').should("be.visible");
    cy.get('[data-role="page"]').should("have.text", "1");
  });

  it("Ensures carousel is not visible", () => {
    cy.get('[data-role="carousel"]').should("not.be.visible");
  });
});

describe("[DESKTOP] Validate actions", () => {
  before(() => {
    cy.visit("/");
  });

  it("Ensures search action", () => {
    cy.get('[data-role="search"]').type("arcanine break");
    cy.contains("li", "Arcanine BREAK");
    cy.contains("li", "xyp-XY180");
  });

  it("Ensures empty search action", () => {
    cy.get('[data-role="search"]').type("arcanine break");
    cy.get('[data-role="search"]').clear();
    cy.get("li").should("have.length", 4);
  });

  it("Ensures pagination to previous is disabled", () => {
    cy.get('[data-role="prev"]').should("have.class", "disabled");
  });

  it("Ensures pagination to next", () => {
    cy.get('[data-role="next"]').click();
    cy.get('[data-role="page"]').should("have.text", "2");
    cy.contains("li", "det1-6");
    cy.get('[data-role="prev"]').click();
  });

  it("Ensures pagination to previous", () => {
    cy.get('[data-role="next"]').click();
    cy.get('[data-role="prev"]').click();
    cy.get('[data-role="page"]').should("have.text", "1");
    cy.contains("li", "swsh4-177");
  });

  it("Ensures navigation", () => {
    cy.contains("li", "swsh4-177").click();
    cy.url().should("include", "/detail/swsh4-177");
  });
});

describe("[DESKTOP] Validate detail", () => {
  before(() => {
    cy.visit("/#/detail/swsh4-177");
  });

  it("Ensures detail data", () => {
    cy.contains('[data-role="detail-id"]', "swsh4-177");
    cy.contains('[data-role="detail-types"]', "Metal");
    cy.contains('[data-role="detail-resistances"]', "Grass (-30)");
    cy.contains('[data-role="detail-weaknesses"]', "Fire (×2)");
    cy.contains('[data-role="detail-attacks"]', "Slash");
    cy.contains('[data-role="detail-attacks"]', "Sonic Edge");
  });

  it("Ensures attack modal data", () => {
    cy.contains('[data-role="detail-attacks"] li', "Slash").click();
    cy.get('[data-role="detail-attack-modal"]').should("be.visible");
    cy.get('[data-role="attack-modal-name"]').should("be.visible");
    cy.get('[data-role="attack-modal-cost"]').should("be.visible");
    cy.get('[data-role="attack-modal-damage"]').should("be.visible");
    cy.get('[data-role="attack-modal-desc"]').should("be.visible");
    cy.get('[data-role="attack-modal-close"]').should("be.visible");

    cy.contains('[data-role="attack-modal-name"]', "Slash");
    cy.contains('[data-role="attack-modal-cost"] span', "Metal");
    cy.contains('[data-role="attack-modal-cost"] span', "Colorless");
    cy.contains('[data-role="attack-modal-damage"] span', "50");
    cy.contains('[data-role="attack-modal-desc"] span', "-");
    cy.get('[data-role="attack-modal-close"]').click();
  });

  it("Ensures attack modal close", () => {
    cy.contains('[data-role="detail-attacks"] li', "Slash").click();
    cy.get('[data-role="detail-attack-modal"]').should("be.visible");
    cy.get('[data-role="attack-modal-close"]').click();
    cy.get('[data-role="detail-attack-modal"]').should("not.be.visible");
  });
});
