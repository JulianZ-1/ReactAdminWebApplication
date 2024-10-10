import Mock from 'better-mock';


interface User {
  id: string;
  name: string;
  addr: string;
  age: number;
  birth: string;
  sex: number;
}

// Utility function to convert URL parameters to an object
function param2Obj(url: string): Record<string, string | number> {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  } 
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  );
}


let List: User[] = [];
const count = 200;

// Generate mock user data
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.name(),
      addr: Mock.mock('@title(3, 5)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  );
}

export default {
  getUserList: (config: { url: string }) => {
    const { page = 1, limit = 20 } = param2Obj(config.url) as { name: string, page: number, limit: number };
    const pageList = List.slice((page - 1) * limit, page * limit);
    return {
      code: 20000,
      count: List.length,
      list: pageList
    };
  },

  createUser: (config: { body: string }) => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body) as User;
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    });
    return {
      code: 20000,
      data: {
        message: 'Add success'
      }
    };
  },

  deleteUser: (config: { body: string }) => {
    const { id } = JSON.parse(config.body) as { id: string };
    if (!id) {
      return {
        code: -999,
        message: 'error'
      };
    } else {
      List = List.filter(u => u.id !== id);
      return {
        code: 20000,
        message: 'delete success'
      };
    }
  },

  updateUser: (config: { body: string }) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body) as User;
    const sex_num = parseInt(sex.toString(), 10);
    const updated = List.some(u => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = sex_num;
        return true;
      }
    });
    if (updated) {
      return {
        code: 20000,
        data: {
          message: 'update success'
        }
      };
    }
    return {
      code: -999,
      message: 'User not found'
    };
  }
}