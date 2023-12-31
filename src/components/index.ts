import type { App, Component } from 'vue';

const components = import.meta.glob<Component>('./**/index.vue', {
  eager: true,
  import: 'default'
});

const createComponents = () => ({
  install(app: App) {
    // 注册自定义组件
    Object.values(components).forEach(component => {
      if (!component.name) return;
      app.component(component.name as string, component);
    });
  }
});

export default createComponents;
