// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/vite@5.0.12_less@4.2.0_sass@1.70.0/node_modules/vite/dist/node/index.js";
import Vue from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/@vitejs+plugin-vue@5.0.3_vite@5.0.12_vue@3.4.15/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/vite-plugin-pages@0.32.0_@vue+compiler-sfc@3.4.15_vite@5.0.12/node_modules/vite-plugin-pages/dist/index.js";
import Layouts from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_vite@5.0.12_vue-router@4.2.5_vue@3.4.15/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.15/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.7.2/node_modules/unplugin-auto-import/dist/vite.js";
import Inspector from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/vite-plugin-vue-inspector@4.0.2_vite@5.0.12/node_modules/vite-plugin-vue-inspector/dist/index.mjs";
import Unocss from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/unocss@0.58.4_postcss@8.4.33_vite@5.0.12/node_modules/unocss/dist/vite.mjs";
import vuetify from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/vite-plugin-vuetify@2.0.1_vite@5.0.12_vue@3.4.15_vuetify@3.5.1/node_modules/vite-plugin-vuetify/dist/index.mjs";
import autoprefixer from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/autoprefixer@10.4.17_postcss@8.4.33/node_modules/autoprefixer/lib/autoprefixer.js";
import VueMacros from "file:///C:/Users/Administrator/Desktop/code_game/node_modules/.pnpm/unplugin-vue-macros@2.7.10_@vueuse+core@10.7.2_typescript@5.3.3_vite@5.0.12_vue@3.4.15/node_modules/unplugin-vue-macros/dist/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Administrator\\Desktop\\code_game";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue()
      }
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"]
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue/macros",
        "@vueuse/core",
        "pinia",
        { "@arco-design/web-vue": ["Message", "Modal"] }
      ],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/stores",
        "src/api"
      ],
      resolvers: [],
      vueTemplate: true
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: "src/components.d.ts",
      directoryAsNamespace: true,
      resolvers: [
        // ArcoResolver({
        //   importStyle: 'less',
        //   resolveIcons: true,
        // }),
      ]
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector({
      toggleButtonVisibility: "never"
    }),
    vuetify({
      styles: {
        configFile: "src/assets/styles/settings.scss"
      }
    })
  ],
  server: {
    host: "0.0.0.0"
  },
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  },
  // https://github.com/vitest-dev/vitest
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERlc2t0b3BcXFxcY29kZV9nYW1lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERlc2t0b3BcXFxcY29kZV9nYW1lXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvY29kZV9nYW1lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBJbnNwZWN0b3IgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWluc3BlY3RvcidcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xuXG4vLyBpbXBvcnQgeyBBcmNvUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCBWdWVNYWNyb3MgZnJvbSAndW5wbHVnaW4tdnVlLW1hY3Jvcy92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcbiAgICB9LFxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICBWdWVNYWNyb3Moe1xuICAgICAgcGx1Z2luczoge1xuICAgICAgICB2dWU6IFZ1ZSgpLFxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5ub2VydS92aXRlLXBsdWdpbi1wYWdlc1xuICAgIFBhZ2VzKHtcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSm9obkNhbXBpb25Kci92aXRlLXBsdWdpbi12dWUtbGF5b3V0c1xuICAgIExheW91dHMoKSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1hdXRvLWltcG9ydFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAndnVlL21hY3JvcycsXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAncGluaWEnLFxuICAgICAgICB7ICdAYXJjby1kZXNpZ24vd2ViLXZ1ZSc6IFsnTWVzc2FnZScsICdNb2RhbCddIH0sXG4gICAgICBdLFxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgIGRpcnM6IFtcbiAgICAgICAgJ3NyYy9jb21wb3NhYmxlcycsXG4gICAgICAgICdzcmMvc3RvcmVzJyxcbiAgICAgICAgJ3NyYy9hcGknLFxuICAgICAgXSxcbiAgICAgIHJlc29sdmVyczogW10sXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgIENvbXBvbmVudHMoe1xuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXG4gICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogdHJ1ZSxcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAvLyBBcmNvUmVzb2x2ZXIoe1xuICAgICAgICAvLyAgIGltcG9ydFN0eWxlOiAnbGVzcycsXG4gICAgICAgIC8vICAgcmVzb2x2ZUljb25zOiB0cnVlLFxuICAgICAgICAvLyB9KSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5vY3NzXG4gICAgLy8gc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xuICAgIFVub2NzcygpLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYmZhbnNwbHovdml0ZS1wbHVnaW4tdnVlLWluc3BlY3RvclxuICAgIEluc3BlY3Rvcih7XG4gICAgICB0b2dnbGVCdXR0b25WaXNpYmlsaXR5OiAnbmV2ZXInLFxuICAgIH0pLFxuXG4gICAgdnVldGlmeSh7XG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgY29uZmlnRmlsZTogJ3NyYy9hc3NldHMvc3R5bGVzL3NldHRpbmdzLnNjc3MnLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICB9LFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbYXV0b3ByZWZpeGVyXSxcbiAgICB9LFxuICB9LFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZXN0LWRldi92aXRlc3RcbiAgdGVzdDoge1xuICAgIGluY2x1ZGU6IFsndGVzdC8qKi8qLnRlc3QudHMnXSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICBkZXBzOiB7XG4gICAgICBpbmxpbmU6IFsnQHZ1ZScsICdAdnVldXNlJywgJ3Z1ZS1kZW1pJ10sXG4gICAgfSxcbiAgfSxcblxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1QsT0FBTyxVQUFVO0FBQ3JVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZUFBZTtBQUN0QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxhQUFhO0FBR3BCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sZUFBZTtBQWJ0QixJQUFNLG1DQUFtQztBQWV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEdBQUcsS0FBSyxRQUFRLGtDQUFXLEtBQUssQ0FBQztBQUFBLElBQ3pDO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsVUFBVTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ1AsS0FBSyxJQUFJO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUEsSUFHRCxNQUFNO0FBQUEsTUFDSixZQUFZLENBQUMsS0FBSztBQUFBLElBQ3BCLENBQUM7QUFBQTtBQUFBLElBR0QsUUFBUTtBQUFBO0FBQUEsSUFHUixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLEVBQUUsd0JBQXdCLENBQUMsV0FBVyxPQUFPLEVBQUU7QUFBQSxNQUNqRDtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLFFBQ0o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFdBQVcsQ0FBQztBQUFBLE1BQ1osYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBO0FBQUEsSUFHRCxXQUFXO0FBQUEsTUFDVCxLQUFLO0FBQUEsTUFDTCxzQkFBc0I7QUFBQSxNQUN0QixXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtYO0FBQUEsSUFDRixDQUFDO0FBQUE7QUFBQTtBQUFBLElBSUQsT0FBTztBQUFBO0FBQUEsSUFHUCxVQUFVO0FBQUEsTUFDUix3QkFBd0I7QUFBQSxJQUMxQixDQUFDO0FBQUEsSUFFRCxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsWUFBWTtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDSixTQUFTLENBQUMsbUJBQW1CO0FBQUEsSUFDN0IsYUFBYTtBQUFBLElBQ2IsTUFBTTtBQUFBLE1BQ0osUUFBUSxDQUFDLFFBQVEsV0FBVyxVQUFVO0FBQUEsSUFDeEM7QUFBQSxFQUNGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
