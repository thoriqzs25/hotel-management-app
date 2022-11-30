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

  static async getById(id) {
    try {
      return fetch(`http://localhost:3000/room/${id}`).then(async (response) => {
        let res = await response.json();
        return res.data;
      });
    } catch {
      return { message: 'Looks like there was a problem when fetching getById' };
    }
  }

  static async postRoom(data) {
    try {
      return fetch('http://localhost:3000/room', {
        method: 'POST',
        body: data,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      }).then((response) => response.json);
    } catch (e) {
      alert('Error POST ROOM');
    }
  }

  static async updateRoom(data) {
    try {
      return fetch('http://localhost:3000/room', {
        method: 'PUT',
        body: data,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      }).then((response) => response.json);
    } catch {
      alert('Error PUT ROOM');
    }
  }

  static async deleteRoom(id) {
    try {
      return fetch('http://localhost:3000/room', {
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
