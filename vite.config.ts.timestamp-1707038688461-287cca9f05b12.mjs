// vite.config.ts
import * as path from "path";
import { babel } from "file:///home/bricks/Documents/web/todo/client/node_modules/@rollup/plugin-babel/dist/es/index.js";
import react from "file:///home/bricks/Documents/web/todo/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "file:///home/bricks/Documents/web/todo/client/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///home/bricks/Documents/web/todo/client/node_modules/vite-plugin-static-copy/dist/index.js";
var __vite_injected_original_dirname = "/home/bricks/Documents/web/todo/client";
var LOCALE_FILE_REGEXP = /src\/([\w-/ ])*\/([\w-]+)\/([\w-]+)\.json$/;
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    build: {
      sourcemap: true
    },
    server: {
      port: 3e3,
      cors: true,
      proxy: {
        "/api": {
          changeOrigin: true,
          target: env.API_HOST,
          rewrite: (url) => url.replace("/api", "")
        }
      }
    },
    preview: {
      port: 3e3,
      cors: true,
      proxy: {
        "/api": {
          changeOrigin: true,
          target: env.API_HOST,
          rewrite: (url) => url.replace("/api", "")
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    css: {
      devSourcemap: true
    },
    plugins: [
      react(),
      babel({
        babelrc: true,
        configFile: true,
        babelHelpers: "bundled",
        browserslistConfigFile: true,
        extensions: [".ts", ".tsx"]
      }),
      splitVendorChunkPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: "src/**/locales/**/*.json",
            rename: (_name, _extension, path2) => {
              const matches = path2.match(LOCALE_FILE_REGEXP);
              if (matches.length < 4) {
                return "";
              }
              const [, , language, namespace] = matches;
              return `${language}/${namespace}.json`;
            },
            dest: "locales"
          }
        ]
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9icmlja3MvRG9jdW1lbnRzL3dlYi90b2RvL2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYnJpY2tzL0RvY3VtZW50cy93ZWIvdG9kby9jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYnJpY2tzL0RvY3VtZW50cy93ZWIvdG9kby9jbGllbnQvdml0ZS5jb25maWcudHNcIjsvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMgKi9cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IGJhYmVsIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW4tYmFiZWwnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgc3BsaXRWZW5kb3JDaHVua1BsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XG5cbmNvbnN0IExPQ0FMRV9GSUxFX1JFR0VYUCA9IC9zcmNcXC8oW1xcdy0vIF0pKlxcLyhbXFx3LV0rKVxcLyhbXFx3LV0rKVxcLmpzb24kLztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuXHRjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsICcuJywgJycpO1xuXG5cdHJldHVybiB7XG5cdFx0YnVpbGQ6IHtcblx0XHRcdHNvdXJjZW1hcDogdHJ1ZSxcblx0XHR9LFxuXHRcdHNlcnZlcjoge1xuXHRcdFx0cG9ydDogMzAwMCxcblx0XHRcdGNvcnM6IHRydWUsXG5cdFx0XHRwcm94eToge1xuXHRcdFx0XHQnL2FwaSc6IHtcblx0XHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdFx0dGFyZ2V0OiBlbnYuQVBJX0hPU1QsXG5cdFx0XHRcdFx0cmV3cml0ZTogKHVybCkgPT4gdXJsLnJlcGxhY2UoJy9hcGknLCAnJyksXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0cHJldmlldzoge1xuXHRcdFx0cG9ydDogMzAwMCxcblx0XHRcdGNvcnM6IHRydWUsXG5cdFx0XHRwcm94eToge1xuXHRcdFx0XHQnL2FwaSc6IHtcblx0XHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdFx0dGFyZ2V0OiBlbnYuQVBJX0hPU1QsXG5cdFx0XHRcdFx0cmV3cml0ZTogKHVybCkgPT4gdXJsLnJlcGxhY2UoJy9hcGknLCAnJyksXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0YWxpYXM6IHtcblx0XHRcdFx0J0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0Y3NzOiB7XG5cdFx0XHRkZXZTb3VyY2VtYXA6IHRydWUsXG5cdFx0fSxcblx0XHRwbHVnaW5zOiBbXG5cdFx0XHRyZWFjdCgpLFxuXHRcdFx0YmFiZWwoe1xuXHRcdFx0XHRiYWJlbHJjOiB0cnVlLFxuXHRcdFx0XHRjb25maWdGaWxlOiB0cnVlLFxuXHRcdFx0XHRiYWJlbEhlbHBlcnM6ICdidW5kbGVkJyxcblx0XHRcdFx0YnJvd3NlcnNsaXN0Q29uZmlnRmlsZTogdHJ1ZSxcblx0XHRcdFx0ZXh0ZW5zaW9uczogWycudHMnLCAnLnRzeCddLFxuXHRcdFx0fSksXG5cdFx0XHRzcGxpdFZlbmRvckNodW5rUGx1Z2luKCksXG5cdFx0XHR2aXRlU3RhdGljQ29weSh7XG5cdFx0XHRcdHRhcmdldHM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6ICdzcmMvKiovbG9jYWxlcy8qKi8qLmpzb24nLFxuXHRcdFx0XHRcdFx0cmVuYW1lOiAoX25hbWUsIF9leHRlbnNpb24sIHBhdGgpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goTE9DQUxFX0ZJTEVfUkVHRVhQKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAobWF0Y2hlcy5sZW5ndGggPCA0KSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgWywgLCBsYW5ndWFnZSwgbmFtZXNwYWNlXSA9IG1hdGNoZXM7XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGAke2xhbmd1YWdlfS8ke25hbWVzcGFjZX0uanNvbmA7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZGVzdDogJ2xvY2FsZXMnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9KSxcblx0XHRdLFxuXHR9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsWUFBWSxVQUFVO0FBRXRCLFNBQVMsYUFBYTtBQUN0QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxjQUFjLFNBQVMsOEJBQThCO0FBQzlELFNBQVMsc0JBQXNCO0FBTi9CLElBQU0sbUNBQW1DO0FBUXpDLElBQU0scUJBQXFCO0FBRTNCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3pDLFFBQU0sTUFBTSxRQUFRLE1BQU0sS0FBSyxFQUFFO0FBRWpDLFNBQU87QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNOLFdBQVc7QUFBQSxJQUNaO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTixRQUFRO0FBQUEsVUFDUCxjQUFjO0FBQUEsVUFDZCxRQUFRLElBQUk7QUFBQSxVQUNaLFNBQVMsQ0FBQyxRQUFRLElBQUksUUFBUSxRQUFRLEVBQUU7QUFBQSxRQUN6QztBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTixRQUFRO0FBQUEsVUFDUCxjQUFjO0FBQUEsVUFDZCxRQUFRLElBQUk7QUFBQSxVQUNaLFNBQVMsQ0FBQyxRQUFRLElBQUksUUFBUSxRQUFRLEVBQUU7QUFBQSxRQUN6QztBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUixPQUFPO0FBQUEsUUFDTixLQUFVLGFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ25DO0FBQUEsSUFDRDtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0osY0FBYztBQUFBLElBQ2Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUNMLFNBQVM7QUFBQSxRQUNULFlBQVk7QUFBQSxRQUNaLGNBQWM7QUFBQSxRQUNkLHdCQUF3QjtBQUFBLFFBQ3hCLFlBQVksQ0FBQyxPQUFPLE1BQU07QUFBQSxNQUMzQixDQUFDO0FBQUEsTUFDRCx1QkFBdUI7QUFBQSxNQUN2QixlQUFlO0FBQUEsUUFDZCxTQUFTO0FBQUEsVUFDUjtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsUUFBUSxDQUFDLE9BQU8sWUFBWUEsVUFBUztBQUNwQyxvQkFBTSxVQUFVQSxNQUFLLE1BQU0sa0JBQWtCO0FBRTdDLGtCQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3ZCLHVCQUFPO0FBQUEsY0FDUjtBQUVBLG9CQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsU0FBUyxJQUFJO0FBRWxDLHFCQUFPLEdBQUcsUUFBUSxJQUFJLFNBQVM7QUFBQSxZQUNoQztBQUFBLFlBQ0EsTUFBTTtBQUFBLFVBQ1A7QUFBQSxRQUNEO0FBQUEsTUFDRCxDQUFDO0FBQUEsSUFDRjtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
