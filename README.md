
```
bun run --cwd api dev
bun run --cwd ui dev
```

Drizzle-studio

```
bun run --cwd api studio
```

デプロイ(どっちもdeployするときはapiの方から順番に)

```
bun run --cwd api deploy
bun run --cwd ui deploy
```

DBの作成
```
bun --cwd api wrangler d1 create duty-list
```

Drizzleスキーマに基づいてマイグレーションを生成する

```
bun --cwd api drizzle-kit generate
```

ローカルのデータベースを更新

```
bun --cwd api wrangler d1 migrations apply duty-list --local
```

本番環境のデータベースを更新

```
bun --cwd api wrangler d1 migrations apply duty-list --remote
```

shadcnで必要なコンポーネントだけ取得する(bunxの際はcdでファイル移動する)

```
bunx shadcn@latest add button 
```

### インストール

bun iするときは--cwdを使う

```
bun i --cwd ui react
```

[] 在庫管理
- 作業項目に在庫管理を追加して、その中にトイレットペーパーなどの在庫の必要な項目作っとく。箇条書きで数字うちこめるようにしとく
- メッセージのテンプレートを概要欄に書いておくことで楽になる ← 個人で追加してもらうことになる
