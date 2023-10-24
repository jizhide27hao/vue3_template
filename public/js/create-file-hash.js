self.importScripts('./crypto-js.min.js');

// 当接收到消息时，触发该事件处理程序
self.onmessage = (event) => {
  const fileChunkList = event.data;

  let count = 0;
  const hash = CryptoJS.algo.SHA256.create();
  const reader = new FileReader();

  // 递归读取文件的每个分块
  const loadNext = (index) => {
    reader.readAsArrayBuffer(fileChunkList[index]);
  };

  // 当读取完整个文件后，计算哈希值并返回
  reader.onloadend = () => {
    count += 1;
    const arrayBuffer = reader.result;
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);

    // 更新哈希对象
    hash.update(wordArray);
    if (count < fileChunkList.length) {
      // 继续处理下一个分块
      loadNext(count);
    } else {
      // 计算哈希值并返回
      const sha256Hash = hash.finalize();
      self.postMessage({
        hash: sha256Hash.toString(),
      });
      self.close();
    }
  };

  // 开始处理文件内容分块
  loadNext(0);
};
