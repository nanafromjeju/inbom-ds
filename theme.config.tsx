import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import FadeIn from '@/components/Motion/FadeIn';

export default {
  logo: <span>Inbom DS</span>,
  head: (
    <>
      <link rel="icon" href="/favicon.ico" />
      <meta name="title" content="Inbom Design System" />
    </>
  ),
  components: {
    FadeIn,
  },
};
