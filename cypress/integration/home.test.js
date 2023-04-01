describe("Home Page", () => {
  it("sould display a list of courses", () => {
    cy.visit("/");
    cy.contains("All Courses");
  });
});
