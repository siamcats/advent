# 🤖 GitHub Copilot Code Agent 自動実装

このリポジトリでは、**GitHub Copilot Code Agent**を使った完全自動実装フローを提供しています。

## 📋 使い方（超シンプル！）

### 方法1: GitHubで直接

1. **Issueを作成**
2. **Assigneeに `@copilot` を追加**
3. Copilotが自動的に実装してPRを作成！

### 方法2: ラベル自動アサイン（推奨）

1. **Issueを作成**
2. **`auto-implement` ラベルを付ける**
3. 自動的に`@copilot`がアサインされ、実装が開始！

それだけです！GitHub Actionsが不要な作業を全て自動化します。

## 🔄 JIRA連携

**GitHub for Atlassian**インストール済みの場合:

1. **JIRAで課題を作成**
2. **GitHubに自動同期**
3. GitHub Issueに`auto-implement`ラベルを付ける（または手動で`@copilot`アサイン）
4. Copilotが自動実装
5. **PRマージ後、JIRAのステータスも自動更新**

### JIRAワークフロー例

```
JIRA: 新規作成
  ↓ (自動同期)
GitHub Issue作成
  ↓ (auto-implementラベル)
@copilot自動アサイン
  ↓
Copilotが実装
  ↓
PR作成
  ↓
レビュー & マージ
  ↓ (自動更新)
JIRA: 完了
```

## 🎯 対応可能な実装例

Copilotはあらゆる種類の実装に対応できます:

### 記事追加
```
タイトル: 12/10の記事を追加

本文:
日付: 12/10
タイトル: GitHub Copilot入門
URL: https://tech.nri-net.com/entry/copilot_intro
```

### UI改善
```
タイトル: ダークモード対応

本文:
ユーザーがダークモード/ライトモードを切り替えられる機能を追加
- トグルボタンを右上に配置
- localStorageで設定を保存
- システム設定を尊重
```

### 新機能追加
```
タイトル: 検索機能の追加

本文:
記事タイトルで検索できる機能を実装
- 検索ボックスをヘッダーに配置
- リアルタイムフィルタリング
- 検索結果のハイライト表示
```

### バグ修正
```
タイトル: モバイルレイアウト崩れ修正

本文:
480px以下でカレンダーグリッドが崩れる問題を修正
- 2列表示に変更
- パディングを調整
- テキストサイズを最適化
```

## ⚙️ セットアップ（初回のみ）

### 1. GitHub設定

**Copilot有効化:**
- リポジトリの「Settings」→「Copilot」→「Enable for this repository」

**Workflow permissions:**
- 「Settings」→「Actions」→「General」
- 「Workflow permissions」を **「Read and write permissions」** に変更

### 2. ラベル作成

以下のラベルを作成:
- `auto-implement` (色: #0E8A16) - 自動実装トリガー

### 3. JIRA連携（オプション）

**GitHub for Atlassian**を設定:
1. [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1219592/github-for-jira)からインストール
2. JIRAとGitHubリポジトリを連携
3. JIRA課題がGitHub Issueに自動同期される

## 📊 ワークフローの流れ

### パターン1: GitHub直接

```mermaid
graph LR
    A[Issue作成] --> B[@copilotアサイン]
    B --> C[Copilotが分析]
    C --> D[ブランチ作成]
    D --> E[コード実装]
    E --> F[PR作成]
    F --> G[レビュー]
    G --> H[マージ]
    H --> I[本番デプロイ]
```

### パターン2: JIRA連携

```mermaid
graph LR
    A[JIRA課題作成] --> B[GitHub Issue同期]
    B --> C[auto-implementラベル]
    C --> D[@copilot自動アサイン]
    D --> E[Copilot実装]
    E --> F[PR作成]
    F --> G[マージ]
    G --> H[JIRA自動更新]
```

## 🤖 Copilotができること

- ✅ **コード生成**: React、CSS、設定ファイルなど
- ✅ **ファイル操作**: 作成、更新、削除
- ✅ **テスト作成**: 単体テスト、統合テスト
- ✅ **ドキュメント**: README、コメント
- ✅ **リファクタリング**: コード改善、最適化
- ✅ **バグ修正**: 問題の特定と修正

## 💡 Tips

### より良い結果を得るために:

1. **具体的に書く**: 
   ```
   ❌ 「カレンダーを改善」
   ✅ 「カレンダーのホバー時に3Dエフェクト（scale 1.05、shadow 増加）を追加」
   ```

2. **要件を明確に**:
   ```
   - 機能要件: 何をするか
   - 技術要件: どう実装するか
   - デザイン要件: どう見えるか
   ```

3. **例を示す**:
   ```
   期待する動作:
   - ユーザーがボタンをクリック
   - モーダルが表示される
   - 背景がオーバーレイされる
   ```

4. **段階的に**:
   - 大きな変更は複数のIssueに分割
   - 1つのIssueで1つの機能に集中

## 🆘 トラブルシューティング

### Copilotがアサインされない
- `auto-implement`ラベルが正しく付いているか確認
- Workflow permissionsが正しく設定されているか確認
- リポジトリでCopilotが有効化されているか確認

### Copilotが実装を開始しない
- Issueの内容が明確か確認
- 手動で`@copilot`を再アサイン
- Copilotのステータスページを確認

### 実装が期待と異なる
- Issueをより具体的に書き直す
- PRにコメントでCopilotに修正を依頼
- または手動で修正してコミット

### JIRAから同期されない
- GitHub for Atlassianの設定を確認
- JIRA課題のプロジェクトキーが正しいか確認
- 同期トリガー（ステータス変更など）を確認

## 📚 関連リンク

- [GitHub Copilot ドキュメント](https://docs.github.com/copilot)
- [GitHub for JIRA](https://github.com/atlassian/github-for-jira)
- [Copilot Code Agent について](https://github.blog/changelog/)
