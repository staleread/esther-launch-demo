import type { ProfileLaunchDto } from '@/schemas/ui.schemas';

export async function launchProfile(_dto: ProfileLaunchDto): Promise<string> {
  return new Promise((res) => {
    const success = Math.random() < 0.7;
    setTimeout(() => res(success ? '' : 'Failed to launch'), 5000);
  });
}
