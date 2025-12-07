# Copilot Auto Implementation

このリポジトリでは、GitHub Issuesから自動的に実装とPRを作成するGitHub Actionsを設定しています。

## 使い方

1. **新しいIssueを作成**
2. **`auto-implement`ラベルを付ける**
3. **Issue本文に以下の形式で記述**:

```
日付: 12/8
タイトル: 記事のタイトル
URL: https://tech.nri-net.com/entry/article-url
```

4. Issueを作成すると自動的に:
   - 新しいブランチ `feature/issue-{番号}` が作成される
   - 記事情報が `src/constants/articles.js` に追加される
   - PRが自動作成される
   - Issueにコメントが投稿される

## 例

```
日付: 12/8
タイトル: GitHub ActionsでCICD構築
URL: https://tech.nri-net.com/entry/github_actions_cicd
```

## 必要な設定

- リポジトリの設定で「Actions」→「General」→「Workflow permissions」を「Read and write permissions」に設定
- `auto-implement`ラベルをリポジトリに作成

## カスタマイズ

`.github/workflows/copilot-auto-implement.yml`を編集することで、実装ロジックをカスタマイズできます。
