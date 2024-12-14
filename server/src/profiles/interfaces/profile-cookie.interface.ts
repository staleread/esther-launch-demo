interface CookiePartitionKey {
  hasCrossSiteAncestor: boolean | undefined;
  topLevelSite: string | undefined;
}

export interface ProfileCookie {
  domain: string;
  expirationDate: number | undefined;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  partitionKey: CookiePartitionKey | undefined | null;
  path: string;
  sameSite: 'no_restriction' | 'lax' | 'strict' | 'unspecified';
  secure: boolean;
  session: boolean;
  storeId: string | null;
  value: string;
}
