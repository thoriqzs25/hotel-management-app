export class RoomAPI {
  static async getRoom() {
    try {
      return fetch('http://localhost:3000/room').then(async (response) => {
        let res = await response.json();
        return res.data;
      });
    } catch {
      // console.log('Looks like there was a problem');
      return { message: 'Looks like there was a problem.' };
    }
  }

  static async postRoom(data) {
    try {
      return fetch('http://localhost:3000/room', {
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
}
