"use strict";

const supertest = require("supertest");
const { server } = require("../src/server.js");
const request = supertest(server);

describe("express server", () => {
  it("should response with 404 on a bad route", async () => {
    // arrange
    let param = "/notfound";
    let status = 404;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should response with 404 on a bad method", async () => {
    // arrange
    let param = "/";
    let status = 404;
    // act
    const response = await request.post(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should check 500 errors", async () => {
    // arrange
    let param = "/bad";
    let status = 500;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
  // --------------------------------------
  it("should POST to /signup to create a new user", async () => {
    // arrange
    let param = "/signup";
    let status = 201;
    // act
    const response = await request
      .post(param)
      .auth(`Test${Math.floor(Math.random() * 100)}`, "xxx");
    // assert
    expect(response.status).toBe(status);
    expect(response.body).toHaveProperty("username");
  });
  it("should POST to /signin to login as a user (use basic auth)", async () => {
    // arrange
    let param = "/signin";
    let status = 200;
    // act
    const response = await request.post(param).auth("xxx", "xxx");

    // assert
    expect(response.status).toBe(status);
    expect(response.body).toHaveProperty("username");
  });

  it("should POST to /signin rise error if user or password wrong", async () => {
    // arrange
    let param = "/signin";
    let status = 401;
    // act
    const response = await request.post(param).auth("xxx", "xxxxx");

    // assert
    expect(response.status).toBe(status);
  });

  it("should POST to /signup rise an error if user exsit", async () => {
    // arrange
    let param = "/signup";
    let status = 401;
    // act
    const response = await request.post(param).auth(`xxx`, "xxx");
    // assert
    expect(response.status).toBe(status);
  });
});
