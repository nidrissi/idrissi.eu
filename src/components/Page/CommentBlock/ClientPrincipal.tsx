export default class ClientPrincipal {
  userId: string;
  identityProvider: string;
  userDetails: string;
  userRoles: string[];

  constructor(
    userId: string,
    identityProvider: string,
    userDetails: string,
    userRoles: string[]
  ) {
    this.userId = userId;
    this.identityProvider = identityProvider;
    this.userDetails = userDetails;
    this.userRoles = userRoles;
  }

  toString(): string {
    return `${this.userDetails} @ ${this.identityProvider} [${this.userId}]`;
  }
}
