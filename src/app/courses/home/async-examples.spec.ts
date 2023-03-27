import { fakeAsync, flush, flushMicrotasks } from "@angular/core/testing";

describe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log("running assertions");
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Asynchronous test example - setTimeout()", fakeAsync(() => {
    let test = false;

    setTimeout(() => {});

    setTimeout(() => {
      console.log("running assertions setTimeout()");
      test = true;
    }, 1000);

    expect(test).toBeFalse();
    flush();
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {
    let test = false;
    console.log("Creating promise");
    Promise.resolve()
      .then(() => {
        console.log("Promise first then() evaluated successfully");
        test = true;
        return Promise.resolve();
      })
      .then(() => {
        console.log("Promise second then() evaluated successfully");
      });
    console.log("Running test assertions");
    flushMicrotasks();
    expect(test).toBeTruthy();
  }));
});
