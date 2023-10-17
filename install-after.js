// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
function editVitePluginEslint() {
  const folderPath = './node_modules/vite-plugin-eslint';

  if (fs.existsSync(folderPath)) {
    updateCode(folderPath);
  }
}

function updateCode(path) {
  const packageJsonPath = path + '/package.json';
  fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // 解析 JSON 数据
    const packageJson = JSON.parse(data);

    // 删除 exports 字段
    delete packageJson.exports;

    // 将修改后的数据转换为字符串
    const updatedPackageJson = JSON.stringify(packageJson, null, 2);

    // 保存修改后的 package.json 文件
    fs.writeFile(packageJsonPath, updatedPackageJson, 'utf8', err => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}
editVitePluginEslint();
