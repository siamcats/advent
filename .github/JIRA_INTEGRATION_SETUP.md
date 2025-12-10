# JIRA → GitHub Issue 自動作成セットアップ

このガイドでは、Jira課題が作成されると自動的にGitHub Issueを作成し、`@copilot`に自動アサインする設定方法を説明します。

## 📋 前提条件

- GitHub for Atlassianがインストール済み
- JiraのAutomation機能（Jira Premium推奨、Freeでも一部可能）
- GitHub Personal Access Token（PAT）

## 🔧 セットアップ手順

### ステップ1: GitHub Personal Access Tokenを作成

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)** をクリック
3. 権限を選択:
   - ✅ `repo` (フルアクセス)
   - ✅ `workflow`
4. トークンをコピー（後で使用）

### ステップ2: GitHub Secretsに保存

1. リポジトリ → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** で以下を追加:

   **必須:**
   - Name: `GITHUB_PAT`
   - Value: 先ほど作成したPersonal Access Token

   **オプション（Jiraにコメントを投稿したい場合）:**
   - Name: `JIRA_API_TOKEN`
   - Value: Jira APIトークン（[こちら](https://id.atlassian.com/manage-profile/security/api-tokens)で作成）
   
   - Name: `JIRA_BASE_URL`
   - Value: `https://your-domain.atlassian.net`
   
   - Name: `JIRA_USER_EMAIL`
   - Value: Jiraアカウントのメールアドレス

### ステップ3: Jira Automationルールを作成

1. Jira → 右上の設定 → **System** → **Automation**
2. **Create rule** をクリック

#### トリガー設定:
- **When: Issue created**
- 条件（オプション）: 特定のプロジェクトやIssue Typeに限定

#### アクション設定:
- **Then: Send web request**

**Web request設定:**

**URL:**
```
https://api.github.com/repos/siamcats/advent/dispatches
```

**HTTP method:** `POST`

**Headers:**
```
Authorization: Bearer YOUR_GITHUB_PAT_HERE
Accept: application/vnd.github.v3+json
Content-Type: application/json
```

**Web request body:** `Custom data`

**Body:**
```json
{
  "event_type": "jira-issue-created",
  "client_payload": {
    "issue_key": "{{issue.key}}",
    "issue_title": "{{issue.summary}}",
    "issue_description": "{{issue.description.replaceAll('"', '\\"').replaceAll('\n', ' ')}}",
    "issue_url": "{{issue.url}}",
    "issue_type": "{{issue.issueType.name}}",
    "project_key": "{{issue.project.key}}"
  }
}
```

**重要な注意点:**
- `{{issue.description}}`に改行やダブルクォートが含まれる場合、JSONエラーが発生します
- 上記では`replaceAll`でエスケープしていますが、Jira Automationの実行環境によっては動作しない場合があります
- **推奨: descriptionを省略する**（以下の簡易版を使用）

**簡易版（推奨）:**
```json
{
  "event_type": "jira-issue-created",
  "client_payload": {
    "issue_key": "{{issue.key}}",
    "issue_title": "{{issue.summary}}",
    "issue_url": "{{issue.url}}",
    "issue_type": "{{issue.issueType.name}}",
    "project_key": "{{issue.project.key}}"
  }
}
```

**重要:** `YOUR_GITHUB_PAT_HERE`を実際のPATに置き換えてください。

3. **Turn on rule** で有効化

### ステップ4: ラベル作成

GitHubリポジトリに以下のラベルを作成:
- `auto-implement` (色: #0E8A16)
- `from-jira` (色: #0052CC)

## 🎯 動作フロー

```
1. Jiraで課題作成
   ↓
2. Jira Automationが発火
   ↓
3. GitHub repository_dispatch APIを呼び出し
   ↓
4. GitHub Actionsワークフローが起動
   ↓
5. GitHub Issue自動作成（auto-implementラベル付き）
   ↓
6. @copilotが自動アサイン
   ↓
7. Copilotが実装開始
   ↓
8. PR作成
   ↓
9. マージ後、Jiraステータス自動更新（GitHub for Atlassian）
```

## ✅ テスト方法

### 1. Jira課題を作成
```
プロジェクト: あなたのプロジェクト
要約: テスト: GitHub Issue自動作成
説明: これはテストです。記事を追加してください。
日付: 12/10
タイトル: テスト記事
URL: https://example.com/test
```

### 2. 確認
- 数秒後、GitHubのIssuesタブを確認
- `[PROJ-XXX] テスト: GitHub Issue自動作成`というIssueが作成されているか
- `auto-implement`と`from-jira`ラベルが付いているか
- Assigneeに`@copilot`が追加されているか

### 3. Copilotの動作確認
- 数分後、Copilotがブランチ作成 & PR作成を開始

## 🐛 トラブルシューティング

### GitHub Issueが作成されない

1. **Jira Automation実行ログを確認**:
   - Jira → Automation → ルールを選択 → Audit log
   - エラーメッセージを確認

2. **GitHub Actionsログを確認**:
   - リポジトリ → Actions タブ
   - "Create GitHub Issue from Jira"ワークフローの実行履歴

3. **よくあるエラー**:
   - ❌ `401 Unauthorized` → GitHub PATが正しくない
   - ❌ `404 Not Found` → リポジトリ名が間違っている
   - ❌ `422 Unprocessable Entity` → JSONフォーマットエラー

### Copilotがアサインされない

- `@copilot`がリポジトリにアクセス権限を持っているか確認
- リポジトリでCopilotが有効化されているか確認

### Jiraにコメントが投稿されない

- `JIRA_API_TOKEN`, `JIRA_BASE_URL`, `JIRA_USER_EMAIL`のSecretsが正しく設定されているか確認
- Jira APIトークンの権限を確認

## 📝 カスタマイズ

### 特定のIssue Typeのみ対象にする

Jira Automationのトリガーに条件を追加:
```
When: Issue created
If: Issue type equals Story
```

### 特定のプロジェクトのみ対象にする

```
When: Issue created
If: Project equals YOUR_PROJECT
```

### GitHub Issueのテンプレートを変更

`.github/workflows/jira-to-github-issue.yml`の`body`セクションを編集

## 🔗 参考リンク

- [GitHub repository_dispatch API](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)
- [Jira Automation](https://support.atlassian.com/jira-software-cloud/docs/what-is-automation/)
- [Jira API tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
