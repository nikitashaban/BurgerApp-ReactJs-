import reducer from "./auth";
import * as actions from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      error: null,
      userId: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
  it("should return some-token", () => {
    expect(
      reducer(
        {
          token: null,
          error: null,
          userId: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actions.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id"
        }
      )
    ).toEqual({
      token: "some-token",
      error: null,
      userId: "some-user-id",
      loading: false,
      authRedirectPath: "/"
    });
  });
});
