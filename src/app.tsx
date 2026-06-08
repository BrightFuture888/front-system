import store from '@/store/index';
import React from 'react';

import { Provider } from 'react-redux';
import './index.less';

export const rootContainer = (container: React.ReactNode) => {
  return <Provider store={store}>{container}</Provider>;
};

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'Ai' };
}

// src/app.ts
export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('app1 mount', props);
    props.onGlobalStateChange((state: any, prev: any) => {
      console.log(state, 'umi-react');
    });
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('app1 unmount', props);
  },
};

export const layout = (props: any) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    collapsedButtonRender: false,
    layout: 'side',
    headerRender: false,
    contentStyle: {
      padding: 24,
      margin: 0,
      height: '100vh',
    },
    menuRender: false,
  };
};
