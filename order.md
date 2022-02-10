# 配置相关环境
- 1、添加`tsconfig`添加`baseurl`
- 2、配置格式化工具
  - 安装
    - yarn add --dev --exact prettier
  - 新建配置文件
    - echo {}> .prettierrc.json
  - 创建 .prettierignore，添加相关配置
    -  #Ignore artifacts:
        build
        coverage
  - 安装git提交自动化工具
    - npx mrm@2 lint-staged
    - 新增需要格式化的文件类型
  - 防止同eslint冲突
    - 安装yarn add eslint-config-prettier -D
    - 在eslint的extends里加上`“pretttier”`
- 3、安装提交时gitmessage的格式校验
  - yarn add @commitlint/{cli,config-conventional}
  - 运行
    - echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

  - 在husky的hooks里添加
    -  commit-msg:'commitlint -E HUSKY_GIT_PARAMS'

# 配置相关Mock数据
https://www.npmjs.com/package/json-server
- 1、安装json-server
    yarn add json-server -D
- 2、添加相关文件夹，并在文件夹中添加db.json文件
- 3、添加相关脚本
  "json-server": "json-server __json_server_mock__/db.json  --watch ",