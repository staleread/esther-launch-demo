import type { Profile } from '@/types/model.types';

export function getProfiles(): Profile[] {
  return [
    {
      id: '675961f8bd2ddbd222ff1df1',
      name: 'Some profile',
      type: 'gologin',
    },
  ];
}
