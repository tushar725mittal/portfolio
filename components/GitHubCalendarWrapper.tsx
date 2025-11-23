'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { ComponentProps } from 'react';

export default function GitHubCalendarWrapper(props: ComponentProps<typeof GitHubCalendar>) {
  return <GitHubCalendar {...props} />;
}
