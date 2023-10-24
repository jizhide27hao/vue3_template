const copyForClipboard = async (text: string, callback?: (status: boolean) => void) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    if (callback) {
      callback(true);
    }

    return true;
  } catch (e) {
    if (callback) {
      callback(false);
    }
    throw new Error('复制发生错误');
  }
};

function generateUUID() {
  let uuid = '';
  let i;
  let random;

  for (i = 0; i < 32; i += 1) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
}

export { copyForClipboard, generateUUID };
