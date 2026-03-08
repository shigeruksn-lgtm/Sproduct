import fs from 'fs';
import path from 'path';

/**
 * Figma Make の "figma:asset/..." 仮想モジュールをローカル環境で解決するプラグイン。
 *
 * 検索順:
 *   1. <root>/public/figma-assets/<hash>.<ext>
 *   2. <root>/src/imports/<hash>.<ext>
 *   3. 見つからない場合 → 透過プレースホルダー PNG の data URL を返す
 */
export function figmaAssetPlugin() {
  const SCHEME = 'figma:asset/';
  const PREFIX = '\0figma-asset:';

  // 透過1×1 PNG (base64)
  const PLACEHOLDER_PNG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  return {
    name: 'vite-plugin-figma-asset',
    enforce: 'pre',

    resolveId(id) {
      if (id.startsWith(SCHEME)) {
        return PREFIX + id.slice(SCHEME.length);
      }
    },

    load(id) {
      if (!id.startsWith(PREFIX)) return;

      const filename = id.slice(PREFIX.length); // e.g. "abc123.png"
      const root = process.cwd();

      const candidates = [
        path.resolve(root, 'public', 'figma-assets', filename),
        path.resolve(root, 'src', 'imports', filename),
        path.resolve(root, 'public', filename),
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          // ファイルが存在する場合: base64 data URL として返す
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

      // 見つからない場合: プレースホルダーを返す（ビルドエラーを防ぐ）
      console.warn(`[figma-asset] Not found: ${filename} → using placeholder`);
      return `export default "${PLACEHOLDER_PNG}"`;
    },
  };
}
