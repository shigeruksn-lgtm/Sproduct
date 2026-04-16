import fs from 'fs';
import path from 'path';

/**
 * Figma Make の "figma:asset/..." 仮想モジュールをローカル環境で解決するプラグイン。
 *
 * 検索順:
 *   1. <root>/public/figma-assets/<hash>.<ext>
 *   2. <root>/src/imports/<hash>.<ext>
 *   3. <root>/public/<hash>.<ext>
 *   4. 見つからない場合 → null を返して次のプラグイン（Figma Make ネイティブ）に委譲
 */
export function figmaAssetPlugin() {
  const SCHEME = 'figma:asset/';
  const PREFIX = '\0figma-asset:';

  return {
    name: 'vite-plugin-figma-asset',
    enforce: 'pre',

    resolveId(id) {
      if (id.startsWith(SCHEME)) {
        const filename = id.slice(SCHEME.length);
        const root = process.cwd();

        const candidates = [
          path.resolve(root, 'public', 'figma-assets', filename),
          path.resolve(root, 'src', 'imports', filename),
          path.resolve(root, 'public', filename),
        ];

        // ローカルにファイルがある場合だけ横取りする
        for (const candidate of candidates) {
          if (fs.existsSync(candidate)) {
            return PREFIX + filename;
          }
        }

        // ローカルにない場合は次のプラグイン（Figma Make ネイティブ）に委譲
        return null;
      }
    },

    load(id) {
      if (!id.startsWith(PREFIX)) return;

      const filename = id.slice(PREFIX.length);
      const root = process.cwd();

      const candidates = [
        path.resolve(root, 'public', 'figma-assets', filename),
        path.resolve(root, 'src', 'imports', filename),
        path.resolve(root, 'public', filename),
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          const ext = path.extname(filename).slice(1).toLowerCase();
          const mime =
            ext === 'svg' ? 'image/svg+xml' :
            ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
            ext === 'webp' ? 'image/webp' :
            'image/png';
          const data = fs.readFileSync(candidate);
          const b64 = data.toString('base64');
          return `export default "data:${mime};base64,${b64}"`;
        }
      }

      // ここには到達しないはずだが念のため
      return null;
    },
  };
}