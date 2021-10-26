import { showMessage } from 'react-native-flash-message';
// `https://apex.lavina.uz/apex/hs/client/${reqName}`,
// Authorization: 'Basic 0JDQtNC80LjQvToyMDExMjAxNA==',

export async function getResource<T>(reqName: string): Promise<{ result: T }> {
  try {
    const response = await fetch(
      // `https://apex.lavina.uz/apex/hs/client/${reqName}`,
      `http://192.168.1.102:85/apex/hs/client/${reqName}`,
      {
        headers: {
          // Authorization: 'Basic 0JDQtNC80LjQvToyMDExMjAxNA==',
          Authorization: 'Basic Ym9zczox',
        },
      },
    );

    if (!response.ok) {
      if (response.status === 500) {
        const text = await response.text();
        throw Error(text);
      }
      throw Error(`Ошибка подключения ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    showMessage({
      message: 'Ошибка',
      description: err.message,
      type: 'danger',
    });
    throw Error(err.message);
  }
}

export const sendData = async (reqName: string, body: any) => {
  try {
    const response = await fetch(
      // `https://apex.lavina.uz/apex/hs/client/${reqName}`,
      `http://192.168.1.102:85/apex/hs/client/${reqName}`,
      {
        method: 'POST',
        headers: {
          // Authorization: 'Basic 0JDQtNC80LjQvToyMDExMjAxNA==',
          Authorization: 'Basic Ym9zczox',
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      if (response.status === 500) {
        const text = await response.text();
        throw Error(text);
      }
      throw Error(`Ошибка подключения ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    showMessage({
      message: 'Ошибка',
      description: err.message,
      type: 'danger',
    });
    throw Error(err.message);
  }
};
