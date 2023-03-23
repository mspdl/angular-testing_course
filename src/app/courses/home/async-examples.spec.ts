fdescribe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log("running asserions");
      test = true;
      expect(test).toBeTruthy;
      done();
    }, 1000);
  });
});
