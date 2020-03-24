export default `
  type AuthResponse {
    token: String!
    tokenExpiry: String!
  }

  extend type Query {
    refreshAccessToken: AuthResponse!
  }
`;
