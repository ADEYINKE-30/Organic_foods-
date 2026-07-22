/// <reference types="vite/client" />

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module 'swiper' {
  import type { SwiperModule, SwiperOptions } from 'swiper/types';
  export const Navigation: SwiperModule;
  export default class Swiper {
    constructor(container: HTMLElement | string, options?: SwiperOptions);
    destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
  }
}

declare module 'swiper/css';
declare module 'swiper/css/navigation';
