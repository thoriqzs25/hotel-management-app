export class FnbAPI {
  static async getFnb() {
    try {
      return fetch('http://localhost:3000/fnb').then(async (response) => {
        let res = await response.json();
        return res.data;
      });
    } catch {
      // console.log('Looks like there was a problem');
      return { message: 'Looks like there was a problem.' };
    }
  }

  static async postFnb(data) {
    try {
      return fetch('http://localhost:3000/fnb', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json);
    } catch (e) {
      alert('Error POST ROOM');
    }
  }

  static async deleteFnb(id) {
    try {
      return fetch('http://localhost:3000/fnb', {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json);
    } catch (e) {
      alert(e);
    }
  }
}
