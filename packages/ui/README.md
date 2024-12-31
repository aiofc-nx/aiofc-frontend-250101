# `@aiofc/ui`

我们把组件的代码抽离出来，作为一个独立依赖包，这样我们就可以在多个项目中引用同一套组件代码。
并且，我们在这里也定义了tailwindcss的样式。
这些代码和样式，在多个项目中都可以复用。因为，我们在package.json做了到处处理。

```json
"exports": {
  "./globals.css": "./src/globals.css",
  "./postcss.config": "./postcss.config.js",
  "./tailwind.config": "./tailwind.config.ts",
  "./lib/*": "./src/lib/*.ts",
  "./components/*": "./src/components/*.tsx"
}
```

以上的导出很重要，这样我们就可以在其他项目中直接引用这些代码和样式。
示例：

```tsx
// 应用项目的/tailwind.config.ts
import { type Config } from "tailwindcss";
import uiConfig from "../../packages/ui/tailwind.config";

export default {
  // 继承 UI 包的配置
  ...uiConfig,
  // 覆盖 content 路径
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  // 如果需要，可以在这里添加额外的配置
  theme: {
    ...uiConfig.theme,
    extend: {
      ...uiConfig.theme?.extend,
      // 在这里添加应用特定的扩展
    },
  },
} satisfies Config;
```

注意：不过，我们仍然可以在引用的项目中重新定义自己的tailwind.config.ts和globals.css，而不是使用这里的配置。这样做的时候，一定要在tailwind.config.ts中，把组件的代码也包含进来。

```ts
content: [
  "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
],
```

最好的实践方式是，在引用的项目中，只引用组件，而不引用样式。
也可以在这里定义多套样式，然后根据不同的项目，引用不同的样式。
示例：

```tsx
// 定义一个预设配置tailwind-preset.ts
import { type Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  theme: {
    // ... 您现有的主题配置
  },
  plugins: [tailwindcssAnimate],
} satisfies Partial<Config>;
```

然后在引用项目的tailwind.config.ts中，引用这个预设配置。

```tsx
import { type Config } from "tailwindcss";
import uiPreset from "../../packages/ui/src/lib/tailwind-preset";

export default {
  presets: [uiPreset],
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  // 其他应用特定的配置
} satisfies Config;
```

这样我们就可以实现多套样式，然后根据不同的项目，引用不同的样式。

我们可以参考[epic](https://github.com/aiofc/epic)项目，看看它是如何实现多套样式的。
