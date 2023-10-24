import { getFileCheckApi, chunkFileUploadApi, chunkFileMergeApi } from '@/apis/methods/file';

const getFileBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    let imgResult = '';
    reader.readAsDataURL(file);
    reader.onload = () => {
      imgResult = reader.result as string;
    };
    reader.onerror = error => {
      reject(error);
    };
    reader.onloadend = () => {
      resolve(imgResult);
    };
  });

// 文件块大小
const CHUNK_MAX_SIZE = 5 * 1024 * 1024;

// 创建hash
const createHash = (chunkList: Blob[]) =>
  new Promise<string>(resolve => {
    // 使用web-worker生成hash
    const worker = new Worker('/js/create-file-hash.js');
    // 定义接收消息的处理程序
    worker.onmessage = event => {
      const { hash } = event.data;
      resolve(hash);
    };
    worker.postMessage(chunkList);
  });

// 把文件切割为文件块
const createFileChunk = (file: File, size = CHUNK_MAX_SIZE) => {
  const fileChunkList: Blob[] = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push(file.slice(cur, cur + size));
    cur += size;
  }
  return fileChunkList;
};

// 文件块上传
const chunksUpload = async (file: File) => {
  const chunkList: Blob[] = createFileChunk(file);
  const hashStr = await createHash(chunkList);
  const checkRes = await getFileCheckApi(hashStr).send();
  if (checkRes.exist) {
    return checkRes.file;
  }
  const fileList = chunkList.map((item, index) => ({
    file: item,
    filename: `${hashStr}-${index}`,
    hex: hashStr
  }));

  // 并行
  // const requestList = fileList
  //   .filter((item) => !checkRes.fileName.includes(item.filename))
  //   .map((item) =>
  //     chunkFileUploadApi(item.file, item.filename, item.hex).send()
  //   );
  // try {
  //   await Promise.all(requestList);
  //   const mergeRes = await chunkFileMergeApi(hashStr, file.name).send();
  //   return mergeRes;
  // } catch (error) {
  //   return false;
  // }

  // 串行
  const requestList = fileList
    .filter(item => !checkRes.fileName.includes(item.filename))
    .map(item => chunkFileUploadApi(item.file, item.filename, item.hex));
  try {
    for (let i = 0; i < requestList.length; i += 1) {
      await requestList[i].send();
    }
    const mergeRes = await chunkFileMergeApi(hashStr, file.name).send();
    return mergeRes;
  } catch (error) {
    return false;
  }
};

export { getFileBase64, chunksUpload, CHUNK_MAX_SIZE };
