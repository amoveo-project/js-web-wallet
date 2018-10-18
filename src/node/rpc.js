export default class RPC {
  constructor(url) {
    this.url = url;
  }

  getHeaders = async(top, number) => {
    const response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(["headers", number, top])
    });

    const data = await response.json();
    return data[1].slice(1);
  }
}
